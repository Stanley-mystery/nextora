import { useEffect } from 'react';
import NProgress from 'nprogress';
import { useLocation, Outlet } from 'react-router';

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

function NavigationProgress() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location]);

  return <Outlet />;
}

export default NavigationProgress;
