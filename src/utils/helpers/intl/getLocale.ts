const ACCEPT_LOCALES = ['ru-RU', 'en-US'] as const;
export const DEFAULT_LOCALE = ACCEPT_LOCALES[0];
export type AcceptLocales = (typeof ACCEPT_LOCALES)[number];

export const getLocale = () => {
  const locale = navigator.language;
  const isLocaleAccepted = !!ACCEPT_LOCALES.find((acceptLocal) => acceptLocal === locale);

  if (isLocaleAccepted) return locale as AcceptLocales;

  return DEFAULT_LOCALE;
};
