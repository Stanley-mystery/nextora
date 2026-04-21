import { FC, ReactNode } from 'react';

interface BaseProps {
  title: string;
  subTitle?: ReactNode;
  children?: React.ReactNode;
}

const Base: FC<BaseProps> = ({ title, subTitle, children }) => {
  return (
    <div className="px-2 pt-1">
      <strong className="text-xl font-bold">{title}</strong>
      {subTitle && <p className="text-md pt-1 text-zinc-400">{subTitle}</p>}
      <hr className="mt-6" />
      <div className="mt-6">{children && <div className="mt-4">{children}</div>}</div>
    </div>
  );
};

export default Base;
