import { getApiErrorMessage } from '@/utils';
import { ErrorLayout } from '../layouts';
import { cn } from '@/utils';
import { Logo } from '../logo';

type Props = {
  error: unknown;
  centered?: boolean;
};

const DefaultError = ({ error, centered }: Props) => {
  return <div className={cn(centered && 'h-screen flex flex-col items-center justify-center')}>
    {centered && <Logo width={40} className="mb-0 relative top-6" />}
    <ErrorLayout 
      title={`Something went wrong`} 
      message={getApiErrorMessage(error)} 
    />
  </div>;
};

export default DefaultError;
