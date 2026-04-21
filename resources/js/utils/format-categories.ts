export const formatCategories = (data?: Record<string, number>) => {
  if (!data || Object.keys(data).length === 0) {
    return 'N/A';
  }

  const labelMap: Record<string, string> = {};

  return Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .map(([key, value]) => {
      const label = labelMap[key] || key;
      return `${label} (${value})`;
    })
    .join(', ');
};
