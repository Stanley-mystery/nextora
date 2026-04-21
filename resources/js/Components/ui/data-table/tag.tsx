import { ReactNode } from 'react';
import { cn } from '@/utils';

const defaultMappings: Record<string, { bgClass: string; borderClass?: string; textClass?: string }> = {
  corporate: { bgClass: 'bg-amber-500/20', borderClass: 'border-amber-600', textClass: 'text-amber-600' },
  individual: { bgClass: 'bg-gray-50', borderClass: 'border-gray-300' },
  active: { bgClass: 'bg-teal-500', textClass: 'text-white' },
  inactive: { bgClass: 'bg-red-500', textClass: 'text-white' },
  system: { bgClass: 'bg-red-500', textClass: 'text-white' },
  custom: { bgClass: 'bg-gray-500', textClass: 'text-white' },
};

export interface TagProps {
  children: ReactNode;
  variants?: Record<string, { bgClass: string; borderClass?: string; textClass: string }>;
  className?: string;
}

const Tag = ({ children, variants, className }: TagProps) => {
  const value = String(children).trim().toLowerCase();
  const allMappings = { ...defaultMappings, ...variants };
  const config = allMappings[value];

  const colorClasses: string[] = [];
  if (config) {
    colorClasses.push(config.bgClass, config.textClass ?? '');
    if (config.borderClass) {
      colorClasses.push('border', config.borderClass);
    }
  }

  const displayValue = String(children).replace(/_/g, ' ');

  return (
    <span
      className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize', colorClasses, className)}
    >
      {displayValue}
    </span>
  );
};

export default Tag;
