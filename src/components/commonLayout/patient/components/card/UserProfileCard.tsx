/* eslint-disable @next/next/no-img-element */
'use client';

import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {CalendarDays, Trash, User, MapPin} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useDeletePatientMutation} from '@/redux/api/patient.api';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {useState} from 'react';
import AppButton from '@/components/ui/AppButton';
import AddPatientModal from '../model/AddPatientModal';

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

interface PatientProfileCardProps {
  name?: string;
  relation?: string;
  age?: number;
  lastVisit?: string;
  conditions?: string;
  avatarUrl?: string;
  className?: string;
  patientId?: string;
  address?: string;
}

export function PatientProfileCard({
  name,
  relation,
  age,
  lastVisit,
  conditions,
  avatarUrl,
  patientId,
  address,
  className,
}: PatientProfileCardProps) {
  const [deletePatient, {isLoading}] = useDeletePatientMutation();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async () => {
    if (!patientId) return;

    try {
      await deletePatient(patientId).unwrap();

      toast.success('Patient deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete patient');
    }
  };

  return (
    <div>
      <Card
        className={cn(
          'w-full max-w-md overflow-hidden border bg-card shadow-sm transition-all hover:shadow-md',
          className,
        )}>
        <CardHeader className="px-5 pt-5 pb-3 flex flex-row items-center gap-4">
          {/* Avatar */}
          <div className="relative shrink-0 rounded-full border border-secondary p-0.5">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-border/60 bg-muted">
              <img
                src={avatarUrl || '/default-patient.png'}
                alt={name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-lg font-semibold leading-tight truncate capitalize">
              {name}
            </h3>

            <div className="flex items-center gap-2">
              <span className="capitalize text-medium text-sm font-medium text-muted-foreground">
                {relation}
              </span>

              {/* <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                Family
              </span> */}
            </div>
          </div>

          {/* Delete Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                className="bg-rose-100 text-rose-600 hover:bg-rose-400 hover:text-white transition cursor-pointer">
                <Trash size={18} />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this patient?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. After deleting this patient you
                  will no longer be able to access their visits, prescriptions,
                  or medical records.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="bg-rose-500 duration-200  hover:bg-rose-400 text-white">
                  {isLoading ? 'Deleting...' : 'Delete Patient'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>

        {/* Content */}
        <CardContent className="px-5 pb-4 pt-1 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              <span>Last visit: {lastVisit}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{age} years old</span>
            </div>
          </div>

          {address && address !== 'N/A' && (
            <div className="flex items-start gap-1.5 text-sm text-muted-foreground mt-2">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="leading-snug">{address}</span>
            </div>
          )}

          {conditions && (
            <div className="text-sm leading-relaxed mt-2 truncate">
              <span className="text-muted-foreground">
                Existing Conditions:{' '}
              </span>
              <span className="font-medium text-gray-700" title={conditions}>
                {conditions}
              </span>
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-5 pb-5 pt-1">
          <AppButton
            label="View Details"
            width="full"
            className="w-full bg-secondary hover:bg-secondary"
            href={patientId ? `/shared/user-profile/${patientId}` : '#'}
            textColor="text-background"
          />
        </CardFooter>
      </Card>

      {/* Add Patient Modal */}
      <AddPatientModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
