/**
 * Utility to parse blood glucose values that might contain units.
 * Supports "mg/dL" (default) and "mmol/L".
 */
export const parseBloodGlucose = (value: string | number | undefined | null) => {
  if (value === undefined || value === null || value === '' || value === 'N/A') {
    return { numValue: 0, isMmol: false };
  }

  const strValue = String(value).toLowerCase();
  const isMmol = strValue.includes('mmol/l');
  // parseFloat correctly handles "165 mg/dL" by returning 165
  const numValue = parseFloat(strValue);

  return {
    numValue: isNaN(numValue) ? 0 : numValue,
    isMmol,
  };
};

/**
 * Formats a blood glucose value to mmol/L string.
 */
export const formatBloodGlucoseToMmol = (value: string | number | undefined | null) => {
  const { numValue, isMmol } = parseBloodGlucose(value);
  if (numValue === 0 && !value) return '0';

  const mmolValue = isMmol ? numValue : numValue / 18.0182;
  return `${mmolValue.toFixed(1)} mmol/L`;
};

/**
 * Formats a blood glucose value to mg/dL string.
 */
export const formatBloodGlucoseToMgDl = (value: string | number | undefined | null) => {
  const { numValue, isMmol } = parseBloodGlucose(value);
  if (numValue === 0 && !value) return '0';

  const mgDlValue = isMmol ? numValue * 18.0182 : numValue;
  return `${mgDlValue.toFixed(0)} mg/dL`;
};
