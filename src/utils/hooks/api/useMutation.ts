import { useState, useCallback } from 'react';

export const useMutation = <T, K = unknown>(request: (body: K) => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const mutation = useCallback(async (body: K) => {
    try {
      setIsLoading(true);
      setIsError('');
      const response = await request(body);
      return response;
    } catch (error) {
      setIsError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mutation, isLoading, isError };
};
