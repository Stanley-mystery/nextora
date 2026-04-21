import ErrorLayout from '@/components/layouts/error-layout';
import { ROUTES } from '@/constants/routes';
import { Logo } from '../logo';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
    <Logo width={40} className="mb-8" />

    <ErrorLayout
      code="404"
      message="We couldn’t find the page you were looking for. It may have been moved or the URL might be incorrect."
      action={{ label: 'Go to dashboard', href: ROUTES.DASHBOARD }}
      className="py-0"
    />
  </div>
);

export default NotFound;
