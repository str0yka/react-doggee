import { useState, useCallback } from 'react';

interface Options<T> {
  request: () => Promise<T>;
  dependencies?: unknown[];
}

export const useQueryLazy = <T>({ request, dependencies = [] }: Options<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const query = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError('');
      const response = await request();
      return response;
    } catch (error) {
      setIsError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, dependencies);

  return { query, isLoading, isError };
};
