import { useContext } from 'react';

import { IntlContext } from '..';

export const useIntl = () => {
  const intl = useContext(IntlContext);

  const translateMessage = (
    path: TranslateMessageParams['path'],
    values?: TranslateMessageParams['values'],
  ) => {
    let message = intl.messages[path];
    if (!message) return path;
    // if (!values) return message;

    for (const key in values) {
      message = message.replace(`{${key}}`, String(values[key]));
    }

    return message;
  };

  return { locale: intl.locale, translateMessage };
};
