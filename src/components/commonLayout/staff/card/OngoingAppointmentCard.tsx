/* eslint-disable @typescript-eslint/no-explicit-any */
// components/appointments/OngoingAppointmentCard.tsx
'use client';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Calendar, MapPin, Phone, User, Loader2} from 'lucide-react';
import {useState} from 'react';
import StaffCareUpdateModal from '../model/StaffCareUpdateModal';
import Link from 'next/link';
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
import {useCompleteAssignTaskMutation, useStartAssignTaskMutation} from '@/redux/api/staff.api';
import {toast} from 'sonner';
import {IPatientProfileDetail} from '@/types/user';

export interface IVitals {
  bloodPressure: string;
  bloodGlucose: string;
  weight: string;
}

interface OngoingAppointmentProps {
  appointmentType: string;
  patientName: string;
  patientLocation: string;
  date: string;
  time: string;
  patientContact: string;
  familyMemberName: string;
  familyMemberRelation: string;
  familyMemberLocation: string;
  patientId: string;
  assignmentId: string;
  patient?: IPatientProfileDetail;
  vitals?: IVitals;
  completedId: string;
  status: string;
}

export default function OngoingAppointmentCard({
  appointmentType = '',
  patientName = '',
  patientLocation = '',
  date = '',
  time = '',
  patientContact = '',
  familyMemberName = '',
  familyMemberRelation = '',
  familyMemberLocation = '',
  assignmentId,
  patient,
  vitals,
  completedId,
  status,
}: OngoingAppointmentProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [completeTask, {isLoading: isCompleting}] =
    useCompleteAssignTaskMutation();
  const [startTask, {isLoading: isStarting}] = useStartAssignTaskMutation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isStartAlertOpen, setIsStartAlertOpen] = useState(false);

  const handleConfirmComplete = async () => {
    try {
      await completeTask(completedId).unwrap();
      toast.success('Appointment marked as completed successfully.');
      setIsAlertOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message || 'Failed to mark appointment as complete.',
      );
    }
  };

  const handleStartSchedule = async () => {
    try {
      await startTask(completedId).unwrap();
      toast.success('Appointment started successfully.');
      setIsStartAlertOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message || 'Failed to start appointment.',
      );
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden">
      <CardContent className="p-6 space-y-6">
        {/* Header with Type & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {appointmentType}
            </h3>
            <p className="text-sm font-medium text-gray-700">{patientName}</p>
          </div>

          {status === 'assigned' ? (
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 px-3 py-1 text-sm font-medium">
              Scheduled
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 px-3 py-1 text-sm font-medium">
              Ongoing
            </Badge>
          )}
        </div>

        {/* Location & Date/Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-800">{patientLocation}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {date} • {time}
              </p>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Patient Contact
            </p>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-600" />
              <a
                href={`tel:${patientContact}`}
                className="text-gray-800 font-medium hover:underline">
                {patientContact}
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Family Member
            </p>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-gray-800 font-medium">
                {familyMemberName} ({familyMemberRelation}{' '}
                {familyMemberLocation})
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col lg:flex-row gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            className="flex-1 border-gray-300 hover:bg-gray-50"
            asChild>
            <Link href={`/shared/care-history/${assignmentId}`}>
              {' '}
              View Details
            </Link>
          </Button>

          <Button
            className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
            onClick={() => setIsEditOpen(true)}>
            Update Appointment
          </Button>

          {status === 'assigned' ? (
            <AlertDialog
              open={isStartAlertOpen}
              onOpenChange={setIsStartAlertOpen}>
              <AlertDialogTrigger asChild>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  Start Schedule
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Start Appointment?</AlertDialogTitle>
                  <AlertDialogDescription className="text-base text-gray-700">
                    Are you sure you want to start this appointment now? This
                    will mark the assignment as ongoing.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleStartSchedule}
                    disabled={isStarting}
                    className="bg-secondary hover:bg-secondary/80 text-white">
                    {isStarting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Yes, Start
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogTrigger asChild>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  Mark Completed
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-base text-gray-700">
                    Are you sure you want to complete this? Once it is
                    completed, you won’t be able to make any further updates. If
                    you need to add any medication or documents, please do so
                    from the Edit Appointment section.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleConfirmComplete}
                    disabled={isCompleting}
                    className="bg-secondary hover:bg-secondary/80 text-white">
                    {isCompleting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Yes, Complete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        <StaffCareUpdateModal
          open={isEditOpen}
          setOpen={setIsEditOpen}
          bookingId={assignmentId}
          patient={patient}
          vitals={vitals}
        />
      </CardContent>
    </Card>
  );
}
