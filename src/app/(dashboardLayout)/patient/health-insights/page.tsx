/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {Card} from '@/components/ui/card';
import {AlertTriangle, CircleCheck} from 'lucide-react';
import {useGetSinglePatientAiInsightQuery} from '@/redux/api/patient.api';
import {useAppSelector} from '@/redux/hooks';
import {getVitalColor} from '@/lib/getVitalColor';
import {cn} from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import {useStreamingText} from '@/hooks/useStreamingText';
import {
  getHealthScoreBgColor,
  getHealthScoreColor,
  getHealthScorePriority,
} from '@/lib/getHealthScoreColor';
import {processMedicalContent} from '@/lib/highlightMedicalText';
import {formatBloodGlucoseToMmol} from '@/lib/vitalUtils';

// ── Blinking cursor shown while streaming ──────────────────────────────────
const BlinkingCursor = () => (
  <span className="inline-block w-0.5 h-[1em] bg-blue-500 align-middle ml-0.5 animate-[blink_0.7s_step-end_infinite]" />
);

const HealthInsights = () => {
  const patientId = useAppSelector((state) => state.patient.selectedPatientId);

  const {data, isLoading, isError} = useGetSinglePatientAiInsightQuery(
    patientId,
    {skip: !patientId},
  );

  // Raw full insight string
  const rawInsight: string = (() => {
    const ins = data?.data?.insights;
    if (!ins) return '';
    if (typeof ins === 'string') return ins;
    return (ins as any).description || (ins as any).recommendation || '';
  })();

  // Stream the text character-by-character
  const {displayedText, isStreaming} = useStreamingText(rawInsight, 14);

  if (!patientId)
    return <p>Patient account not found, please create a patient first!</p>;
  if (isLoading) return <p>Loading health insights...</p>;
  if (isError) return <p>Failed to load health insights.</p>;
  if (!data?.data) return <p>No health insights available.</p>;

  const {
    overallScore,
    bloodPressure,
    bloodGlucose,
    weight,
    insights,
    lastUpdated,
  } = data.data;

  return (
    <div className="space-y-8 px-4 sm:px-6 md:px-8">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          Health Insights &amp; Trends
        </h1>
        <p>Track health improvements over time</p>
      </div>

      {/* ── Health Summary (Restored to User's Original Design) ────────── */}
      <Card className="bg-background rounded-xl p-6 space-y-4">
        <h3 className="text-foreground font-semibold text-xl sm:text-2xl">
          Health Summary
        </h3>
        <div className="text-center text-foreground space-y-1">
          <p className="text-lg sm:text-xl">Overall Health Score</p>
          <p
            className={`text-3xl sm:text-4xl font-bold ${getHealthScoreColor(overallScore)}`}>
            {overallScore ?? '0'}
          </p>
          <p className="text-xs sm:text-sm">
            Last updated: {new Date(lastUpdated).toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-background rounded-xl p-3 text-center text-sm sm:text-base font-medium">
            <p className="text-foreground text-sm sm:text-base">
              Blood Pressure
            </p>
            <p
              className={cn(
                'text-xl sm:text-2xl',
                getVitalColor('bp', bloodPressure),
              )}>
              {bloodPressure ?? '0'}
            </p>
          </Card>
          <Card className="bg-background rounded-xl p-3 text-center text-sm sm:text-base font-medium">
            <p className="text-foreground text-sm sm:text-base">
              Blood Glucose
            </p>
            <p
              className={cn(
                'text-xl sm:text-2xl',
                getVitalColor('glucose', bloodGlucose),
              )}>
              {formatBloodGlucoseToMmol(bloodGlucose)}
            </p>
          </Card>
          <Card className="bg-background rounded-xl p-3 text-center text-sm sm:text-base font-medium">
            <p className="text-foreground text-sm sm:text-base">Weight</p>
            <p
              className={cn(
                'text-xl sm:text-2xl',
                getVitalColor('weight', weight),
              )}>
              {weight ?? '0'}
            </p>
          </Card>
        </div>
      </Card>

      {/* ── AI Insights Section (Latest Organized Design with Checkmarks) ── */}
      <div className="space-y-4">
        {insights ? (
          <Card className="rounded-[24px] border border-zinc-100 bg-white p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            {/* Top Section */}
            <div className="flex items-start justify-between gap-6 mb-8">
              <div className="flex items-start gap-4 md:gap-5">
                {/* Icon Container - Soft Red Background */}
                <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-[22px] bg-[#FEF2F2] text-[#EF4444]">
                  <AlertTriangle className="h-9 w-9" strokeWidth={1.2} />
                </div>

                {/* Title and Summary Description */}
                <div className="space-y-1.5 pt-1">
                  <h3 className="text-[22px] md:text-[24px] font-bold text-[#1E293B] tracking-tight leading-tight">
                    {typeof insights === 'object' && (insights as any).title
                      ? (insights as any).title
                      : 'Overall Health Summary'}
                  </h3>

                  {/* The Main Description Text with Markdown Support */}
                  <div className="text-slate-600 text-base md:text-[17px] leading-relaxed max-w-2xl font-normal">
                    <ReactMarkdown
                      components={{
                        ul: ({children}) => (
                          <ul className="mt-6 mb-8 space-y-6">{children}</ul>
                        ),
                        li: ({children}) => (
                          <li className="flex items-start gap-6 text-[#475569]">
                            <CircleCheck className="h-5.5 w-5.5 text-[#10B981] shrink-0 mt-0.5 stroke-[1.5]" />
                            <span className="leading-snug">
                              {processMedicalContent(children)}
                            </span>
                          </li>
                        ),
                        p: ({children}) => (
                          <p className="mb-4 last:mb-0 leading-relaxed text-slate-600">
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
                      {displayedText ||
                        'Analysis of your latest vitals shows some trends that require attention.'}
                    </ReactMarkdown>
                    {isStreaming && <BlinkingCursor />}
                  </div>
                </div>
              </div>

              {/* Priority Badge */}
              <div
                className={cn(
                  'shrink-0 rounded-[14px] px-6 py-2 text-sm font-bold tracking-tight text-white shadow-sm h-fit uppercase',
                  getHealthScoreBgColor(overallScore),
                )}>
                {getHealthScorePriority(overallScore)}
              </div>
            </div>

            {/* Recommended Actions List */}
            {Array.isArray(data.data.extractedData?.doctorRecommendations) &&
              data.data.extractedData.doctorRecommendations.length > 0 && (
                <div className="space-y-8 md:pl-23 pt-4">
                  <p className="text-[17px] font-bold text-[#1E293B]">
                    Recommended Actions:
                  </p>

                  <ul className="space-y-8">
                    {data.data.extractedData.doctorRecommendations.map(
                      (rec: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-6 text-[#475569] group">
                          <CircleCheck className="h-5.5 w-5.5 text-[#10B981] shrink-0 mt-0.5 stroke-[1.5]" />
                          <span className="text-base md:text-[17px] font-normal leading-snug group-hover:text-zinc-900 transition-colors">
                            {rec}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default HealthInsights;
