export const validatePassword = (value: string) => {
  if (value === value.replace(/[0-9]/g, '')) return 'password must contain numbers';
  if (value === value.toUpperCase()) return 'password must contain lowercase letters';
  if (value === value.toLowerCase()) return 'password must contain uppercase letters';
  if (value.length < 8) return 'password must contain at least 8 characters';
  return null;
};
