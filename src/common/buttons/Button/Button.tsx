import s from './Button.module.scss';

interface ButtonProps extends React.ComponentProps<'button'> {}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className={s.button}
  >
    {children}
  </button>
);
