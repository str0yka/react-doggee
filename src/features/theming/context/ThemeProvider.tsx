import React, { useState } from 'react';

import { setCookie } from '~utils/helpers';

import { ThemeContext } from './ThemeContext';
import type { Theme, ThemeContextProps } from './ThemeContext';

import dark from '../../../styles/themes/dark.module.scss';
import light from '../../../styles/themes/light.module.scss';

interface IntlProviderProps extends Omit<ThemeContextProps, 'changeTheme'> {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<IntlProviderProps> = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const changeTheme = (theme: Theme) => {
    setCookie('doggee-theme', theme);
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, changeTheme }}>
      <div className={currentTheme === 'dark' ? dark.theme : light.theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
