import { useState } from 'react';

interface UseFormParams<Values> {
  initialValues: Values;
  validateSchema?: {
    [Key in keyof Values]?: (value: Values[Key]) => string | null;
  };
  validateOnChange?: boolean;
  validateOnSubmit?: boolean;
  onSubmit?: (values: Values) => void;
}

const getObjectWithSameKeys = <T extends Record<string, unknown>, K>(obj: T, value: K) => {
  const keys = Object.keys(obj) as (keyof T)[];
  const enteriesObject = keys.map((key) => [key, value]);
  return Object.fromEntries(enteriesObject) as Record<keyof T, K>;
};

export const useForm = <Values extends Record<string, unknown>>({
  initialValues,
  validateSchema,
  validateOnChange = true,
  validateOnSubmit = true,
  onSubmit
}: UseFormParams<Values>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [Key in keyof Values]?: string | null }>(
    getObjectWithSameKeys(initialValues, null)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = <T extends keyof Values>(field: T, value: Values[T]) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    const validateField = validateSchema?.[field];
    if (validateField && validateOnChange) {
      const error = validateField(value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const setFieldError = <T extends keyof Values>(field: T, error: string | null) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validate = () => {
    const validateErrors: typeof errors = {};
    let isErrors = false;

    if (!validateSchema) return { validateErrors, isErrors };

    const validateSchemaKeys = Object.keys(validateSchema) as (keyof typeof validateSchema)[];

    validateSchemaKeys.forEach((validateSchemaKey) => {
      const error = validateSchema[validateSchemaKey]?.(values[validateSchemaKey]);

      if (error) {
        isErrors = true;
        validateErrors[validateSchemaKey] = error;
      }
    });

    setErrors({ ...errors, ...validateErrors });

    return { validateErrors, isErrors };
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isErrors = validateOnSubmit && validate().isErrors;

    if (onSubmit && !isErrors) {
      setIsSubmitting(true);
      onSubmit(values);
      setIsSubmitting(false);
    }
  };

  return { values, errors, handleSubmit, isSubmitting, setFieldValue, setFieldError, validate };
};
