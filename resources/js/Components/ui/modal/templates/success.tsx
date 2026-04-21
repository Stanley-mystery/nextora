import { FC, ReactNode } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

interface SuccessProps {
  title: string;
  subTitle?: ReactNode;
  children: React.ReactNode;
}

const Success: FC<SuccessProps> = ({ title, subTitle, children }) => {
  return (
    <div className="text-center pb-0">
      <FaCircleCheck className="mb-7 mx-auto mt-4 text-teal-500" size={40} />
      <h2 className="text-xl">{title}</h2>
      {subTitle && <p className="text-zinc-500 pt-2">{subTitle}</p>}
      <div className="mt-7">{children}</div>
    </div>
  );
};

export default Success;
