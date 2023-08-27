interface InputProps extends Omit<React.ComponentProps<'input'>, 'placeholder'> {
  label: string;
  isError?: boolean;
  helperText?: string;
}