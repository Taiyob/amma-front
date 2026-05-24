'use client';

import {CheckCircle2} from 'lucide-react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function PaymentSuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4 sm:p-6">
      <Card className="w-full max-w-md text-center border shadow-xl border-emerald-100 bg-white/50 backdrop-blur-sm">
        <CardHeader className="pt-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 pb-10 px-6 sm:px-10">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Thank you for trusting Mojacares. your care request has been
              successfully created and your payment has been processed.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-medium">
              Our care coordinator will contact you shortly to finalize the
              details.
            </p>
          </div>

          <div className="pt-2">
            <Button
              asChild
              className="w-full h-12 bg-secondary text-background hover:bg-secondary/90 text-base font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Link href="/patient/dashboard">Back to Dashboard</Link>
            </Button>
          </div>

          {/* <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              Need help? <Link href="/contact" className="text-secondary font-medium hover:underline">Contact Support</Link>
            </p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
