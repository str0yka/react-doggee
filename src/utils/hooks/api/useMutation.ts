import { useState, useCallback } from 'react';

interface Config extends Omit<RequestInit, 'body'> {}

export const useMutation = <T, K>(url: string, config: Config) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [status, setStatus] = useState(0);

  const mutation = useCallback(async (body: K) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        ...config,
        headers: { 'Content-Type': 'application/json', ...config?.headers },
        body: JSON.stringify(body),
      });
      setStatus(response.status);
      return response.json() as Promise<T>;
    } catch (error) {
      setIsError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mutation, isLoading, isError, status };
};
