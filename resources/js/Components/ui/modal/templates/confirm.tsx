import { FC, ReactNode } from 'react';

interface ConfirmProps {
  title: string;
  subTitle?: ReactNode;
  children?: React.ReactNode;
}

const Confirm: FC<ConfirmProps> = ({ title, subTitle, children }) => {
  return (
    <div className="px-2 pt-1">
      <strong className="text-xl font-bold">{title}</strong>
      {subTitle && <p className="text-md whitespace-pre-line pt-4 text-zinc-500">{subTitle}</p>}
      <div className="mt-8">{children && <div className="mt-4">{children}</div>}</div>
    </div>
  );
};

export default Confirm;
