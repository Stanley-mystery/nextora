const formatRate = (rate?: number) => {
  if (!rate) return;
  return `${(rate * 100).toFixed(2)}%`;
};
export default formatRate;
