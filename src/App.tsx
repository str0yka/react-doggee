import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { IntlProvider } from '~features/intl';
import { getInitialTheme, ThemeProvider } from '~features/theming';
import { LoadingPage } from '~pages';
import { privateRoutes, publicRoutes } from '~router';
import { UserProvider } from '~utils/contexts';
import { deleteCookie, getCookie, getLocale, getMessages } from '~utils/helpers';

const App = () => {
  const theme = getInitialTheme();
  const [isAuth, setIsAuth] = useState(false);
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = createBrowserRouter(isAuth ? publicRoutes : privateRoutes);
  const locale = getLocale();

  useEffect(() => {
    const authToken = getCookie('doggee-auth-token');
    const isNotMyDevice = getCookie('doggee-not-my-device');
    const deviceExpire = isNotMyDevice && Date.now() > new Date(+isNotMyDevice).getTime();

    if (authToken && deviceExpire) {
      deleteCookie('doggee-auth-token');
      deleteCookie('doggee-not-my-device');
    }

    if (authToken && !deviceExpire) {
      setIsAuth(true);
    }

    (async () => {
      const localeMessages = await getMessages(locale);
      setMessages(localeMessages);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        locale={locale}
        messages={messages}
      >
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;
