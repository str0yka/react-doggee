import { useState, useCallback } from 'react';

interface Config extends Omit<RequestInit, 'body' | 'method'> {}
interface Options {
  dependencies: unknown[];
}

export const useQueryLazy = <T>(url: string, { dependencies }: Options, config?: Config) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [status, setStatus] = useState(0);

  const query = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        ...config,
        headers: { 'Content-Type': 'application/json', ...config?.headers },
      });
      setStatus(response.status);
      return response.json() as Promise<T>;
    } catch (error) {
      setIsError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, dependencies);

  return { query, isLoading, isError, status };
};
