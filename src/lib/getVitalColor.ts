export const getVitalColor = (
  type: string,
  value: string | number | undefined | null,
) => {
  if (!value) return 'text-foreground';

  const strValue = String(value);

  // Blood Pressure logic (e.g., "140/90")
  if (type === 'bp' || type === 'bloodPressure') {
    const parts = strValue.split('/');
    if (parts.length === 2) {
      const systolic = parseInt(parts[0]);
      const diastolic = parseInt(parts[1]);

      if (isNaN(systolic) || isNaN(diastolic)) return 'text-foreground';

      if (systolic >= 140 || diastolic >= 90) return 'text-rose-600'; // High
      if (systolic >= 130 || diastolic >= 85) return 'text-amber-500'; // Elevated
      return 'text-emerald-600'; // Normal
    }
  }

  // Numerical logic for Glucose, Weight, etc.
  const numValue = parseFloat(strValue);
  if (isNaN(numValue)) return 'text-foreground';

  // Blood Glucose (Input can be mg/dL or mmol/L, logic uses mmol/L)
  if (type === 'glucose' || type === 'bloodGlucose') {
    const isMmol = strValue.toLowerCase().includes('mmol/l');
    const mmolValue = isMmol ? numValue : numValue / 18.0182;

    if (mmolValue >= 1.1 && mmolValue <= 3.9) return 'text-[#E74C3C]'; // Low
    if (mmolValue >= 4.0 && mmolValue <= 7.0) return 'text-[#3498DB]'; // Normal
    if (mmolValue >= 7.1 && mmolValue <= 13.8) return 'text-[#1ABC9C]'; // Borderline
    if (mmolValue >= 13.9 && mmolValue <= 21.6) return 'text-[#5D6D7E]'; // High
    if (mmolValue >= 22.2) return 'text-[#F1C40F]'; // Dangerous (Yellow)

    return 'text-foreground';
  }

  // Weight (KG) logic
  if (type === 'weight') {
    // If unit is KG (approx 2.2 * kg), convert mentally or handle by threshold
    // Let's check for "KG" in the string
    const isKG = strValue.toLowerCase().includes('KG');
    const kgValue = isKG ? numValue / 2.2 : numValue;

    if (kgValue > 100) return 'text-rose-600'; // High
    if (kgValue > 85) return 'text-amber-500'; // Elevated
    return 'text-emerald-600'; // Good
  }

  // General Fallback
  return 'text-foreground';
};
