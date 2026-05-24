"use client";

import { Button } from "@/components/ui/button";
import { Column } from "@/components/reUseAbleComponents/DataTable";
import type { Request } from "@/types/request";
import { Mail, Phone } from "lucide-react";

export const PendingVerificationsColumns: Column<Request>[] = [
  {
    key: "id",
    label: "User ID",
    className: "font-medium w-20 md:w-24",
    responsiveHide: "sm",
  },
  {
    key: "name",
    label: "Name",
    className: "min-w-[140px] md:min-w-[180px]",
    render: (_, row) => (
      <div className="space-y-0.5 py-1">
        <div className="font-medium leading-tight text-sm md:text-base">
          {row.patient}
        </div>
        <div className="text-xs text-muted-foreground">
          {row.relation} • {row.location}
        </div>
      </div>
    ),
  },
  {
    key: "location",
    label: "Location",
    className: "min-w-[120px] md:min-w-[220px]",
    responsiveHide: "sm",
  },
  {
    key: "contact",
    label: "Contact",
    className: "min-w-[130px] md:min-w-[160px]",
    render: (_, row) => (
      <div className="space-y-1 text-sm">
        {row.phoneNumber ? (
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>{row.phoneNumber}</span>
          </div>
        ) : (
          <span>—</span>
        )}
        {row.email && (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span className="truncate">{row.email}</span>
          </div>
        )}
      </div>
    ),
  },
  {
    key: "family-members",
    label: "Family",
    className: "w-20 md:w-32",
    render: (_, row) => (
      <div className="text-center">
        {row.familyMember ? (
          <div className="text-sm font-medium">{row.familyMember}</div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>
    ),
  },
  {
    key: "submitted",
    label: "Submitted",
    className: "w-24 md:w-32",
    render: (_, row) => (
      <div className="text-right text-sm whitespace-nowrap">
        {row.date || "—"}
      </div>
    ),
  },
  {
    key: "action",
    label: "Action",
    className: "w-20 md:w-32",
    render: () => (
      <Button
        variant="ghost"
        size="sm"
        className="bg-primary text-foreground hover:text-chart-2 text-xs md:text-sm px-2 md:px-3 w-full"
      >
        Review
      </Button>
    ),
  },
];