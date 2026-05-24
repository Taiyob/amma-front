
'use client';

import AppButton from '@/components/ui/AppButton';
import { cn } from '@/lib/utils';

export interface MedicationItemProps {
  label: string;
  sublabel?: string;
  description?: string;
  prescribedBy?: string;
  timing: string;
  duration: string;
  timeOfDay?: string[];
}

const MedicationItem = ({
  label,
  sublabel,
  description,
  timing,
  duration,
  timeOfDay = [],
}: MedicationItemProps) => {
  return (
    <div
      className={cn(
        'flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 mt-2 min-h-[90px]',
        'rounded-xl border border-border/60 bg-card/30 hover:bg-card hover:shadow-sm transition-all group'
      )}>

      {/* ── Left Side: Info Section ── */}
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h4 className="text-[15px] font-semibold text-foreground leading-none truncate">
            {label}
          </h4>
          {/* {sublabel && (
            <span className="text-[11px] font-medium text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-md truncate max-w-[150px]">
              {sublabel}
            </span>
          )} */}
        </div>

        {description && (
          <p className="text-[13px] text-muted-foreground truncate group-hover:text-foreground/70 transition-colors">
            {description}
          </p>
        )}
      </div>

      {/* ── Right Side: Timing & Actions ── */}
      <div className="flex flex-row items-center justify-between xl:justify-end gap-4 sm:gap-6 shrink-0 border-t xl:border-none pt-3 xl:pt-0">
        <div className="text-sm text-left xl:text-right">
          <p className="font-semibold text-foreground">{timing}</p>
          <p className="text-[12px] text-muted-foreground mt-0.5">Duration: {duration}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(timeOfDay || []).map((time, i) => (
            <AppButton
              key={i}
              textColor="text-foreground hover:text-foreground/80"
              label={time}
              className="min-w-[70px] h-8 bg-secondary/40 hover:bg-secondary/50 text-[12px] sm:text-sm font-medium rounded-lg shadow-none px-3"
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default MedicationItem;