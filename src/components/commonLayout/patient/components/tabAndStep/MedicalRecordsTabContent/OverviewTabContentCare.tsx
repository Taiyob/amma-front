/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {getVitalColor} from '@/lib/getVitalColor';
import {cn} from '@/lib/utils';
import {parseBloodGlucose} from '@/lib/vitalUtils';

const Skeleton = ({className}: {className?: string}) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

const formatDate = (date: string) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString();
};

import {Save} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import {useUpdateCareRequestNoteMutation} from '@/redux/api/care.api';
import {toast} from 'sonner';
import {Textarea} from '@/components/ui/textarea';

export const OverviewTabContentCare = ({
  visit,
  loading,
  isReadOnly = true,
}: any) => {
  const [note, setNote] = useState('');
  const [updateNote, {isLoading: isUpdatingNote}] =
    useUpdateCareRequestNoteMutation();

  useEffect(() => {
    const currentNote = visit?.note || visit?.notes || '';
    setNote(currentNote);
  }, [visit]);

  const handleUpdateNote = async () => {
    if (!visit?.id) return;
    const toastId = toast.loading('Updating note...');
    try {
      await updateNote({
        id: visit.id,
        data: {note: note},
      }).unwrap();
      toast.success('Note updated successfully', {id: toastId});
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update note', {
        id: toastId,
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3 space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const service = visit?.bookingItems?.[0]?.service;

  // const handleDelete = async () => {
  //   const toastId = toast.loading('Deleting care request...');
  //   try {
  //     await deleteCareRequest(visit.id).unwrap();
  //     toast.success('Care request deleted successfully', {id: toastId});
  //     router.back();
  //   } catch (error: any) {
  //     toast.error(error?.data?.message || 'Delete failed', {id: toastId});
  //   }
  // };

  return (
    <div className="space-y-6">
      {/* Note Section */}
      <Card>
        <CardHeader className="pb-3 border-b mb-4">
          <CardTitle>Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isReadOnly ? (
            <p className="text-base text-muted-foreground italic">
              {note || 'No note provided'}
            </p>
          ) : (
            <>
              <Textarea
                placeholder="No note provided"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-25 text-base"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleUpdateNote}
                  disabled={isUpdatingNote}
                  className="bg-secondary hover:bg-secondary/90 text-white">
                  <Save className="mr-2 h-4 w-4" />
                  {isUpdatingNote ? 'Updating...' : 'Update Note'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Symptoms */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Symptoms / Complaint</CardTitle>
          <CardDescription className="text-base leading-relaxed pt-1">
            {visit?.symptomsDescription || 'No symptoms provided'}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Visit Information */}
      <Card>
        <CardHeader>
          <CardTitle>Visit Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-muted-foreground">Scheduled Date</p>
            <p className="font-semibold">{formatDate(visit?.scheduledDate)}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Preferred Time</p>
            <p className="font-semibold">{visit?.preferredTime || '-'}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="font-semibold capitalize">{visit?.status}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Priority</p>
            <p className="font-semibold">{visit?.priority}</p>
          </div>
        </CardContent>
      </Card>

      {/* Service */}
      <Card>
        <CardHeader>
          <CardTitle>Service</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm font-semibold">{service?.name || 'N/A'}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {service?.description || ''}
          </p>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle>Service Address</CardTitle>
        </CardHeader>

        <CardContent className="text-sm">
          {visit?.address?.street}, {visit?.address?.area},{' '}
          {visit?.address?.city}
        </CardContent>
      </Card>

      {/* Vital Signs */}
      <Card className="bg-[#F0F0F0]">
        <CardHeader className="pb-3">
          <CardTitle>Vital Signs</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center bg-white rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Blood Pressure</p>
            <p
              className={cn(
                'text-2xl font-bold',
                getVitalColor('bp', visit?.bloodPressure),
              )}>
              {visit?.bloodPressure || '-'}
            </p>
            <p className="text-xs text-muted-foreground">mmHg</p>
          </div>

          <div className="text-center bg-white rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Blood Glucose</p>
            <p
              className={cn(
                'text-2xl font-bold',
                getVitalColor('glucose', visit?.bloodGlucose),
              )}>
              {(() => {
                const {numValue, isMmol} = parseBloodGlucose(visit?.bloodGlucose);
                const mmolValue = isMmol ? numValue : numValue / 18.0182;
                return numValue === 0 ? '-' : mmolValue.toFixed(1);
              })()}
            </p>
            <p className="text-xs text-muted-foreground">mmol/L</p>
          </div>

          <div className="text-center bg-white rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Weight</p>
            <p
              className={cn(
                'text-2xl font-bold',
                getVitalColor('weight', visit?.weight),
              )}>
              {visit?.weight || '-'}
            </p>
            <p className="text-xs text-muted-foreground">KG</p>
          </div>
        </CardContent>
      </Card>

      {/* Special Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Special Instructions</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-relaxed">
            {visit?.specialInstructions || 'No instructions provided'}
          </p>
        </CardContent>
      </Card>

      {/* Treatment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Treatment Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-sm prose-custom">
            <ReactMarkdown
              components={{
                h1: ({...props}) => (
                  <h1
                    className="text-xl font-bold mt-4 mb-2 text-foreground"
                    {...props}
                  />
                ),
                h2: ({...props}) => (
                  <h2
                    className="text-lg font-bold mt-3 mb-1 text-foreground"
                    {...props}
                  />
                ),
                h3: ({...props}) => (
                  <h3
                    className="text-md font-bold mt-2 mb-1 text-foreground"
                    {...props}
                  />
                ),
                ul: ({...props}) => (
                  <ul className="list-disc pl-5 space-y-1 my-2" {...props} />
                ),
                ol: ({...props}) => (
                  <ol className="list-decimal pl-5 space-y-1 my-2" {...props} />
                ),
                li: ({...props}) => (
                  <li className="text-muted-foreground ml-1" {...props} />
                ),
                p: ({...props}) => (
                  <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
                ),
                strong: ({...props}) => (
                  <strong className="font-bold text-foreground" {...props} />
                ),
                em: ({...props}) => (
                  <em className="italic text-muted-foreground" {...props} />
                ),
              }}>
              {visit?.summary || 'No treatment summary provided'}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};
