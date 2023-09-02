import { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LoadingPage } from '~pages';
import { getCookie, deleteCookie, getLocale, getMessages } from '~utils/helpers';
import { IntlProvider } from '~features/intl';
import { publicRoutes, privateRoutes } from '~router';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [messages, setMessages] = useState({});
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
      const messages = await getMessages(locale);
      setMessages(messages);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      <RouterProvider router={router} />
    </IntlProvider>
  );
};

export default App;
