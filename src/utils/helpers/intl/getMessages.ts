import { DEFAULT_LOCALE } from './getLocale';
import type { AcceptLocales } from './getLocale';

export const getMessages = async (locale: AcceptLocales) => {
  try {
    const messages = await import(`../../../static/locales/${locale}.json`);
    return messages.default;
  } catch {
    const defaultMessages = await import(`../../../static/locales/${DEFAULT_LOCALE}.json`);
    return defaultMessages.default;
  }
};
