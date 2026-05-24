/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useMemo } from 'react';
import { HealthTrendChart } from './components/chart/HealthTrendChart';

export function HealthTrendsTabs({ healthTrends }: { healthTrends?: any[] }) {
  // Move all hooks to the top to follow React Rules of Hooks
  const bloodPressureData = useMemo(() => {
    if (!healthTrends) return [];
    return healthTrends.map((trend) => {
      const dataPoints = trend.data || [];
      
      const systolicEntries = dataPoints.filter((d: any) => d.systolic !== undefined && d.systolic !== null);
      const diastolicEntries = dataPoints.filter((d: any) => d.diastolic !== undefined && d.diastolic !== null);

      let avgSystolic: number | null = null;
      let avgDiastolic: number | null = null;

      if (systolicEntries.length > 0) {
        avgSystolic = Math.max(0, Math.round(
          systolicEntries.reduce((sum: number, d: any) => sum + d.systolic, 0) /
          systolicEntries.length
        ));
      }
      
      if (diastolicEntries.length > 0) {
        const nonZeroDiastolic = diastolicEntries.filter((d: any) => d.diastolic > 0);
        if (nonZeroDiastolic.length > 0) {
          avgDiastolic = Math.max(0, Math.round(
            nonZeroDiastolic.reduce((sum: number, d: any) => sum + d.diastolic, 0) /
            nonZeroDiastolic.length
          ));
        } else {
          avgDiastolic = 0;
        }
      }

      return {
        week: trend.label,
        systolic: avgSystolic,
        diastolic: avgDiastolic,
      };
    });
  }, [healthTrends]);

  const bloodSugarData = useMemo(() => {
    if (!healthTrends) return [];
    return healthTrends.map((trend) => {
      const dataPoints = trend.data || [];
      const validEntries = dataPoints.filter((d: any) => d.bloodSugar > 0);
      let avgSugar: number | null = null;
      if (validEntries.length > 0) {
        const mgAvg =
          validEntries.reduce((sum: number, d: any) => sum + d.bloodSugar, 0) /
          validEntries.length;
        // Convert to mmol/L and keep 1 decimal place
        avgSugar = Number((mgAvg / 18.0182).toFixed(1));
      }

      return {
        week: trend.label,
        bloodSugar: avgSugar,
      };
    });
  }, [healthTrends]);

  const weightData = useMemo(() => {
    if (!healthTrends) return [];
    return healthTrends.map((trend) => {
      const dataPoints = trend.data || [];
      const validEntries = dataPoints.filter((d: any) => d.weight > 0);
      let avgWeight: number | null = null;
      if (validEntries.length > 0) {
        avgWeight = Math.max(0, Math.round(
          validEntries.reduce((sum: number, d: any) => sum + d.weight, 0) /
          validEntries.length
        ));
      }

      return {
        week: trend.label,
        weight: avgWeight,
      };
    });
  }, [healthTrends]);

  // Early return for UI after hooks
  if (!healthTrends || healthTrends.length === 0) {
    return (
      <div className="w-full relative p-8 border rounded-lg text-center text-muted-foreground">
        No health trends available yet.
      </div>
    );
  }

  return (
    <>
      <div className="w-full relative ">
        <Tabs defaultValue="blood-pressure" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto text-background  grid-cols-3 bg-secondary rounded-full">
            <TabsTrigger
              value="blood-pressure"
              className="rounded-full hover:text-background  data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Blood Pressure
            </TabsTrigger>
            <TabsTrigger
              value="blood-sugar"
              className="rounded-full hover:text-background  data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Blood Sugar
            </TabsTrigger>
            <TabsTrigger
              value="weight"
              className="rounded-full hover:text-background  data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Weight
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blood-pressure" className="h-105">
            <HealthTrendChart
              title="Blood Pressure"
              data={bloodPressureData}
              lines={[
                { key: 'systolic', color: '#3b82f6', name: 'Systolic' },
                { key: 'diastolic', color: '#f59e0b', name: 'Diastolic' },
              ]}
            />
          </TabsContent>

          <TabsContent value="blood-sugar" className="h-105">
            <HealthTrendChart
              title="Blood Sugar"
              data={bloodSugarData}
              lines={[
                { key: 'bloodSugar', color: '#8b5cf6', name: 'Blood Sugar' },
              ]}
            />
          </TabsContent>

          <TabsContent value="weight" className="h-105">
            <HealthTrendChart
              title="Weight"
              data={weightData}
              lines={[{ key: 'weight', color: '#10b981', name: 'Weight (kg)' }]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
