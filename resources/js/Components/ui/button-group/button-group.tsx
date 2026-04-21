import React from 'react';
import Button from '../button/button';
import { cn } from '@/utils';

interface ButtonGroupProps {
  data: { label: string | React.ReactNode; name: string }[];
  onClick: (name: string) => void;
  activeButton?: string;
}
function ButtonGroup(props: ButtonGroupProps) {
  return (
    <div className="rounded-lg p-[6px] bg-[#F6F6F9] flex items-center gap-3">
      {props.data.map((item, index) => (
        <Button
          key={index}
          onClick={() => props.onClick(item.name)}
          className={cn('px-4 py-2 rounded-md text-xs  border-none text-custom-textGrey bg-transparent', {
            'bg-white text-custom-textBlack font-semibold': item.name === props.activeButton,
          })}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}

export default ButtonGroup;
