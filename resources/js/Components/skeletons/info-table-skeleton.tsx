import { Divider, Skeleton } from 'antd';
import type { FC } from 'react';

type InfoTableSkeletonProps = {
  rowCount?: number;
  showTitle?: boolean;
  className?: string;
};

const InfoTableSkeleton: FC<InfoTableSkeletonProps> = ({ rowCount = 4, showTitle = true, className = '' }) => {
  const skeletonRow = (key: number) => (
    <div key={key}>
      <div className="flex gap-40 pt-3 pb-2 px-4">
        <Skeleton.Input active size="small" style={{ width: '1.5vw', height: '16px' }} />
        <Skeleton.Input active size="small" style={{ width: '18vw', height: '16px' }} />
      </div>
      <Divider className="my-0" />
    </div>
  );

  return (
    <div className={`border border-zinc-100 rounded-lg py-0 ${showTitle ? 'mt-12' : ''} ${className}`.trim()}>
      {showTitle && (
        <div className="text-xl font-semibold mb-6">
          <Skeleton.Input active size="default" style={{ width: '10vw', height: '24px' }} />
        </div>
      )}

      {Array.from({ length: rowCount }, (_, i) => skeletonRow(i))}
    </div>
  );
};

export default InfoTableSkeleton;
