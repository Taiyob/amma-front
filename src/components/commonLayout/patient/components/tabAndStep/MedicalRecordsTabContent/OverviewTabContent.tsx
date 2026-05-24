/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import EditVisitDialog from './EditVisitDialog';
import { getVitalColor } from '@/lib/getVitalColor';
import { cn } from '@/lib/utils';
import {parseBloodGlucose} from '@/lib/vitalUtils';

import ReactMarkdown from 'react-markdown';
// import { useAppSelector } from '@/redux/hooks';
// import { UserRole } from '@/types';

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

export const OverviewTabContent = ({
  visit,
  loading,
  isReadOnly = false,
}: any) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  // const user = useAppSelector((state) => state.auth.user);


  // isReadOnly = user?.role !== 'PATIENT' as UserRole;

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Chief Complaint Skeleton */}
        <Card>
          <CardHeader className="pb-3 space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
        </Card>

        {/* Vital Signs Skeleton */}
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

        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chief Complaint */}
      <Card>
        <CardHeader className="pb-3 flex  justify-between items-center">
        <div>
          <CardTitle>Chief Complaint</CardTitle>
          <CardDescription className="text-base leading-relaxed pt-1">
            {visit?.visitPurpose || visit?.symptomsDescription || 'N/A'}
          </CardDescription>
        </div>

         {!isReadOnly && (
        <Button
          size={'lg'}
          onClick={() => setOpenEditModal(true)}
          className="bg-secondary hover:bg-secondary/80 text-white cursor-pointer py-2">
          <Edit /> Edit Visit
        </Button>
      )}
        </CardHeader>
      </Card>

      {/* Vital Signs */}
      <Card className="bg-[#F0F0F0]">
        <CardHeader className="pb-3 ">
          <CardTitle>Vital Signs</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 md:grid-cols-3 justify-between gap-6 ">
          <div className="space-y-1 text-center bg-white rounded-lg p-2 py-4">
            <p className="text-sm text-muted-foreground">Blood Pressure</p>
            <p
              className={cn(
                'text-2xl font-bold',
                getVitalColor('bp', visit?.bloodPressure || (visit?.systolic && visit?.diastolic ? `${visit.systolic}/${visit.diastolic}` : undefined)),
              )}>
              {visit?.bloodPressure || (visit?.systolic && visit?.diastolic ? `${visit.systolic}/${visit.diastolic}` : '-')}
            </p>
            <p className="text-xs text-muted-foreground">mmHg</p>
          </div>

          <div className="space-y-1 text-center bg-white rounded-lg p-2 py-4">
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

          <div className="space-y-1 text-center bg-white rounded-lg p-2 py-4">
            <p className="text-sm text-muted-foreground">Weight</p>
            <p
              className={cn(
                'text-2xl font-bold',
                getVitalColor('weight', visit?.weight),
              )}>
              {visit?.weight || '-'}
            </p>
            <p className="text-xs text-muted-foreground">kg</p>
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle>Diagnosis</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-relaxed">
            {visit?.diagnosis || 'No diagnosis provided'}
          </p>
        </CardContent>
      </Card>

      {/* Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Health Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-sm leading-relaxed text-gray-800 bg-neutral-50/50 p-4 rounded-xl border border-gray-100">
            {visit?.summary ? (
              <ReactMarkdown
                components={{
                  ul: ({ children }) => (
                    <ul className="list-disc ml-6 space-y-2 my-3">{children}</ul>
                  ),
                  li: ({ children }) => <li className="pl-1">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-bold text-neutral-900">
                      {children}
                    </strong>
                  ),
                  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                  h1: ({ children }) => <h1 className="text-lg font-bold mb-4 mt-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-bold mb-3 mt-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-bold mb-2 mt-1">{children}</h3>,
                }}>
                {visit.summary}
              </ReactMarkdown>
            ) : (
              'No treatment plan provided'
            )}
          </div>
        </CardContent>
      </Card>

      <EditVisitDialog
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        visit={visit}
      />
    </div>
  );
};
