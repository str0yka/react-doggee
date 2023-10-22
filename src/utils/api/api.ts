import { API } from './instance';

export const api = new API(import.meta.env.VITE_API_URL as string, {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' }
});
