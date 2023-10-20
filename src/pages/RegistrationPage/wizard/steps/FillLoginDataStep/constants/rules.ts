export const PASSWORD_RULES = (password: string) => [
  {
    intlPath: 'page.registration.passwordRules.containNumbers',
    isCorrect: password !== password.replace(/[0-9]/g, ''),
  },
  {
    intlPath: 'page.registration.passwordRules.containUppercase',
    isCorrect: password !== password.toLowerCase(),
  },
  {
    intlPath: 'page.registration.passwordRules.containLowercase',
    isCorrect: password !== password.toUpperCase(),
  },
  {
    intlPath: 'page.registration.passwordRules.containAtLeast8Characters',
    isCorrect: password.length >= 8,
  },
];

export const PASSWORD_AGAIN_RULES = (password: string, passwordAgain: string) => [
  {
    intlPath: 'page.registration.passwordRules.mustMatch',
    isCorrect: password === passwordAgain,
  },
];
