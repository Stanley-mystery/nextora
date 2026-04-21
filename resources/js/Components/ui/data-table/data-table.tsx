'use client';

import React, { Fragment, useState } from 'react';
import { Input, Table } from 'antd';
import type { PaginationProps, TablePaginationConfig } from 'antd';
import { ImSpinner2 } from 'react-icons/im';
import _, { isObject } from 'lodash';
import { DataTableProps, SelectFilterOptions } from './type';
import { SelectFilter, DateFilter, Button } from '../';
import { cn } from '@/utils';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineFileDownload } from 'react-icons/md';
import './data-table.css';
const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  size = 3,
  setPageSize,
  totalRecords = 0,
  onSearch,
  isLoading = false,
  currentPage = 1,
  rowSelection = undefined,
  onPageChange,
  searchPlaceholder = 'Search',
  showSearch = true,
  showFilter = true,
  filterOptions,
  onFilter = () => {},
  showPagination = true,
  isDownloadable,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const search = (value: string) => {
    setIsSearching(true);

    const query = value;
    const noResult = _.isEmpty(query);

    setIsSearching(false);
    onSearch?.({ query, noResult });
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (onPageChange && pagination.current) {
      onPageChange(pagination.current);
    }
  };

  const handleFilter = ([value, name]: [Record<string, string> | string, string | null]) => {
    let submittedFrom: string = '';
    let submittedTo: string = '';

    if (isObject(value)) {
      const values = Object.values(value);

      submittedFrom = (values?.[0] as string) ?? '';
      submittedTo = (values?.[1] as string) ?? '';
    }

    if (name === null) {
      onFilter({ submittedFrom, submittedTo });
      return;
    }

    onFilter({ [name]: value });
  };

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a className="px-4">Previous</a>;
    }
    if (type === 'next') {
      return <a className="px-4">Next</a>;
    }
    return originalElement;
  };

  return (
    <div>
      <div className="flex gap-3">
        <div className="w-full">
          {showSearch && (
            <Input
              placeholder={searchPlaceholder}
              prefix={<FiSearch size={14} color="#aaa" className="mr-1" />}
              className="flex-1 py-2.5 mb-6"
              onPressEnter={(e) => search(e.currentTarget.value)}
            />
          )}
        </div>

        {showFilter && (
          <div className="flex gap-3">
            {showFilter &&
              filterOptions?.map((item: SelectFilterOptions, key: number) => {
                return (
                  <Fragment key={key}>
                    {item.type === 'date' ? (
                      <DateFilter
                        placeholder={item.label || 'Date Filter'}
                        disabled={isLoading}
                        onChange={(value: Record<string, string>) => handleFilter([value, null])}
                      />
                    ) : (
                      <SelectFilter
                        required={false}
                        disabled={isLoading}
                        key={key}
                        name={item.name}
                        label={item.label}
                        onChange={(value: string) => handleFilter([value, item?.name as string])}
                        options={item.options}
                      />
                    )}
                  </Fragment>
                );
              })}
          </div>
        )}

        {isDownloadable && (
          <div>
            <Button icon={<MdOutlineFileDownload size={16} />}>Export XLS</Button>
          </div>
        )}
      </div>

      <div className={cn('relative', { 'mt-4': !showFilter })}>
        <Table
          size="middle"
          columns={columns}
          dataSource={data}
          loading={{
            spinning: isSearching || isLoading,
            indicator: (
              <div className="animate-spin !flex justify-center items-center">
                <ImSpinner2 size={20} />
              </div>
            ),
          }}
          pagination={
            showPagination
              ? {
                  pageSize: size ?? 8,
                  current: currentPage,
                  position: ['bottomLeft'],
                  showSizeChanger: false, // show the size changer
                  locale: { items_per_page: '' },
                  pageSizeOptions: ['5', '10', '20', '50'],
                  onChange(page, pageSize) {
                    setPageSize?.(pageSize);
                    onPageChange?.(page);
                  },
                  total: totalRecords,

                  itemRender,
                }
              : false
          }
          onChange={handleTableChange}
          rowKey="key"
          // className="w-full"
          className="custom-pagination-table"
          style={{ width: '100%' }}
          rowSelection={rowSelection}
          components={{
            header: {
              cell: (props: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
                <th
                  {...props}
                  style={{
                    ...props.style,
                    backgroundColor: '#fff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                />
              ),
            },
          }}
        />
        {totalRecords > 0 && (
          <span className="absolute -bottom-[-20px] text-sm text-zinc-500">
            Showing{' '}
            <b className="text-zinc-700">
              {(currentPage - 1) * size + 1} - {Math.min(currentPage * size, totalRecords)}
            </b>{' '}
            of <b className="text-zinc-700">{totalRecords}</b>
          </span>
        )}
      </div>
    </div>
  );
};

export default DataTable;
