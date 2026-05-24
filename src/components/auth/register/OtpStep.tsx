/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { useResendVerificationEmailMutation } from '@/redux/features/auth/auth.api';
import { LoaderIcon } from 'lucide-react';

export default function Step2OTP({
  formData,
  updateField,
  nextStep,
  prevStep,
  errors,
  isOtpLoading,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(formData.email || '');
  const [resendOtp, { isLoading }] = useResendVerificationEmailMutation();

  // OTP state
  const [otpArray, setOtpArray] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    // 🔥 Directly update parent (NO useEffect anymore)
    updateField('otp', newOtp.join(''));

    // auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).trim();

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otpArray];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtpArray(newOtp);
    updateField('otp', newOtp.join(''));

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResend = async () => {
    if (!email) return toast.error('Email is required');

    try {
      await resendOtp({ email }).unwrap();
      updateField('email', email);
      toast.success('OTP resent successfully!', {
        description: 'Verification code sent to your email!',
      });
      setIsOpen(false);
    } catch (err: any) {
      toast.error(
        err?.data?.message ||
        err?.data?.error?.message ||
        'Failed to resend OTP',
      );
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-5 text-center">
        {/* <h2 className="text-xl font-semibold">Email Verification</h2> */}
        <p>
          We have sent a 6-digit OTP to your email:{' '}
          <span className="font-bold">{formData.email}</span>
        </p>

        {/* OTP inputs */}
        <div className="flex justify-center gap-2 mt-4">
          {otpArray.map((digit, idx) => (
            <Input
              key={idx}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, idx)}
              onKeyDown={(e) => handleOtpKeyDown(e, idx)}
              onPaste={handlePaste}
              ref={(el) => {
                if (el) inputRefs.current[idx] = el;
              }}
              className="w-12 h-12 text-center text-xl font-bold font-mono border transition duration-200 rounded-lg"
            />
          ))}
        </div>

        {errors?.otp && (
          <p className="text-destructive text-sm mt-2">{errors.otp}</p>
        )}

        {/* Resend OTP modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <span className="text-secondary text-sm underline cursor-pointer">
              Resend OTP?
            </span>
          </DialogTrigger>

          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle className="mb-4">
                Enter Your Email To Get OTP!
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                onClick={handleResend}
                disabled={isLoading}
                className="bg-secondary hover:bg-secondary/80 text-gray-50 w-full">
                {isLoading ? (
                  <span className="flex gap-1 items-center">
                    <LoaderIcon className="w-4 h-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span>Send OTP</span>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between gap-3 pt-4">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>

        <Button type="button" onClick={nextStep} disabled={isOtpLoading}>
          {isOtpLoading ? (
            <span className="flex gap-1 items-center">
              <LoaderIcon className="w-4 h-4 animate-spin" />
              Verifying...
            </span>
          ) : (
            <span>Verify OTP</span>
          )}
        </Button>
      </div>
    </div>
  );
}
