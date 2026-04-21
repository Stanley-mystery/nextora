import { useLocation } from 'react-router';

const useBackPath = (fallback: string) => {
  const location = useLocation();
  return location.state?.from ?? fallback;
};

export default useBackPath;
