import { FC, PropsWithChildren } from 'react';
import { cn } from '@/utils';

interface DefaultLayoutProps {
  offwhite?: boolean;
  footer?: boolean;
}

const DefaultLayout: FC<PropsWithChildren<DefaultLayoutProps>> = ({ children, offwhite }) => {
  return (
    <div>
      <main
        className={cn('pt-6 pb-16 lg:max-w-7xl xl:max-w-[1500px] m-auto', {
          'before:fixed before:inset-0 before:bg-off-white before:-z-10': offwhite,
        })}
      >
        <div className="px-5 xl:px-5">{children}</div>
      </main>
    </div>
  );
};

export default DefaultLayout;
