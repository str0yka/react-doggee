import { IntlText } from '~features/intl';
import { TickIcon, WarningIcon } from '~common/icons';

import s from './Rules.module.scss';

interface RulesProps {
  rules: Rule[];
  titleIntlPath?: string;
}

export const Rules: React.FC<RulesProps> = ({ rules, titleIntlPath }) => (
  <ul className={s.rulesContainer}>
    {titleIntlPath && (
      <span>
        <IntlText path={titleIntlPath} />
      </span>
    )}
    {rules.map((rule) => (
      <li
        key={rule.intlPath}
        className={s.ruleContainer}>
        {rule.isCorrect ? <TickIcon /> : <WarningIcon />}
        <span className={s.rule}>
          <IntlText
            path={rule.intlPath}
            values={{
              rule: (text) => (
                <span className={s[rule.isCorrect ? 'success' : 'failure']}>{text}</span>
              ),
            }}
          />
        </span>
      </li>
    ))}
  </ul>
);
