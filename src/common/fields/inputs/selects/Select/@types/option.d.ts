interface Option {
  value: string | number;
  label: string;
}

interface FilterOptionsFunction {
  (option: Option, inputValue: string): void;
}
