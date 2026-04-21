import { FC, ReactNode } from 'react';
import WarningIcon from '@/assets/images/svgs/warning.svg';
import Svg from '../../svg';

interface WarningProps {
  title: string;
  subTitle?: ReactNode;
  children: React.ReactNode;
}

const Warning: FC<WarningProps> = ({ title, subTitle, children }) => {
  return (
    <div className="text-center pb-0">
      <Svg component={WarningIcon} className="mb-5 mx-auto mt-4" height={88} width={88} />
      <h2 className="text-xl">{title}</h2>
      {subTitle && <p className="text-zinc-400 pt-2">{subTitle}</p>}
      <div className="mt-7">{children}</div>
    </div>
  );
};

export default Warning;
