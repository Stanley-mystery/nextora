const formatDate = (value: string): string => {
  const date = new Date(value);
  const formatted = date.toLocaleString('en-gb', { month: 'short', day: 'numeric', year: 'numeric' });
  return formatted;
};

export default formatDate;
