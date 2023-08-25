import s from './Input.module.scss';

interface InputProps extends React.ComponentProps<'input'> {
  isError?: boolean;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  isError,
  helperText,
  ...props
}) => (
  <div className={s.inputContainer}>
    <input
      {...props}
      className={[s.input, isError ? s.error : ''].join(' ')}
      type="text"
    />
    {isError && helperText && (
      <span className={s.helperText}>{helperText}</span>
    )}
  </div>
);
