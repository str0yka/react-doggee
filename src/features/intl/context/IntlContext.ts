import { createContext } from 'react';

export interface IntlContextProps {
  locale: string;
  messages: Record<string, string>;
}

export const IntlContext = createContext<IntlContextProps>({ locale: 'ru', messages: {} });
