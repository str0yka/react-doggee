import { dogApi } from '../../dogApi';

type RequestBreedsResponse = Array<{ id: number; name: string }>;

export const requestBreeds = () =>
  dogApi.get<RequestBreedsResponse>(
    `/breeds?api_key=${import.meta.env.VITE_DOGS_API_KEY as string}`
  );
