import { IntlText } from '~features/intl';

import { Rule } from './Rule/Rule';
import s from './RulesList.module.scss';

interface RulesListProps {
  rulesList: RulesList;
}

export const RulesList: React.FC<RulesListProps> = ({ rulesList }) =>
  rulesList.map((rules, index) => (
    <ul
      key={index}
      className={s.passwordRules}
    >
      {!!rules.title && <IntlText path={rules.title} />}
      {rules.rules.map((rule) => (
        <li key={rule.title}>
          <Rule
            title={rule.title}
            isCorrect={rule.isCorrect}
          />
        </li>
      ))}
    </ul>
  ));
