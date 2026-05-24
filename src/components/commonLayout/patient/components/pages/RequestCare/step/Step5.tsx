/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {cn} from '@/lib/utils';
import {Info, Loader2} from 'lucide-react';
import {useRequestCare} from '@/context/RequestCareContext';
import {useAddCareRequestMutation} from '@/redux/api/care.api';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

export const Step5 = () => {
  const {
    packageId,
    selectedPackage,
    selectedExtras,
    serviceIds,
    paymentMethod,
    isUrgent,
    getTotalPrice,
    setPaymentMethod,
    prev,
    careDate,
    timeSlot,
    symptoms,
    instructions,
    selectedPatient,
    addressId,
    newAddress,
    mobile,
  } = useRequestCare();

  const [addCareRequest, {isLoading}] = useAddCareRequestMutation();
  const router = useRouter();

  const handleSubmit = async () => {
    const toastId = toast.loading('Submitting care request...');
    try {
      const payload = {
        careDate: careDate ? new Date(careDate).toISOString() : null,
        timeSlot: timeSlot,
        symptomsDescription: symptoms,
        specialInstructions: instructions,
        ...(packageId ? {packageId} : {}),
        serviceIds: serviceIds,
        patientId: selectedPatient,
        paymentMethod: paymentMethod,
        ...(addressId ? {addressId} : {newAddress}),
        mobile: mobile,
      };

      console.log('Submitting payload:', payload);

      const res = await addCareRequest(payload).unwrap();
      console.log(res);

      if (res.success) {
        toast.success(
          res?.message || 'Care request submitted successfully!',
          {id: toastId},
        );
        if (res?.data?.payment?.url) {
          router.push(res.data.payment.url);
        } else {
          router.push('/patient/dashboard');
        }
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      toast.error(err?.data?.message || 'Failed to submit care request', {
        id: toastId,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Payment Methods */}
      <div className="space-y-6 lg:space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5">
            Payment Method
          </h2>

          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-3 sm:space-y-4">
            <div
              className={cn(
                'flex items-center gap-3 sm:gap-4 border rounded-xl p-4 sm:p-5 cursor-pointer transition-all hover:border-secondary/70',
                paymentMethod === 'card' &&
                  'border-secondary bg-secondary/5 ring-1 ring-secondary/30',
              )}
              onClick={() => setPaymentMethod('card')}>
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                <div className="font-medium">Card</div>
                <div className="text-sm text-muted-foreground">
                  Credit/Debit Card (Visa, Mastercard)
                </div>
              </Label>
              <div className="h-6 w-6 text-muted-foreground flex items-center justify-center">
                <Image
                  src="/image/icon/bi_stripe.svg"
                  width={100}
                  height={100}
                  alt="Card"
                />
              </div>
            </div>

            <div
              className={cn(
                'flex items-center gap-3 sm:gap-4 border rounded-xl p-4 sm:p-5 cursor-pointer transition-all hover:border-secondary/70',
                paymentMethod === 'momo' &&
                  'border-secondary bg-secondary/5 ring-1 ring-secondary/30',
              )}
              onClick={() => setPaymentMethod('momo')}>
              <RadioGroupItem value="momo" id="momo" />
              <Label htmlFor="momo" className="flex-1 cursor-pointer">
                <div className="font-medium">MOMO</div>
                <div className="text-sm text-muted-foreground">
                  Mobile Wallet
                </div>
              </Label>
              <div className="h-6 w-6 text-muted-foreground flex items-center justify-center">
                <Image
                  src="/image/icon/mobile.svg"
                  width={100}
                  height={100}
                  alt="MOMO"
                />
              </div>
            </div>
          </RadioGroup>
        </div>

        <Card className="border-secondary/30 bg-secondary/5">
          <CardContent className="p-5 sm:p-6 flex gap-3 sm:gap-4 text-sm">
            <Info className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
            <div className="space-y-1.5">
              <p className="font-medium text-secondary">Important</p>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-muted-foreground">
                <li>Payment required to confirm booking</li>
                <li>Non-refundable after confirmation</li>
                <li>Agree to terms & conditions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <Card className="h-fit border-secondary/20 lg:sticky lg:top-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-secondary">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 sm:space-y-6">
          {selectedPackage || selectedExtras.length > 0 ? (
            <>
              <div>
                <p className="font-medium text-sm sm:text-base">
                  Selected Service
                </p>
                <div className="text-sm text-muted-foreground mt-1 space-y-1">
                  {selectedPackage && (
                    <p>
                      {selectedPackage}
                      {isUrgent ? ' (Home Visit)' : ''}
                    </p>
                  )}
                  {selectedExtras.map((item) => (
                    <p key={item.id}>+ {item.name}</p>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                {selectedPackage && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {selectedPackage}
                    </span>
                    <span>${useRequestCare().packagePrice}</span>
                  </div>
                )}

                {selectedExtras.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))}

                <div className="flex justify-between pt-4 border-t font-semibold text-base sm:text-lg text-secondary">
                  <span>Estimated Total</span>
                  <span>${getTotalPrice()}</span>
                </div>
              </div>

              <div className="pt-5 sm:pt-6 space-y-3">
                <Button
                  className="w-full h-11 text-background sm:h-12 bg-secondary hover:bg-secondary/90 text-base"
                  onClick={handleSubmit}
                  disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Confirm & Pay $${getTotalPrice()}`
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 sm:h-12 border-secondary text-secondary hover:bg-secondary/5"
                  onClick={prev}
                  disabled={isLoading}>
                  Back
                </Button>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-center py-10 sm:py-12">
              No service selected yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
