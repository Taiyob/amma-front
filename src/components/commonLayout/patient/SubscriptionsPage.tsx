'use client';

import { useGetCurrentSubscriptionQuery } from '@/redux/api/subscriptions.api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Clock,
  Calendar,
  CreditCard,
  ArrowRight,
  Loader2,
  AlertCircle,
  HeadphonesIcon,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { getPlanDisplayName } from '@/utils/planMapping';

export default function SubscriptionsPage() {
  const { data: subData, isLoading } = useGetCurrentSubscriptionQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  const subscription = subData?.data;

  if (!subscription) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-5">
          <CreditCard className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight mb-2">
          No active subscription
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
          You don&apos;t have an active subscription yet. Choose a plan to
          unlock premium healthcare features for you and your family.
        </p>
        <Button
          asChild
          className="bg-secondary text-background hover:bg-secondary/90 rounded-full px-6">
          <Link href="/pricing" className="inline-flex items-center gap-2">
            View pricing plans <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  const isPending = subscription.status === 'PENDING';
  const isActive = subscription.status === 'ACTIVE';

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-0.5">
            Billing &amp; Payments
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            My Subscription
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your current plan and billing cycles.
          </p>
        </div>

        <Button
          variant="secondary"
          className="border-secondary text-medium hover:bg-secondary/80 text-white rounded-lg px-5 transition-all"
        >
          <Link href="/patient/transactions" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            All Transactions
          </Link>
        </Button>
      </div>

      {/* Plan Card */}
      <Card className="overflow-hidden border shadow-sm">
        {/* Accent stripe */}
        <div
          className={`h-1.5 w-full ${isActive ? 'bg-emerald-500' : 'bg-secondary'
            }`}
        />
        <CardContent className="p-6">
          {/* Plan name + price */}
          <div className="flex items-start justify-between">
            <div>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${isActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-50 text-secondary'
                  }`}>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                )}
                {subscription.status.charAt(0) +
                  subscription.status.slice(1).toLowerCase()}
              </span>
              <h2 className="text-xl font-semibold mt-2.5 text-foreground">
                {getPlanDisplayName(subscription.plan.name)} Plan
              </h2>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-secondary leading-none">
                ${subscription.plan.price}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                per {subscription.plan.interval.toLowerCase().replace('ly', '')}
              </p>
            </div>
          </div>

          <hr className="my-5 border-border/60" />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Started on
              </div>
              <p className="text-sm font-semibold">
                {format(new Date(subscription.startDate), 'MMM dd, yyyy')}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3.5">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                <Clock className="h-3.5 w-3.5" />
                Next payment
              </div>
              <p className="text-sm font-semibold">
                {subscription.nextPaymentDate
                  ? format(
                    new Date(subscription.nextPaymentDate),
                    'MMM dd, yyyy',
                  )
                  : 'N/A'}
              </p>
            </div>
          </div>

          {/* Pending warning */}
          {isPending && (
            <div className="mt-4 flex gap-3 items-start bg-amber-50 border border-amber-200/80 p-3.5 rounded-lg">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Payment pending
                </p>
                <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                  Your subscription is pending payment. Complete the transaction
                  to activate your benefits.
                </p>
              </div>
            </div>
          )}

          <hr className="my-5 border-border/60" />

          {/* Features */}
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
            Included features
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {subscription.plan.features?.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-foreground/80">{feature}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          {/* <div className="flex items-center gap-2 mt-6 pt-5 border-t border-border/60">
            {isPending && (
              <Button
                size="sm"
                className="bg-secondary text-background hover:bg-secondary/90">
                Retry payment
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href="/pricing">Change plan</Link>
            </Button>
            {isActive && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 ml-auto">
                Cancel subscription
              </Button>
            )}
          </div> */}
        </CardContent>
      </Card>

      {/* Bottom info cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
              Payment details
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Method</span>
                <span className="font-medium flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5" />
                  Paystack
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Transaction</span>
                <span className="font-mono text-xs text-muted-foreground truncate max-w-27.5">
                  {subscription.paystackCode}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-4 flex flex-col h-full justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">
                Need help?
              </p>
              <p className="text-sm text-muted-foreground">
                Questions about your plan or billing?
              </p>
            </div>
            <Button
              size="sm"
              className="w-full mt-3 bg-secondary hover:bg-secondary/80 text-white"
              asChild>
              <Link
                href="/patient/help"
                className="inline-flex items-center gap-2">
                <HeadphonesIcon className="h-3.5 w-3.5" />
                Contact support
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
