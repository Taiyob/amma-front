export const PLAN_DISPLAY_NAMES: Record<string, string> = {
  Starter: 'Bronze',
  Business: 'Silver',
  Enterprise: 'Gold',
};

/**
 * Maps backend plan names to display-friendly names.
 * @param name The original plan name from the backend.
 * @returns The mapped display name or the original name if no mapping exists.
 */
export const getPlanDisplayName = (name: string): string => {
  if (!name) return '';
  // Normalize to Title Case just in case (Starter, Business, Enterprise)
  const normalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return PLAN_DISPLAY_NAMES[normalizedName] || name;
};
