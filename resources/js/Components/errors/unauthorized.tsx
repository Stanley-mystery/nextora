import ErrorLayout from '@/components/layouts/error-layout';
import { ROUTES } from '@/constants/routes';

const Unauthorized = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
    <ErrorLayout
      code="401"
      title="Unauthorized"
      message="You need to sign in to access this page."
      action={{ label: 'Sign in', href: ROUTES.AUTH.LOGIN }}
      className="py-0"
    />
  </div>
);

export default Unauthorized;
