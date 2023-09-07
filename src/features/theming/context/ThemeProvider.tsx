import React, { useState } from 'react';

import { getClassName, setCookie } from '~utils/helpers';

import { ThemeContext } from './ThemeContext';
import type { Theme, ThemeContextProps } from './ThemeContext';

import themeStyles from '../../../styles/themes/theme.module.scss';

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
      <div className={getClassName(themeStyles[currentTheme], themeStyles.container)}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
