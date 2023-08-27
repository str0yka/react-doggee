import s from './Button.module.scss';

interface ButtonProps extends React.ComponentProps<'button'> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ isLoading, children, ...props }) => (
  <button
    {...props}
    className={s.button}
  >
    {children}
  </button>
);
