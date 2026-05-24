/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {  useGetActiveMedicationQuery,
  useGetPreviousMedicationQuery,
} from '@/redux/api/medication.api';
import { useAppSelector } from '@/redux/hooks';
import MedicationItem, { MedicationItemProps } from '@/shared/MedicationItem';

/* Simple Skeleton Loader */

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

interface VisitSectionProps {
  visitTitle: string;
  medications: MedicationItemProps[];
  defaultOpen?: boolean;
}

const VisitSection = ({
  visitTitle,
  medications,
  defaultOpen = false,
}: VisitSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden border-border/60 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors focus:outline-none">
        <CardTitle className="text-lg font-semibold">{visitTitle}</CardTitle>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <ChevronDown className="h-8 w-8 text-muted-foreground hover:text-secondary cursor-pointer" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 26,
            }}
            className="overflow-hidden">
            <CardContent className="border-t">
              {medications.map((med, i) => (
                <MedicationItem key={i} {...med} />
              ))}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export const MedicationsCard = () => {
  const patientId = useAppSelector((state) => state.patient.selectedPatientId);

  // const { data: activeData, isLoading } = useGetActiveMedicationQuery(patientId, {
  //   skip: !patientId,
  // });
  const { data: activeData, isLoading } = useGetActiveMedicationQuery(patientId, {
    skip: !patientId,
  });

  const { data: previousData, isLoading: previousLoading } =
    useGetPreviousMedicationQuery(patientId, {
      skip: !patientId,
    });

  const currentMedications: MedicationItemProps[] =
    activeData?.data?.map((med: any) => ({
      label: `${med?.medicationName} ${med?.dosage}`,
      sublabel: 'Tab',
      description: med?.prescribedBy ? `Prescribed by ${med?.prescribedBy}` : 'No prescribed by',
      timing: med?.frequency,
      duration: med?.duration,
      timeOfDay: med?.timing,
    })) || [];

  return (
    <div className="space-y-6">
      {/* Current Medication */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">
            Current Medication
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLoading ? (
            <>
              <MedicationSkeleton />
              <MedicationSkeleton />
              <MedicationSkeleton />
            </>
          ) : currentMedications.length ? (
            currentMedications.map((med, i) => (
              <MedicationItem key={i} {...med} />
            ))
          ) : (
            <p>No medications found.</p>
          )}
        </CardContent>
      </Card>

      {previousData?.data?.length > 0 && (
        <CardTitle className="text-xl font-semibold pt-20">
          Previous Medication
        </CardTitle>
      )}

      {/* Previous Medication */}
      {previousLoading ? (
        <div className="space-y-4">
          <MedicationSkeleton />
          <MedicationSkeleton />
          <MedicationSkeleton />
        </div>
      ) : (
        previousData?.data?.length > 0 && (
          <div className="space-y-4">
            {previousData.data
              .filter((visit: any) => visit.medications?.length > 0)
              .map((visit: any) => {
                const meds: MedicationItemProps[] = visit.medications.map(
                  (med: any) => ({
                    label: `${med.medicationName} ${med.dosage}`,
                    sublabel: 'Tab',
                    description: med?.prescribedBy ? `Prescribed by ${med?.prescribedBy}` : 'No prescribed by',
                    timing: med.frequency || '-',
                    duration: med.duration || '-',
                    timeOfDay: med.timing || [],
                  }),
                );

                const visitDate = new Date(visit.date).toLocaleDateString(
                  'en-US',
                  {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  },
                );

                return (
                  <VisitSection
                    key={visit.id}
                    visitTitle={`${visit.title} • ${visitDate}`}
                    medications={meds}
                  />
                );
              })}
          </div>
        )
      )}
    </div>
  );
};
