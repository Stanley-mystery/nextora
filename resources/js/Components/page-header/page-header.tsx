import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

const PageHeader = ({ title, action, className = '' }: PageHeaderProps) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 lg:mt-0 ${className}`}>
      <h1 className="mt-1 text-xl font-bold">{title}</h1>
      {action && <div className="flex-shrink-0 flex flex-row gap-3">{action}</div>}
    </div>
  );
};

export default PageHeader;
