/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { FormData } from '@/types/Register.types';
import { ChevronsLeft, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  useGetBookingQuery,
  usePaymentForBookingMutation,
} from '@/redux/api/booking.api';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

interface Step4Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  prevStep: () => void;
  errors: Partial<Record<keyof FormData, string>>;
}

export default function Step4({
  formData,
  prevStep,
  updateField,
  errors,
}: Step4Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('bookingId');

  // Fetch booking data
  const { data: bookingResponse, isLoading } = useGetBookingQuery(
    bookingId ?? '',
    { skip: !bookingId },
  );

  const [payment, { isLoading: isPaymenting }] = usePaymentForBookingMutation();

  if (isLoading || !bookingResponse?.data) {
    return <div>Loading booking details...</div>;
  }

  const bookingData = bookingResponse?.data;
  const patient = bookingData?.patient;
  const service = bookingData?.service;
  const total = bookingData?.totalAmount || 0;
  const serviceFee = bookingData?.serviceFee || 0;
  const basePrice = service?.basePrice || 0;

  const user_role = patient?.role?.toLowerCase() || 'patient';

  // Handle payment submission
  const handlePayment = async () => {
    if (!formData.paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    try {
      const payload = {
        paymentMethod: formData.paymentMethod === 'card' ? 'PAYSTACK' : 'MOMO', // map options
      };

      const res = await payment({ id: bookingData.id, data: payload }).unwrap();
      console.log(res);

      if (res.success) {
        toast.success(
          `${res?.data?.message}, Redirecting to payment, Please wait a moment...` ||
          'Payment successful!',
        );
        router.push(res?.data?.paymentUrl);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      toast.error(err?.data?.message || 'Payment failed');
    }
  };

  return (
    <div className="space-y-8 py-6 ">
      <Card className="bg-muted text-center">
        <CardContent className="pt-6 space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-foreground text-4xl">Order Summary</span>
            <span className="font-medium">Ref: {bookingData.referenceNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Patient</span>
            <span className="font-medium">{patient?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Relationship</span>
            <span className="font-medium">{patient?.relationship}</span>
          </div>
          {patient?.gender && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gender</span>
              <span className="font-medium">{patient?.gender}</span>
            </div>
          )}
          {patient?.dateOfBirth && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date of Birth</span>
              <span className="font-medium">{patient?.dateOfBirth}</span>
            </div>
          )}
          {patient?.bloodGroup && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blood Group</span>
              <span className="font-medium">{patient?.bloodGroup}</span>
            </div>
          )}
          {patient?.mobileNumber && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mobile</span>
              <span className="font-medium">{patient?.mobileNumber}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium">{service?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">
              {new Date(bookingData.scheduledDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time</span>
            <span className="font-medium">{bookingData.preferredTime}</span>
          </div>
          <div className="flex justify-between border-t pt-3 mt-2">
            <span className="font-semibold">Service Cost</span>
            <span className="font-bold text-lg">${basePrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Service Fee</span>
            <span className="font-bold text-lg">${serviceFee}</span>
          </div>
          <div className="flex justify-between border-t pt-3 mt-2">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">${total}</span>
          </div>
        </CardContent>
      </Card>

      <h1 className="text-lg font-semibold">Payment Method</h1>
      <div className="space-y-4">
        {/* Credit / Debit Card */}
        <div
          onClick={() => updateField('paymentMethod', 'card')}
          className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition
      ${formData.paymentMethod === 'card'
              ? 'border-secondary shadow-sm'
              : 'border-border hover:bg-muted'
            }
    `}>
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-full bg-muted text-secondary flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Credit / Debit Card</p>
              <p className="text-sm text-muted-foreground">
                Visa, Mastercard, American Express
              </p>
            </div>
          </div>
          <div
            className={`h-5 w-5 rounded-full flex items-center justify-center
        ${formData.paymentMethod === 'card'
                ? 'border-primary'
                : 'border-muted-foreground'
              }
      `}>
            {formData.paymentMethod === 'card' && (
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </div>
        </div>

        {/* Mobile Money */}
        <div
          onClick={() => updateField('paymentMethod', 'mobile')}
          className={`flex items-center justify-between rounded-xl border p-4 cursor-pointer transition
      ${formData.paymentMethod === 'mobile'
              ? 'border-secondary shadow-sm'
              : 'border-border hover:bg-muted'
            }
    `}>
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-full bg-muted text-secondary flex items-center justify-center">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Mobile Money</p>
              <p className="text-sm text-muted-foreground">
                MTN, Vodafone, AirtelTigo
              </p>
            </div>
          </div>
          <div
            className={`h-5 w-5 rounded-full flex items-center justify-center
        ${formData.paymentMethod === 'mobile'
                ? 'border-primary'
                : 'border-muted-foreground'
              }
      `}>
            {formData.paymentMethod === 'mobile' && (
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </div>
        </div>
        {errors.paymentMethod && (
          <p className="text-destructive text-sm">{errors.paymentMethod}</p>
        )}
      </div>

      <div className="flex justify-between gap-3 pt-6">
        <Button className="" type="button" variant="outline" onClick={prevStep}>
          <ChevronsLeft /> Back
        </Button>

        <div>
          <Link href={`/${user_role}/dashboard`} className="mr-2">
            <Button variant="outline">Pay Later</Button>
          </Link>
          <Button
            className="bg-secondary hover:bg-secondary text-background"
            type="button"
            onClick={handlePayment}
            disabled={isPaymenting}>
            {isPaymenting ? 'Processing...' : 'Confirm Payment'}
          </Button>
        </div>
      </div>
    </div>
  );
}
