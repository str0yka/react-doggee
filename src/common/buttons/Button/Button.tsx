import s from './Button.module.scss';

interface ButtonProps extends React.ComponentProps<'button'> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ isLoading, children, ...props }) => (
  <button
    className={s.button}
    disabled={isLoading}
    {...props}
  >
    {isLoading ? <div className={s.loader} /> : children}
  </button>
);
