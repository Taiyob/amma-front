// components/appointments/CompletedCheckupCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, CheckCircle2 } from "lucide-react";

interface CompletedCheckupProps {
  checkupType?: string;
  patientName?: string;
  patientRelation?: string;
  patientAge?: number;
  completedDate?: string;
}

export default function CompletedCheckupCard({
  checkupType = "Blood Pressure Check",
  patientName = "Fatima Ahmed",
  patientRelation = "Mother",
  patientAge = 64,
  completedDate = "Jan 11, 2026",
}: CompletedCheckupProps) {
  return (
    <Card className="border border-gray-200 mt-4 shadow-sm rounded-xl overflow-hidden bg-white">
      <CardContent className="p-5 space-y-4">
        {/* Header: Title + Status Badge */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold text-gray-900 leading-tight">
            {checkupType}
          </h3>

          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 flex items-center gap-1 px-3 py-1 text-sm font-medium"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completed
          </Badge>
        </div>

        {/* Patient Info */}
        <div className="flex items-center gap-3 text-sm">
          <User className="h-4.5 w-4.5 text-gray-500 shrink-0" />
          <span className="text-gray-800 font-medium">
            {patientName} ({patientRelation} )
          </span>
        </div>

        {/* Completion Date */}
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="h-4.5 w-4.5 text-gray-500 flex-shrink-0" />
          <span className="text-gray-600">
            Completed on {completedDate}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}