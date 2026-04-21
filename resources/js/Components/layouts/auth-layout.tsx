import { Logo } from '@/components/logo';
import { APP_TAGLINE } from '@/constants/config';
import { ReactNode } from 'react';

const AuthLayout = ({ children, headerAction }: { children: ReactNode; headerAction?: ReactNode }) => {
  return (
    <div className="min-h-screen flex bg-opacity-70 lg:p-8">
      <div className="w-full lg:flex lg:w-[50%] xl:w-[50%] flex-col relative overflow-hidden p-6 sm:p-8 lg:p-12 xl:p-16 !pt-0">
        <div className="xl:px-20 flex flex-col justify-between py-6 mb-16 lg:mb-0">
          <header className="flex justify-between items-center px-0 pb-6">{headerAction}</header>
        </div>

        <div className="w-full h-full justify-center md:max-w-lg lg:max-w-sm mx-auto flex lg:items-center relative -top-16">
          <div className="w-full">
            <div className="flex items-center lg:hidden mb-12">
              <Logo height={32} width={32} />
            </div>

            {children}
          </div>
        </div>
      </div>

      <div className="bg-background-secondary bg-opacity-60 rounded-[40px] flex-1 flex-col lg:w-[50%] xl:w-[50%] justify-start hidden lg:flex lg:items-center lg:justify-center">
        <div className="w-full max-w-lg lg:max-w-sm mx-auto justify-center items-center flex flex-col gap-8 text-center">
          <Logo height={125} width={125} />
          <p className="xl:text-3xl text-2xl font-bold">{APP_TAGLINE}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
