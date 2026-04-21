import ErrorLayout from '@/components/layouts/error-layout';
import { ROUTES } from '@/constants/routes';

const Forbidden = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
    <ErrorLayout
      code="403"
      title="Access forbidden"
      message="You don’t have permission to view this resource."
      action={{ label: 'Go to dashboard', href: ROUTES.DASHBOARD }}
      className="py-0"
    />
  </div>
);

export default Forbidden;
