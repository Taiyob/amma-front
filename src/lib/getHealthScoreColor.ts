export const getHealthScoreColor = (score: number) => {
  if (score >= 75) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-500';
  return 'text-rose-600';
};

export const getHealthScoreBgColor = (score: number) => {
  if (score >= 75) return 'bg-[#10B981]';
  if (score >= 50) return 'bg-[#F59E0B]';
  return 'bg-[#EF4444]';
};

export const getHealthScorePriority = (score: number) => {
  if (score >= 75) return 'low priority';
  if (score >= 50) return 'medium priority';
  return 'high priority';
};
