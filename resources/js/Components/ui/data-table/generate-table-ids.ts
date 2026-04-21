export const generateTableIDs = (
  currentPage: number | undefined,
  perPage: number | undefined,
  index: number
): number => {
  if (currentPage === undefined || perPage === undefined) return 0;
  const startIndex = currentPage * perPage;
  return startIndex + index + 1;
};
