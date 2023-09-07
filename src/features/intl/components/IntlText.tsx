import React from 'react';

import { useIntl } from '..';

interface IntlTextProps extends TranslateMessageParams {
  children?: (message: Message | React.ReactNode) => React.ReactNode;
}

export const IntlText: React.FC<IntlTextProps> = ({ path, values, children }) => {
  const { translateMessage } = useIntl();
  const withFunctionalKeys =
    !!values && !!Object.keys(values).filter((key) => typeof values[key] === 'function').length;

  const translateMessageWithTags = (
    message: Message,
    values: TranslateMessageParams['values'],
  ): React.ReactNode => {
    if (!values) return message;

    const keys = Object.keys(values);
    const functionalKeys = keys.filter((key) => typeof values[key] === 'function');
    const [key, ...restKeys] = functionalKeys;
    const htmlRegExp = new RegExp(`<${key}>(.*?)</${key}>`, 'gm');
    const [contentWithTag, content] = htmlRegExp.exec(message) ?? [];

    if (!contentWithTag) return message;
    const messageParts = message.split(contentWithTag);
    const result = (values[key] as IntlFunction)(content);
    const filtredValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => restKeys.includes(key)),
    );

    return (
      <>
        {messageParts.map((messagePart, index) => (
          <React.Fragment key={index}>
            {!!index && result}
            {translateMessageWithTags(messagePart, filtredValues)}
          </React.Fragment>
        ))}
      </>
    );
  };

  if (withFunctionalKeys) {
    if (typeof children === 'function') {
      return children(translateMessageWithTags(translateMessage(path, values), values));
    }

    return translateMessageWithTags(translateMessage(path, values), values);
  }

  if (typeof children === 'function') {
    return children(translateMessage(path, values));
  }

  return translateMessage(path, values);
};
