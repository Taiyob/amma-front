import AppButton from '@/components/ui/AppButton';
import {Card, CardContent} from '@/components/ui/card';
import {HeartPlus} from 'lucide-react';

export default function RequestCareCard() {
  return (
    <Card className="border bg-background">
      <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="space-y-1.5">
          <h2 className="text-lg font-semibold sm:text-xl">
            Need professional assistance?
          </h2>
          <p className="text-sm text-muted-foreground">
            Request care from our healthcare professionals or browse specific
            services
          </p>
        </div>

        <AppButton
          label="Request Care"
          icon={<HeartPlus size={16} />}
          className="w-full sm:w-auto bg-secondary hover:bg-secondary"
          href="/patient/request-care"
          textColor="text-background"
        />
      </CardContent>
    </Card>
  );
}
