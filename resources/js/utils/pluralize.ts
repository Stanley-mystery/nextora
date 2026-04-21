const pluralize = (count: number | string, noun: string, suffix = 's'): string => {
  const tempCount = typeof count === 'string' ? parseInt(count) : count;
  const finalCount = isNaN(tempCount) ? 0 : tempCount;

  if (finalCount === 0) {
    return `${finalCount} ${noun}`;
  }

  return `${finalCount} ${noun}${finalCount !== 1 ? suffix : ''}`;
};

export default pluralize;
