/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AppButton from '@/components/ui/AppButton';
import {Badge} from '@/components/ui/badge';
import {Label} from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  useGetPatientAllCareRequestQuery,
  useGetUpcomingCareRequestQuery,
} from '@/redux/api/care.api';
import {useGetPreviousPatientVisitQuery} from '@/redux/api/visit.api';
import {useAppSelector} from '@/redux/hooks';

import {ArrowRight, Calendar, StethoscopeIcon} from 'lucide-react';

const SkeletonCard = () => {
  return (
    <div className="animate-pulse flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 rounded-md border border-input p-4">
      <div className="flex gap-4 w-full">
        <div className="h-12 w-12 rounded-full bg-muted"></div>

        <div className="space-y-2 w-full">
          <div className="h-4 w-40 bg-muted rounded"></div>
          <div className="h-3 w-60 bg-muted rounded"></div>
        </div>
      </div>

      <div className="h-8 w-28 bg-muted rounded"></div>
    </div>
  );
};

export const NextAppointmentAndVisitHistoryCard = ({
  patient,
}: {
  patient?: string;
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const patientIdFromRedux = useAppSelector(
    (state) => state.patient.selectedPatientId,
  );

  let patientId;

  if (patient) {
    patientId = patient;
  } else {
    patientId = patientIdFromRedux;
  }

  const {data: upcoming, isLoading: upcomingLoading} =
    useGetUpcomingCareRequestQuery(patientId, {skip: !patientId});

  const {data: visits, isLoading: visitLoading} =
    useGetPreviousPatientVisitQuery(patientId, {skip: !patientId});

  const {data: careHistory, isLoading: careLoading} =
    useGetPatientAllCareRequestQuery(patientId, {skip: !patientId});

  const upcomingAppointments = upcoming?.data || [];
  const visitHistory = visits?.data || [];
  const careRequests = careHistory?.data || [];

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    
  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'ongoing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Upcoming Appointments */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold">Upcoming Care Appointments</h2>

        {upcomingLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appointment: any) => (
            <div
              key={appointment.id}
              className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 rounded-md border border-input p-4 shadow-sm transition hover:bg-muted/40">
              <div className="flex items-start sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-secondary">
                  <StethoscopeIcon className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-medium">
                    Upcoming Appointment
                    <span className="flex flex-wrap gap-1 mt-1">
                      {appointment.services?.map(
                        (service: string, i: number) => (
                          <span
                            key={i}
                            className="bg-rose-100 text-rose-600 text-[10px] px-2 py-1 rounded-lg">
                            {service.replaceAll('_', ' ')}
                          </span>
                        ),
                      )}
                    </span>
                  </Label>

                  <div className="flex items-center gap-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(appointment.scheduledDate)}
                    </p>
                    <Badge
                      variant="outline"
                      className={cn('capitalize text-[12px] px-2 py-0', getStatusStyles(appointment.status))}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <AppButton
                  label="View Details"
                  className="flex items-center gap-2 bg-secondary text-sm font-medium hover:bg-secondary hover:underline"
                  icon={<ArrowRight className="h-4 w-4" />}
                  href={`/shared/care-history/${appointment.id}`}
                  textColor="text-background"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No upcoming appointments
          </p>
        )}
      </div>

      {/* Visit History */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold">Visit History</h2>

        {visitLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : visitHistory.length > 0 ? (
          visitHistory.map((visit: any, index: number) => (
            <div
              key={visit.id}
              className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 rounded-md border border-input p-4 shadow-sm transition hover:bg-muted/40">
              <div className="flex items-start sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-secondary">
                  <StethoscopeIcon className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-medium">
                    Visit #{visitHistory.length - index}
                  </Label>

                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(visit.visitDate)} · {visit.visitPurpose}
                  </p>
                </div>
              </div>

              <AppButton
                label="View Details"
                className="flex items-center gap-2 bg-secondary text-sm font-medium hover:bg-secondary hover:underline"
                icon={<ArrowRight className="h-4 w-4" />}
                href={`/shared/medical-records/${visit?.id}`}
                textColor="text-background"
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No visit history found
          </p>
        )}
      </div>

      {/* Care Request History */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold">Care Request History</h2>

        {careLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : careRequests.length > 0 ? (
          careRequests.map((request: any, index: number) => (
            <div
              key={request.id}
              className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 rounded-md border border-input p-4 shadow-sm transition hover:bg-muted/40">
              <div className="flex items-start sm:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-secondary">
                  <StethoscopeIcon className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-medium">
                    Visit #{careRequests?.length - index}
                    <span className="flex flex-wrap gap-1 mt-1">
                      {request.services?.map((service: string, i: number) => (
                        <span
                          key={i}
                          className="bg-rose-100 text-rose-600 text-[10px] px-2 py-1 rounded-lg">
                          {service.replaceAll('_', ' ')}
                        </span>
                      ))}
                    </span>
                  </Label>

                  <div className="flex items-center gap-3">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(request.scheduledDate)}
                    </p>
                    <Badge
                      variant="outline"
                      className={cn('capitalize text-[12px] px-2 py-0', getStatusStyles(request.status))}>
                      {request.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <AppButton
                label="View Details"
                className="flex items-center gap-2 bg-secondary text-sm font-medium hover:bg-secondary hover:underline"
                icon={<ArrowRight className="h-4 w-4" />}
                href={`/shared/care-history/${request.id}`}
                textColor="text-background"
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No care request history
          </p>
        )}
      </div>
    </div>
  );
};
