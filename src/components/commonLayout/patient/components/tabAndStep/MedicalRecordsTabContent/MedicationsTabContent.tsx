import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';
import {CalendarDays, Pill, Clock, User, Info} from 'lucide-react';

export const MedicationsTabContent = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Pill className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Metformin 500mg</CardTitle>
                <CardDescription className="pt-1">
                  Once daily – Active medication
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary">Ongoing</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Dosage & Frequency</span>
              </div>
              <p className="font-medium">500 mg – Once daily</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Timing</span>
              </div>
              <p className="font-medium text-primary">Morning</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Prescribed By</span>
              </div>
              <p className="font-medium">Dr. Rahman Ahmed</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>Duration</span>
              </div>
              <p className="font-medium">Dec 15, 2025 – Mar 15, 2026</p>
            </div>
          </div>

          <Separator />

          {/* Purpose & Instructions */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                <Info className="h-4 w-4" />
                <span>Purpose</span>
              </div>
              <p className="font-medium">Blood pressure control</p>
              <p className="text-sm text-muted-foreground mt-1">
                (Note: Metformin is primarily indicated for type 2 diabetes
                management; blood pressure effects are usually
                secondary/modest.)
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                <Info className="h-4 w-4" />
                <span>Instructions</span>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border text-sm">
                Take with food in the morning
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
