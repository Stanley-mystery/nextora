import { FC } from 'react';
import { Button } from '../ui';
import { useNavigate } from 'react-router';
import { LuFileQuestion } from 'react-icons/lu';

interface ResourceNotFoundProps {
  title: string;
  subTitle: string;
}

const ResourceNotFound: FC<ResourceNotFoundProps> = ({ title, subTitle }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mx-auto flex flex-col gap-1 text-center border border-zinc-200 rounded-md p-16">
        <LuFileQuestion size={40} className="mx-auto mb-4 text-primary" />

        <h3 className="text-primary text-xl mb-0 inline-block">{title}</h3>
        <p className=" text-zinc-500 text-sm mb-0 inline-block">{subTitle}</p>

        <Button className="mt-6" type="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ResourceNotFound;
