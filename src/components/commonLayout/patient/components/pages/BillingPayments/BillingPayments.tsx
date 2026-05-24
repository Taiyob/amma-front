// components/settings/BillingAndPayments.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Trash2, Plus, Info} from 'lucide-react';

export default function BillingAndPayments() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Billing & Payments
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your invoices, payments, and billing preferences
        </p>
      </div>

      {/* Payment Methods Section */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your invoices, payments, and billing preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stripe Connect Method */}
          <div className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-100 text-purple-600 font-bold text-xl">
                S
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Stripe Connect</span>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    DEFAULT
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Connected Account
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive">
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          {/* MOMO Pay Method */}
          <div className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-orange-100 text-orange-600 font-bold text-xl">
                M
              </div>
              <div>
                <span className="font-medium">MOMO Pay</span>
                <p className="text-sm text-muted-foreground">Mobile Wallet</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive">
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Add Payment Method */}
          <div className="border border-dashed rounded-lg p-6 text-center">
            <Button variant="outline" className="mx-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Pay Section */}
      <Card>
        <CardContent className="pt-6 ">
          <div className="flex items-start bg-chart-3/15 gap-4 rounded-lg border  p-5">
            <Info className="h-5 w-5 text-chart-3 mt-0.5" />
            <div className="space-y-2 flex-1">
              <p className="text-sm font-medium">Auto-Pay Active</p>
              <p className="text-sm text-chart-3">
                Your next payment of{' '}
                <span className="font-medium text-chart-3">$450.00</span> will
                be automatically charged on Nov 1st using your new default card
                ending in 5512.
              </p>
              <Button variant="link" className="h-auto p-0 text-chart-3">
                Manage Auto-Pay
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
