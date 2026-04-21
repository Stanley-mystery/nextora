import Button from '@/components/ui/button';
import { cn } from '@/utils';
import { Link } from 'react-router';
import { PiLinkBreakBold } from 'react-icons/pi';

export type ErrorLayoutProps = {
  code?: string;
  title?: string;
  message: string;
  action?: { label: string; href: string };
  className?: string;
};

const ErrorLayout = ({ code, title, message, action, className }: ErrorLayoutProps) => {
  return (
    <div className={cn('flex w-full flex-col items-center justify-center py-12 px-4', className)}>
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm sm:p-8">
        {!code && <PiLinkBreakBold size={28} className="text-zinc-400" />}

        {code ? (
          <p className="text-5xl font-bold leading-none tracking-tight text-zinc-400 sm:text-4xl">{code}</p>
        ) : null}
        <div className="flex flex-col gap-2">
          {title && <h1 className="text-lg font-semibold text-zinc-800 sm:text-xl">{title}</h1>}
          <p className="leading-relaxed text-zinc-500 text-sm">{message}</p>
        </div>
        {action ? (
          <div className="pt-1">
            <Link to={action.href}>
              <Button type="primary">{action.label}</Button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ErrorLayout;
