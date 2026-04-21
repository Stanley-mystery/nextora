import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import { FC } from 'react';

interface PulsingLogoProps {
  fill?: boolean;
  className?: string;
  size?: number;
  variant?: 'logo' | 'logomark';
}

const containerVariants = cva('flex items-center justify-center', {
  variants: {
    fill: {
      true: 'h-screen',
      false: 'h-auto',
    },
  },
  defaultVariants: {
    fill: true,
  },
});

const PulsingLogo: FC<PulsingLogoProps> = ({ fill = true, className = '', size = 40 }) => {
  return (
    <div className={cn(containerVariants({ fill: fill }), className)}>
      <div className="relative">
        <img src="/logo.png" alt="Loading" height={size} width={size} className="animate-logo-pulse" />
      </div>
    </div>
  );
};

export default PulsingLogo;
