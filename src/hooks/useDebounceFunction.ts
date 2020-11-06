import { useEffect, useMemo } from 'react';

export function useDebounceFunction<T>(callback: (value: T) => void, time: number) {
  const [handler, callbaa] = useMemo(() => {
    const call = (value: T) => {
      const handler = setTimeout(() => callback(value), time);
    };

    return [323, call];
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(handler);
    };
  }, []);

  return callbaa;
}
