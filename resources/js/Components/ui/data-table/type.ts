import type { ColumnsType } from 'antd/es/table';
import { TableProps } from 'antd';
import { ReactElement, ReactNode } from 'react';

export interface ActionButton {
  element: ReactNode;
}

export interface SearchData {
  query: string;
  noResult: boolean;
}

export type SelectFilterOptions =
  | {
      type: 'date';
      label?: string;
    }
  | {
      name: string;
      label: string;
      type?: 'select';
      options: { value: string; label: string; disabled?: boolean }[];
    };

export interface DataTableProps {
  data: Record<string, string | number | boolean | React.ReactNode>[];
  columns: ColumnsType<Record<string, string>>;
  size: number | undefined;
  setPageSize?: (size: number) => void;
  onSearch?: (data: SearchData) => void;
  showSearch?: boolean;
  actionButtons?: ActionButton[];
  isLoading?: boolean;
  currentPage: number;
  rowSelection?: TableProps['rowSelection'];
  onPageChange?: (data: number) => void;
  totalRecords?: number;
  searchPlaceholder?: string;
  showFilter?: boolean;
  filterOptions?: SelectFilterOptions[];
  onFilter?: (value: { submittedFrom?: string; submittedTo?: string } | { [key: string]: string }) => void;
  showHeader?: boolean;
  showPagination?: boolean;
  className?: string;
  isDownloadable?: boolean;
}

export interface UsersAssignedrData {
  id: string;
  key: React.Key;
  first_name: string;
  last_name: string;
  created_at: string;
  status: string;
  action: ReactElement;
  entities: {
    taxId: string;
  };
}
