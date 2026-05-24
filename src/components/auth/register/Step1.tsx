'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/Register.types';
import { LoaderIcon, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface Step1Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  nextStep: () => void;
  goToOtp: () => void;
  errors: Partial<Record<keyof FormData, string>>;
  isRegistering: boolean;
}

export default function Step1({
  formData,
  updateField,
  nextStep,
  goToOtp,
  errors,
  isRegistering,
}: Step1Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="p-4">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Enter your name"
            required
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="example@gmail.com"
            required
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>

          <div className="relative w-full h-10">
            <PhoneInput
              country={'gh'}
              value={formData.phone}
              onChange={(phone) => updateField('phone', `+${phone}`)}
              inputClass="!md:w-[85%] !w-[80%] !absolute !top-0 !right-0 !h-10 !text-sm !rounded-md !border !border-input !bg-background !shadow-sm !px-3"
              buttonClass="!border !border-input !rounded-md !bg-transparent !px-2 !h-10"
              dropdownClass="!text-sm"
            />
          </div>

          {errors.phone && (
            <p className="text-destructive text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="Enter Your Password"
              required
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-destructive text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>

          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              placeholder="Re-enter your password"
              required
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-destructive text-sm">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-6">
        <div className="flex justify-between gap-3 ">
          <Button type="button" variant="outline" className='bg-gray-100' >
            <Link href={'/'} className='flex items-center gap-2 '> <ArrowLeft /> Back To Home</Link>
          </Button>

          <Button type="button" onClick={nextStep} disabled={isRegistering} className='bg-secondary text-background hover:bg-secondary'>
            {isRegistering ? (
              <span className="flex gap-1 items-center ">
                <LoaderIcon className="w-4 h-4 animate-spin" />
                Creating...
              </span>
            ) : (
              <span className='flex items-center gap-2'> Next <ArrowRight /> </span>
            )}
          </Button>
        </div>

        <span
          className="mt-2 text-sm border rounded-md p-2 text-center"
          onClick={goToOtp}>
          Already register account!{' '}
          <Link
            className="text-blue-400 underline transition-all duration-300"
            href={''}>
            Resend OTP / Verify Email
          </Link>
        </span>
      </div>
    </div>
  );
}
