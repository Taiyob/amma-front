// components/ui/PublishedReportCard.tsx
"use client";

import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PublishedReportCardProps {
  patientName: string;
  reportType: string;
  publishedAt: string; // e.g. "2 hours ago"
  status?: "published" | "draft" | "pending";
  className?: string;
}
export const dummyPublishedReports = [
  {
    patientName: "Abdul Khan",
    reportType: "Blood Test",
    publishedAt: "2 hours ago",
    status: "published",
  },
  {
    patientName: "Sarah Ahmed",
    reportType: "Prescription Update",
    publishedAt: "5 hours ago",
    status: "published",
  },
  {
    patientName: "Michael Wong",
    reportType: "ECG Report",
    publishedAt: "Yesterday",
    status: "published",
  },
];
export function PublishedReportCard({
  patientName,
  reportType,
  publishedAt,
  status = "published",
  className,
}: PublishedReportCardProps) {
  return (
    <div
      className={cn(
        "bg-background border rounded-lg shadow-sm hover:shadow-md transition-all",
        "p-4 flex flex-col gap-2.5 cursor-pointer",
        className
      )}
    >
      {/* Patient name row + badge */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-base text-foreground truncate">
          {patientName}
        </h3>

        <Badge
          variant="outline"
          className={cn(
            "text-xs font-medium px-2.5 py-0.5 uppercase tracking-wide",
            status === "published"
              ? "bg-background text-chart-3 border-chart-3"
              : status === "draft"
              ? "bg-background text-destructive border-muted"
              : "bg-background text-foreground border-ring-muted"
          )}
        >
          {status}
        </Badge>
      </div>

      {/* Report type */}
      <div className="text-sm font-medium text-foreground">
        {reportType}
      </div>

      {/* Time ago */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>{publishedAt}</span>
      </div>
    </div>
  );
}