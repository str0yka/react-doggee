import { themes } from '..';
import type { Theme } from '..';
import { getCookie } from '~utils/helpers';

export const getInitialTheme = () => {
  const cookiedTheme = getCookie('doggee-theme') as Theme | undefined;
  const systemTheme =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const isCookiedThemeValid = cookiedTheme && !!themes.find((theme) => theme === cookiedTheme);

  return isCookiedThemeValid ? cookiedTheme : systemTheme;
};
