/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {AlertTriangle, CircleCheck, Activity, Pill} from 'lucide-react';
import {cn} from '@/lib/utils';
import {ScrollArea} from '@/components/ui/scroll-area';
import {useAppSelector} from '@/redux/hooks';
import { useGetActiveMedicationQuery} from '@/redux/api/medication.api';
import Link from 'next/link';
import {useGetSinglePatientAiInsightQuery} from '@/redux/api/patient.api';
import ReactMarkdown from 'react-markdown';
import {useStreamingText} from '@/hooks/useStreamingText';
import {
  getHealthScoreBgColor,
  getHealthScoreColor,
  getHealthScorePriority,
} from '@/lib/getHealthScoreColor';
import {processMedicalContent} from '@/lib/highlightMedicalText';

import {getVitalColor} from '@/lib/getVitalColor';
import MedicationItem from '@/shared/MedicationItem';
import {formatBloodGlucoseToMmol, parseBloodGlucose} from '@/lib/vitalUtils';

// ── Blinking cursor ───────────────────────────────────────────────────────
const BlinkingCursor = () => (
  <span className="inline-block w-0.5 h-[1em] bg-blue-500 align-middle ml-0.5 animate-[blink_0.7s_step-end_infinite]" />
);

// Safely extracts a renderable string from a value
const safeString = (val: any): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    return (
      val.description || val.recommendation || val.title || val.status || ''
    );
  }
  return String(val);
};

