"use client";

import {
  Activity,
  User,
  Home,
  Clock,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import AppButton from "@/components/ui/AppButton";
import { useAppSelector } from "@/redux/hooks";
import { UserRole } from "@/types";

interface ActiveVisit {
  id: string;
  service: string;
  status: string;
  patientName: string;
  patientRelation: string;
  location: string;
  staffName: string;
  staffContact: string;
  startedTime: string;
}

interface ActiveVisitItemProps {
  visit: ActiveVisit;
  className?: string;
}

export function ActiveVisitItem({ visit, className }: ActiveVisitItemProps) {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role as UserRole | null;



  return (
    <div
      className={cn(
        "w-full rounded-xl  bg-background mt-4 shadow-sm",
        "p-4 sm:p-5",
        "flex flex-col lg:flex-row gap-6",
        className
      )}
    >
      {/* Left Content */}
      <div className="flex gap-4 flex-1 min-w-0">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          <Activity className="h-5 w-5 text-secondary" />
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium truncate">{visit.service}</h3>
            <Badge className="bg-chart-2/30 text-chart-2 border-chart-2">
              {visit.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>
                  {visit.patientName} ({visit.patientRelation})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>House {visit.location}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Dr. {visit.staffName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{visit.startedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
        <AppButton
          label="Contact Staff"
          icon={<Phone className="h-4 w-4 mr-2" />}
          href={`tel:${visit.staffContact}`}
          className="w-full"
          bgColor="bg-secondary hover:bg-secondary"
          textColor="text-background"
        />

        <AppButton
          label="View Details"
          icon={<ArrowRight className="h-4 w-4 ml-2" />}
          className="w-full hover:underline"
          href={`/shared/care-history/${visit.id}`}
          bgColor="bg-secondary hover:bg-secondary"
          textColor="text-background"
          hoverBgColor=""

        />
      </div>
    </div>
  );
}
