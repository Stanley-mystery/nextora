import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import { FC } from 'react';
import { TailSpin } from 'react-loader-spinner';

interface SpinnerProps {
  fill?: boolean;
  className?: string;
  size?: number;
}

const buttonVariants = cva('flex items-center justify-center', {
  variants: {
    fill: {
      true: ' h-screen',
      false: 'h-auto',
    },
  },
  defaultVariants: {
    fill: true,
  },
});

const Spinner: FC<SpinnerProps> = ({ fill = false, className = '', size = 32 }) => {
  return (
    <div className={cn(buttonVariants({ fill: fill }), className)}>
      <TailSpin
        visible={true}
        height={size}
        width={size}
        color="#2C8968"
        ariaLabel="tail-spin-loading"
        radius="1"
        strokeWidth={3}
      />
    </div>
  );
};

export default Spinner;
