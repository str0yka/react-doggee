import { useState, useEffect } from 'react';

interface Options<T, K> {
  request: () => Promise<K>;
  initialValue: T;
  dependencies?: unknown[];
}

export const useQuery = <T, K>({ request, initialValue, dependencies = [] }: Options<T, K>) => {
  const [data, setData] = useState<T | K>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await request();
        setData(response);
      } catch (error) {
        setIsError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, dependencies);

  return { data, isLoading, isError };
};
