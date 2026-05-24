"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  useForgetOtpMutation,
  useForgotPasswordMutation,
} from "@/redux/features/auth/auth.api";
import Logo from "@/shared/Logo/Logo";

const formSchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 digits"),
});

type FormValues = z.infer<typeof formSchema>;

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromQuery = searchParams.get("email");
  const [verifyOtp, { isLoading: verifying }] = useForgetOtpMutation();
  const [resendCode, { isLoading: resending }] = useForgotPasswordMutation();

  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  // Redirect if no email
  useEffect(() => {
    if (!emailFromQuery) {
      toast.error("Please request a reset code first.");
      router.replace("/forgot-password");
    }
  }, [emailFromQuery, router]);

  // Resend countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
    setCanResend(true);
  }, [resendTimer]);

  const onSubmit = async (values: FormValues) => {
    if (!emailFromQuery) return;

    try {
      await verifyOtp({
        email: emailFromQuery,
        code: values.code,
      }).unwrap();

      toast.success("Code verified! Set your new password.");

      // Forward email to reset-password
      router.push(`/reset-password?email=${encodeURIComponent(emailFromQuery)}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid or expired code.");
      form.setError("code", { message: " " }); // clear success message
    }
  };

  const handleResend = async () => {
    if (!emailFromQuery || !canResend) return;

    try {
      await resendCode({ email: emailFromQuery }).unwrap();
      toast.success("New code sent!");
      setResendTimer(60);
      setCanResend(false);
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend code.");
    }
  };

  if (!emailFromQuery) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-md">
        <div className="flex justify-start mb-6">
          <Logo />
        </div>

        <h1 className="text-2xl font-bold text-start mb-2">Enter Verification Code</h1>
        <p className="text-start text-sm text-muted-foreground mb-8">
          We sent a 6-digit code to <strong>{emailFromQuery}</strong>
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        {/* <InputOTPSeparator /> */}
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 bg-secondary text-background hover:bg-secondary/90"
              disabled={verifying || !form.formState.isValid}
            >
              {verifying ? "Verifying..." : "Verify & Continue"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">Didn't receive the code?</p>
          <Button
            variant="link"
            className="px-5 h-3 bg-secondary text-background hover:text-background/80 disabled:text-background-foreground disabled:hover:text-background"
            onClick={handleResend}
            disabled={!canResend || resending}
          >
            {resending
              ? "Sending..."
              : canResend
              ? "Resend Code"
              : `Resend in ${resendTimer}s`}
          </Button>
        </div>
      </div>
    </div>
  );
}