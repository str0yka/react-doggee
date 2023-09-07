import { useState } from 'react';

interface UseFormParams<Values> {
  initialValues: Values;
  validateSchema?: {
    [Key in keyof Values]?: (value: Values[Key]) => string | null;
  };
  validateOnChange?: boolean;
  onSubmit?: (values: Values) => void;
}

const getObjectWithSameKeys = <T extends Object>(obj: T, value: unknown) => {
  const keys = Object.keys(obj) as (keyof T)[];
  const enteriesObject = keys.map((key) => [key, value]);
  return Object.fromEntries(enteriesObject);
};

export const useForm = <Values extends Object>({
  initialValues,
  validateSchema,
  validateOnChange = true,
  onSubmit,
}: UseFormParams<Values>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [Key in keyof Values]?: string }>(
    getObjectWithSameKeys(initialValues, null),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = <T extends keyof Values>(field: T, value: Values[T]) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    const validateField = validateSchema && validateSchema[field];
    if (validateField && validateOnChange) {
      const error = validateField(value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const setFieldError = <T extends keyof Values>(field: T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (onSubmit) {
      setIsSubmitting(true);
      onSubmit(values);
      setIsSubmitting(false);
    }
  };

  return { values, errors, handleSubmit, isSubmitting, setFieldValue, setFieldError };
};
