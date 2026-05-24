'use client';

import AppButton from '@/components/ui/AppButton';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useRequestCare} from '@/context/RequestCareContext';

export const Step4 = () => {
  const {timeSlot, setTimeSlot, careDate, setCareDate} = useRequestCare();

  // Optional: handle button-based time slot selection
  const handleTimeSlotButton = (slot: string) => {
    setTimeSlot(slot);
  };

  return (
    <Card className="max-w-lg mx-auto border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle>Preferred Time & Date</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Picker */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Select Date</label>
          <input
            type="date"
            value={careDate}
            onChange={(e) => setCareDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          {careDate && (
            <p className="text-sm text-gray-600">Selected Date: {careDate}</p>
          )}
        </div>

        {/* Time Slot Buttons */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {['Morning', 'Afternoon', 'Evening'].map((slot) => (
            <AppButton
              key={slot}
              label={slot.charAt(0).toUpperCase() + slot.slice(1)}
              textColor={
                timeSlot === slot ? 'text-foreground' : 'text-white/90'
              }
              className={`min-w-22.5 border hover:bg-secondary/80 ${
                timeSlot === slot
                  ? 'bg-primary border-primary'
                  : 'bg-background'
              }`}
              onClick={() => handleTimeSlotButton(slot)}
            />
          ))}
        </div>

        {/* Preview Selected */}
        {careDate && timeSlot && (
          <div className="mt-4 p-2 border rounded-md bg-muted text-sm text-muted-foreground">
            Selected: {careDate} ({timeSlot})
          </div>
        )}
      </CardContent>
    </Card>
  );
};
