import { FC } from 'react';
import { Header } from '@/components/header';
import dayjs from 'dayjs';
import { Link } from 'react-router';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="flex w-full">
        <div className="flex-1 flex flex-col min-h-screen w-0 min-w-0">
          <Header />

          <main className="flex-1 pt-16 md:pt-32 overflow-x-hidden w-full">
            <div className="p-4 sm:p-6 lg:p-8 lg:px-12 w-full max-w-full">{children}</div>
          </main>
        </div>
      </div>

      <footer className='lg:px-12 md:px-8 sm:px-6 px-4 pt-8 pb-4'>
        <div className='flex justify-between items-center -mt-16 text-zinc-500 border-t pt-5 border-zinc-200'>
          <ul className='flex items-center gap-4'>
            <li><Link to='/#'>Submission Guidelines</Link></li>
            <li><Link to='/#'>FAQs</Link></li>
          </ul>
          <p className='text-sm'>© All Rights Reserved, PENCOM {dayjs().year()}</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
