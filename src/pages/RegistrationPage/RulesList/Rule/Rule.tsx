import { TickIcon, WarningIcon } from '~common/icons';
import { IntlText } from '~features/intl';

import s from './Rule.module.scss';

export const Rule: React.FC<PasswordRule> = ({ title, isCorrect }) => (
  <>
    {isCorrect ? <TickIcon /> : <WarningIcon />}
    <span className={s.passwordRule}>
      <IntlText
        path={title}
        values={{
          rule: (text) => <span className={s[isCorrect ? 'success' : 'failure']}>{text}</span>,
        }}
      />
    </span>
  </>
);
