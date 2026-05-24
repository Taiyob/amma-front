"use client";

import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/reUseAbleComponents/DataTable";
import type { CareRequest } from "@/types/request";
import { format } from "date-fns";

// requestColumns.ts
export const requestColumns: Column<CareRequest>[] = [
  {
    key: 'serial',
    label: '#',
    className: 'w-12 md:w-16 font-medium',
    render: (_, __, index) => index + 1,
  },
  {
    key: "patient",
    label: "Patient",
    className: "",
    render: (_, row) => (
      <div className="space-y-0.5">
        <div className="font-medium leading-tight text-sm md:text-base">
          {row.patient?.name || "N/A"}
        </div>
        <div className="text-xs text-muted-foreground">
          {row.patient?.relationship}
          {/* {row.address?.area}, {row.address?.city} */}
        </div>
      </div>
    ),
  },
  {
    key: "service",
    label: "Requested Service",
    className: "",
    render: (_, row) => (
      <div className="text-sm">
        {row.bookingItems?.[0]?.service?.name || "N/A"}
        {row.bookingItems?.length > 1 && ` (+${row.bookingItems.length - 1} more)`}
      </div>
    ),
  },
  {
    key: "scheduledDate",
    label: "Date & Time",
    className: "",
    render: (_, row) => (
      <div className="text-xs md:text-sm whitespace-nowrap">
        <div className="font-medium">
          {row.scheduledDate ? format(new Date(row.scheduledDate), "MMM d, yyyy") : "N/A"}
        </div>
        <div className="text-muted-foreground text-xs">{row.preferredTime}</div>
      </div>
    ),
  },
  // {
  //   key: "priority",
  //   label: "Priority",
  //   className: "",
  //   render: (value: string) => {
  //     const variant =
  //       value === "URGENT"
  //         ? "destructive"
  //         : value === "ROUTINE"
  //           ? "outline"
  //           : "secondary";

  //     return (
  //       <Badge
  //         variant={variant}
  //         className="font-medium px-2 py-0.5 md:px-3 md:py-1 text-xs"
  //       >
  //         {value}
  //       </Badge>
  //     );
  //   },
  // },
  {
    key: "action",
    label: "Action",
    className: "",
  },
];