import { useState, useEffect } from 'react';

interface Config extends Omit<RequestInit, 'body' | 'method'> {}
interface Options<T> {
  initialValue: T;
  dependencies: unknown[];
}

export const useQuery = <T, K = T>(
  url: string,
  { initialValue, dependencies }: Options<T>,
  config?: Config,
) => {
  const [data, setData] = useState<T | K>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [status, setStatus] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(true);
    fetch(url, {
      ...config,
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...config?.headers },
    })
      .then((res) => {
        setStatus(res.status);
        return res.json() as Promise<T>;
      })
      .then((json) => setData(json))
      .catch((error) => setIsError((error as Error).message))
      .finally(() => setIsLoading(false));
  }, dependencies);

  return { data, isLoading, isError, status };
};
