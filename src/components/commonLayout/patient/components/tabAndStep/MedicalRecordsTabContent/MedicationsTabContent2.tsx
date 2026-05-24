/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import AppButton from '@/components/ui/AppButton';
import { Calendar, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AddMedicationDialog from '../../model/EditMedicationModal';
import {
  useAddMedicationMutation,
  useDeleteMedicationMutation,
} from '@/redux/api/medication.api';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface IProps {
  medications: TMedication[];
  visitId?: string;
  bookingId?: string;
  patientId: string;
  isLoading: boolean;
  isReadOnly?: boolean;
}

export type TMedication = {
  id: string;
  patientId: string;
  addedBy: string;
  visitId: string;
  prescribedBy: string | null;
  medicationName: string;
  dosage: string;
  frequency: string;
  timing: string[];
  duration: string;
  specialInstructions: string | null;
  startDate: string;
  patient?: {
    id: string;
    name: string;
  };
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

/** Group an array by a string key */
function groupByDate<T>(items: T[], getKey: (item: T) => string): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = getKey(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}

/** Collapsible date section */
const DateSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 w-full text-left"
      >
        <span className="bg-secondary text-white hover:bg-secondary/90 cursor-pointer flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full border border-input group-hover:bg-muted transition-colors">
          <Calendar className="h-3.5 w-3.5" />
          {label}
        </span>
        <div className="flex-1 h-px bg-border" />
        {open ? (
          <ChevronUp className="h-6 w-6 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-6 w-6 text-muted-foreground shrink-0" />
        )}
      </button>

      {open && <div className="space-y-2 pl-1">{children}</div>}
    </div>
  );
};

export const MedicationsTabContent2 = ({
  medications,
  visitId,
  bookingId,
  patientId,
  isLoading,
  isReadOnly = false,
}: IProps) => {
  const [openAddMedication, setAddOpenMedication] = useState(false);

  const [deleteMedication] = useDeleteMedicationMutation();
  const [addMedication] = useAddMedicationMutation();

  const handleAddMedicationAdd = async (med: any) => {
    const toastId = toast.loading('Creating medication, please wait...');

    console.log(patientId);

    try {
      const data: any = {
        patientId,
        medicationName: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        timing: med.times,
        duration: med.duration,
        prescribedBy: med.prescribedBy,
        specialInstructions: med.specialInstructions,
      };

      if (bookingId) {
        data.bookingId = bookingId;
      } else {
        data.visitId = visitId;
      }

      const res = await addMedication(data).unwrap();

      toast.success(res?.message || 'Medication created successfully', {
        id: toastId,
      });

      setAddOpenMedication(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create medication', {
        id: toastId,
      });
    }
  };

  const handleDeleteMedication = async (id: string) => {
    const toastId = toast.loading('Deleting medication...');

    try {
      const res = await deleteMedication(id).unwrap();

      toast.success(res?.message || 'Medication deleted successfully', {
        id: toastId,
      });
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to delete medication', {
        id: toastId,
      });
    }
  };

  // Group medications by createdAt date
  const grouped = medications?.length
    ? groupByDate(medications, (med: TMedication) => {
      const raw = med.createdAt || med.startDate;
      return raw
        ? new Date(raw).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
        : 'Unknown Date';
    })
    : {};

  // Sort date keys descending (newest first)
  const sortedDateKeys = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <div className="space-y-6">
      {!isReadOnly && (
        <div className="flex justify-end">
          <AppButton
            icon={<Plus />}
            label="Add Medication"
            onClick={() => setAddOpenMedication(true)}
            bgColor="bg-secondary hover:bg-secondary"
            textColor="text-background"
          />
        </div>
      )}

      <Card className="shadow-sm">
        <CardContent className="space-y-6">
          {isLoading ? (
            <>
              <MedicationSkeleton />
              <MedicationSkeleton />
              <MedicationSkeleton />
            </>
          ) : sortedDateKeys.length ? (
            sortedDateKeys.map((dateLabel) => (
              <DateSection key={dateLabel} label={dateLabel}>
                {grouped[dateLabel].map((med) => (
                  <MedicationItem
                    key={med.id}
                    id={med.id}
                    label={`${med.medicationName} ${med.dosage}`}
                    sublabel="Tab"
                    timing={med.frequency}
                    duration={med.duration}
                    description={med?.prescribedBy ? `Prescribed by ${med?.prescribedBy}` : 'No prescribed by'}
                    timeOfDay={med.timing}
                    isReadOnly={isReadOnly}
                    onDelete={() => handleDeleteMedication(med.id)}
                  />
                ))}
              </DateSection>
            ))
          ) : (
            <p>No medications found.</p>
          )}
        </CardContent>
      </Card>

      <AddMedicationDialog
        open={openAddMedication}
        onOpenChange={setAddOpenMedication}
        onAdd={handleAddMedicationAdd}
      />
    </div>
  );
};

const MedicationSkeleton = () => {
  return (
    <div className="animate-pulse flex justify-between gap-4 p-4 border rounded-lg">
      <div className="space-y-2 w-full">
        <div className="h-4 bg-muted rounded w-40"></div>
        <div className="h-3 bg-muted rounded w-64"></div>
      </div>

      <div className="flex gap-2">
        <div className="h-7 w-20 bg-muted rounded"></div>
        <div className="h-7 w-20 bg-muted rounded"></div>
      </div>
    </div>
  );
};

interface MedicationItemProps {
  id?: string;
  label: string;
  sublabel?: string;
  description?: string;
  timing: string;
  duration: string;
  timeOfDay?: string[];
  isReadOnly?: boolean;
  onDelete?: () => void;
}

const MedicationItem = (medication: MedicationItemProps) => {
  const {
    label,
    sublabel,
    description,
    timing,
    duration,
    timeOfDay = [],
    isReadOnly = false,
    onDelete,
  } = medication;

  return (
    <div
      className={cn(
        'flex flex-col mt-2 sm:flex-row sm:items-center justify-between gap-4 p-4',
        'rounded-lg border bg-background/50 hover:bg-background transition-colors',
      )}
    >
      <div className="space-y-1 flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <Label className="text-base font-medium leading-none">{label}</Label>

          {sublabel && (
            <span className="text-xs text-muted-foreground">({sublabel})</span>
          )}
        </div>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="text-sm whitespace-nowrap">
          <p className="font-medium">{timing}</p>
          <p className="text-xs text-muted-foreground">Duration: {duration}</p>
        </div>

        <div className="flex gap-2">
          {timeOfDay.map((time, i) => (
            <AppButton
              key={i}
              textColor="text-foreground"
              label={time}
              className="md:min-w-22.5 bg-secondary/40 hover:bg-secondary/40 text-xs sm:text-sm"
            />
          ))}
        </div>

        {/* DELETE CONFIRM */}
        {!isReadOnly && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-destructive cursor-pointer bg-rose-100 p-2 rounded-md hover:bg-rose-200 hover:text-red-600 transition">
                <Trash2 size={18} />
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>

                <AlertDialogDescription>
                  This medication will be permanently deleted. You will not be
                  able to recover it.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Delete Medication
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};
