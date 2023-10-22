interface InputProps extends Omit<React.ComponentProps<'input'>, 'placeholder' | 'ref' | 'id'> {
  label: string;
  isError?: boolean;
  helperText?: string;
  mask?: RegExp;
  indicator?: React.ReactNode;
}
