import { IntlContext } from './IntlContext';
import type { IntlContextProps } from './IntlContext';

type IntlProviderProps = IntlContextProps & { children: React.ReactNode };

export const IntlProvider: React.FC<IntlProviderProps> = ({ locale, messages, children }) => {
  return <IntlContext.Provider value={{ locale, messages }}>{children}</IntlContext.Provider>;
};
