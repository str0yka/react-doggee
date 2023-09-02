import { useIntl } from '..';
import type { TranslateMessageParams } from '..';

interface IntlTextProps extends TranslateMessageParams {
  children?: (message: string) => React.JSX.Element;
}

export const IntlText: React.FC<IntlTextProps> = ({ path, values, children }) => {
  const { translateMessage } = useIntl();

  if (typeof children === 'function') {
    return children(translateMessage(path, values));
  }

  return translateMessage(path, values);
};
