import { createContext } from 'react';

export const themes = ['light', 'dark'] as const;
export type Theme = (typeof themes)[number];
export interface ThemeContextProps {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  changeTheme: () => {},
});
