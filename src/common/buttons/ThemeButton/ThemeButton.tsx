import { SunIcon, MoonIcon } from '~common/icons';
import { useTheme } from '~features/theming';

interface ThemeButtonProps extends Omit<React.ComponentProps<'button'>, 'onClick' | 'children'> {}

export const ThemeButton: React.FC<ThemeButtonProps> = (props) => {
  const { theme, changeTheme } = useTheme();

  return (
    <button
      {...props}
      onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
