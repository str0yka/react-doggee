interface PasswordRule {
  title: string;
  isCorrect: boolean;
}

interface PasswordRules {
  title?: string;
  rules: PasswordRule[];
}

type RulesList = PasswordRules[];
