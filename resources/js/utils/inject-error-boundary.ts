import { ReactNode } from 'react';
import { RouteObject } from 'react-router';

const injectErrorBoundary = (routes: RouteObject[], errorElement: ReactNode) => {
  return routes.map((route) => {
    const newRoute = { ...route, errorElement };

    if (newRoute.children && newRoute.children.length > 0) {
      newRoute.children = injectErrorBoundary(newRoute.children, errorElement);
    }

    return newRoute;
  });
};

export default injectErrorBoundary;
