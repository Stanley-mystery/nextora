import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

export const stringSorter = (
  field: string
): ColumnsType<Record<string, string | number | boolean>>[number]['sorter'] => {
  return (a: Record<string, string | number | boolean>, b: Record<string, string | number | boolean>) => {
    const aValue = ((a?.[field] as string) || '').toLowerCase();
    const bValue = ((b?.[field] as string) || '').toLowerCase();
    return aValue.localeCompare(bValue);
  };
};

export const dateSorter = (field: string): ColumnsType<Record<string, string | number | boolean>>[number]['sorter'] => {
  return (a: Record<string, string | number | boolean>, b: Record<string, string | number | boolean>) => {
    const aValue = (a?.[field] as string) || '';
    const bValue = (b?.[field] as string) || '';

    const aDate = dayjs(aValue, 'DD MMM YYYY HH:mm a');
    const bDate = dayjs(bValue, 'DD MMM YYYY HH:mm a');

    if (!aDate.isValid() || !bDate.isValid()) {
      return 0;
    }

    return aDate.valueOf() - bDate.valueOf();
  };
};

export const numberSorter = (
  field: string
): ColumnsType<Record<string, string | number | boolean>>[number]['sorter'] => {
  return (a: Record<string, string | number | boolean>, b: Record<string, string | number | boolean>) => {
    const aValue = (a?.[field] as number) || 0;
    const bValue = (b?.[field] as number) || 0;
    return bValue - aValue;
  };
};