export default function MedicationHealthOverview() {
  const patientId = useAppSelector((state) => state.patient.selectedPatientId);

  // const {data: medications, isLoading} = useGetActiveMedicationNoIdQuery({});
    const { data: medications, isLoading } = useGetActiveMedicationQuery(patientId, {
      skip: !patientId,
    });

  const {
    data,
    isLoading: isLoadingHealth,
    isError,
  } = useGetSinglePatientAiInsightQuery(patientId, {
    skip: !patientId,
  });

  const healthInsight = data?.data;
  const rawInsight = safeString(healthInsight?.insights);
  const {displayedText, isStreaming} = useStreamingText(rawInsight, 14);

  if (!patientId)
    return (
      <p className="p-8 text-center text-muted-foreground border rounded-xl m-4 bg-zinc-50">
        Patient account not found, please create a patient first!
      </p>
    );

  if (isLoadingHealth)
    return (
      <div className="p-12 text-center animate-pulse bg-zinc-50 rounded-2xl border border-zinc-100">
        <Activity className="h-8 w-8 text-zinc-300 mx-auto mb-4 animate-spin" />
        <p className="text-zinc-500 font-medium">
          Generating health insights...
        </p>
      </div>
    );

  if (isError)
    return (
      <p className="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
        Failed to load health insights.
      </p>
    );

  const currentScore = healthInsight?.overallScore ?? 0;
  const scoreStatus = getHealthScorePriority(currentScore);
  const scoreColor = getHealthScoreColor(currentScore);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ── Top Section: Medications & Health Summary Side-by-Side ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Active Medications (Left Column - 3 parts) */}
        <Card className="lg:col-span-3 h-full flex flex-col border-border/60 shadow-sm rounded-[24px] overflow-hidden bg-white">
          <CardHeader className="pb-4 border-b bg-zinc-50/50 px-6 sm:px-8 pt-6 flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                <Pill className="h-5 w-5" />
              </span>
              Active Medications
            </CardTitle>
            <Link href={'/patient/medications'}>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex rounded-lg font-semibold border-zinc-200">
                View All
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="p-0 flex flex-1 flex-col">
            <ScrollArea className="h-95 px-6 sm:px-8 py-6">
              <div className="space-y-4 pb-6">
                {!isLoading && medications?.data?.length > 0 ? (
                  medications?.data?.map((med: any) => (
                    <MedicationItem
                      key={med?.id}
                      label={med?.medicationName}
                      sublabel={med?.dosage}
                      description={
                        med?.prescribedBy
                          ? `Prescribed by ${med.prescribedBy}`
                          : 'No prescribed by'
                      }
                      timing={med?.frequency}
                      duration={med?.duration}
                      timeOfDay={med?.timing}
                    />
                  ))
                ) : (
                  <div className="text-center py-16 flex flex-col items-center justify-center">
                    <div className="bg-zinc-100 p-4 rounded-full mb-4">
                      <Pill className="h-8 w-8 text-zinc-400" />
                    </div>
                    <p className="text-zinc-500 font-medium">
                      No active medications found.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t px-6 sm:px-8 py-5 bg-zinc-50/50 sm:hidden">
              <Link href={'/patient/medications'}>
                <Button
                  variant="outline"
                  className="w-full rounded-xl font-semibold border-zinc-200">
                  See All Medications
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Health Summary (Right Column - 2 parts) */}
        <Card className="lg:col-span-2 h-full bg-white rounded-[24px] border-border/60 shadow-sm flex flex-col overflow-hidden">
          <CardHeader className="pb-4 border-b bg-zinc-50/50 px-6 sm:px-8 pt-6">
            <h3 className="text-zinc-900 font-bold text-xl">Health Summary</h3>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-8">
            {/* Score Display */}
            <div className="flex items-center justify-between bg-zinc-50 p-6 rounded-4xl border border-zinc-100">
              <div className="space-y-1">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  Health Score
                </p>
                <div
                  className={cn(
                    'text-5xl font-black tracking-tighter',
                    scoreColor,
                  )}>
                  {healthInsight?.overallScore ?? '0'}
                </div>
              </div>
              <div
                className={cn(
                  'inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-sm',
                  getHealthScoreBgColor(currentScore),
                )}>
                {scoreStatus}
              </div>
            </div>

            {/* Vital Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-50/50 rounded-2xl p-5 text-center border border-zinc-100 transition-all hover:bg-white hover:shadow-sm">
                <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1 tracking-tight">
                  Blood Pressure
                </p>
                <p
                  className={cn(
                    'text-xl font-bold',
                    getVitalColor('bp', healthInsight?.bloodPressure),
                  )}>
                  {healthInsight?.bloodPressure ?? '0'}
                </p>
                {/* <p className="text-[9px] font-bold text-emerald-500 uppercase mt-1">Normal Level</p> */}
              </div>
              <div className="bg-zinc-50/50 rounded-2xl p-5 text-center border border-zinc-100 transition-all hover:bg-white hover:shadow-sm">
                <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1 tracking-tight">
                  Blood Glucose
                </p>
                {(() => {
                  const {numValue, isMmol} = parseBloodGlucose(healthInsight?.bloodGlucose);
                  const mmolValue = isMmol ? numValue : numValue / 18.0182;
                  const displayValue = numValue === 0 ? '0.0' : mmolValue.toFixed(1);

                  let bgClass = 'bg-zinc-100';
                  let textClass = 'text-zinc-900';

                  if (mmolValue >= 1.1 && mmolValue <= 3.9) { bgClass = 'bg-[#E74C3C]'; textClass = 'text-white'; }
                  else if (mmolValue >= 4.0 && mmolValue <= 7.0) { bgClass = 'bg-[#3498DB]'; textClass = 'text-white'; }
                  else if (mmolValue >= 7.1 && mmolValue <= 13.8) { bgClass = 'bg-[#1ABC9C]'; textClass = 'text-white'; }
                  else if (mmolValue >= 13.9 && mmolValue <= 21.6) { bgClass = 'bg-[#5D6D7E]'; textClass = 'text-white'; }
                  else if (mmolValue >= 22.2) { bgClass = 'bg-[#F1C40F]'; textClass = 'text-slate-900'; }

                  return (
                    <div className={cn("mt-2 px-3 py-1 rounded-full inline-block font-black text-sm", bgClass, textClass)}>
                      {displayValue} <span className="text-[10px] opacity-80 font-bold uppercase">mmol/L</span>
                    </div>
                  );
                })()}
              </div>
              <div className="bg-zinc-50/50 rounded-2xl p-5 text-center border border-zinc-100 transition-all hover:bg-white hover:shadow-sm">
                <p className="text-zinc-500 text-[10px] font-bold uppercase mb-1 tracking-tight">
                  Weight
                </p>
                <p
                  className={cn(
                    'text-xl font-bold',
                    getVitalColor('weight', healthInsight?.weight),
                  )}>
                  {healthInsight?.weight ?? '0'}
                </p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase mt-1">
                  Consistent
                </p>
              </div>
              <div className="bg-zinc-50/50 rounded-2xl p-5 text-center border border-zinc-100 transition-all hover:bg-white hover:shadow-sm flex items-center justify-center flex-col">
                <p className="text-zinc-400 text-[10px] font-bold uppercase">
                  Last Sync
                </p>
                <p className="text-xs font-bold text-zinc-600 mt-1">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── AI Medical Analysis (Full Width below) ── */}
      <div className="space-y-8">
        {/* AI Insight Card */}
        {healthInsight?.insights && (
          <Card className="rounded-[32px] border border-zinc-100 bg-white p-6 md:p-12 shadow-[0_12px_40px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all hover:shadow-lg">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
              <div className="flex items-start gap-6">
                {/* Icon Container - Matching Page Design */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] bg-[#FEF2F2] text-[#EF4444] shadow-sm">
                  <AlertTriangle className="h-8 w-8" strokeWidth={1.5} />
                </div>

                {/* Title and Summary Description */}
                <div className="space-y-2 pt-1">
                  <h3 className="text-[24px] md:text-[28px] font-black text-[#1E293B] tracking-tight leading-tight">
                    {typeof healthInsight.insights === 'object' &&
                    healthInsight.insights !== null
                      ? (healthInsight.insights as any).title ||
                        'Overall Health Summary'
                      : 'Overall Health Summary'}
                  </h3>

                  {/* The Main Description Text */}
                  <div className="text-slate-600 text-[16px] md:text-[17px] leading-relaxed max-w-3xl font-normal">
                    <ReactMarkdown
                      components={{
                        ul: ({children}) => (
                          <ul className="mt-8 mb-12 space-y-6">{children}</ul>
                        ),
                        li: ({children}) => (
                          <li className="flex items-start gap-6 text-[#475569]">
                            <CircleCheck className="h-6 w-6 text-[#10B981] shrink-0 mt-0.5 stroke-[1.5]" />
                            <span className="leading-snug">
                              {processMedicalContent(children)}
                            </span>
                          </li>
                        ),
                        p: ({children}) => (
                          <p className="mb-6 last:mb-0 leading-relaxed text-slate-600">
                            {processMedicalContent(children)}
                          </p>
                        ),
                        strong: ({children}) => (
                          <strong className="font-semibold text-slate-700">
                            {processMedicalContent(children)}
                          </strong>
                        ),
                        h1: ({children}) => (
                          <h1 className="text-xl font-bold text-slate-800 mb-4">
                            {children}
                          </h1>
                        ),
                        h2: ({children}) => (
                          <h2 className="text-lg font-bold text-slate-800 mb-3">
                            {children}
                          </h2>
                        ),
                        h3: ({children}) => (
                          <h3 className="text-base font-bold text-slate-800 mb-2">
                            {children}
                          </h3>
                        ),
                      }}>
                      {displayedText || 'Generating medical analysis...'}
                    </ReactMarkdown>
                    {isStreaming && <BlinkingCursor />}
                  </div>
                </div>
              </div>

              {/* Priority Badge */}
              <div
                className={cn(
                  'shrink-0 rounded-3xl px-8 py-2.5 text-xs font-black tracking-widest text-white shadow-md h-fit uppercase',
                  getHealthScoreBgColor(currentScore),
                )}>
                {scoreStatus}
              </div>
            </div>

            {/* Recommended Actions List */}
            {Array.isArray(
              healthInsight?.extractedData?.doctorRecommendations,
            ) &&
              healthInsight.extractedData.doctorRecommendations.length > 0 && (
                <div className="space-y-10 md:pl-22 pt-8 border-t border-zinc-100/80">
                  <p className="text-lg font-black text-[#1E293B] tracking-tight">
                    Recommended Physician Actions:
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {healthInsight.extractedData.doctorRecommendations.map(
                      (rec: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-6 text-[#475569] group p-5 rounded-2xl bg-zinc-50/50 border border-transparent hover:border-zinc-200 hover:bg-white transition-all duration-300">
                          <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                            <CircleCheck className="h-4 w-4 text-[#10B981] stroke-2" />
                          </div>
                          <span className="text-[15px] font-medium leading-relaxed group-hover:text-zinc-900 transition-colors">
                            {safeString(rec)}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
          </Card>
        )}
      </div>
    </div>
  );
}
