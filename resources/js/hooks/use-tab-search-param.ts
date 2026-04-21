import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

const DEFAULT_PARAM_NAME = 'tab';

function useTabSearchParam<T extends string>(
  validKeys: readonly T[],
  defaultKey: T,
  paramName: string = DEFAULT_PARAM_NAME,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const validSet = useMemo(() => new Set<string>(validKeys), [validKeys]);

  const activeKey = useMemo(() => {
    const fromUrl = searchParams.get(paramName);
    if (fromUrl && validSet.has(fromUrl)) {
      return fromUrl as T;
    }
    return defaultKey;
  }, [searchParams, paramName, validSet, defaultKey]);

  const onTabChange = useCallback(
    (key: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (key === defaultKey) {
            next.delete(paramName);
          } else {
            next.set(paramName, key);
          }
          return next;
        },
        { replace: true },
      );
    },
    [defaultKey, paramName, setSearchParams],
  );

  return { activeKey, onTabChange };
}

export default useTabSearchParam;
