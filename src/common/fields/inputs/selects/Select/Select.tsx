import { useState, useRef } from 'react';

import { DropDownIcon } from '~common/icons';
import { getClassName } from '~utils/helpers';
import { useOnClickOutside } from '~utils/hooks';

import { Input } from '../../Input/Input';
import s from './Select.module.scss';

interface Option {
  label: string;
  value: string | number;
  option: any;
}

interface SelectProps extends Omit<InputProps, 'type' | 'value' | 'onChange'> {
  options: Option[];
  option: Option;
  onChange: (option: Option) => void;
}

export const Select: React.FC<SelectProps> = ({ options, option, onChange, ...props }) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [inputValue, setInputValue] = useState(option.label);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(
    options.findIndex((o) => o.value === option.value) === -1
      ? 0
      : options.findIndex((o) => o.value === option.value),
  );

  console.log('focusedOptionIndex: ', focusedOptionIndex);

  const selectContainerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(selectContainerRef, () => {
    setInputValue(option.label);
    setIsOptionsVisible(false);
  });

  const filtredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div
      ref={selectContainerRef}
      className={s.selectContainer}
      onKeyDown={(event) => {
        event.preventDefault();

        if (event.key === 'ArrowUp') {
          if (focusedOptionIndex <= 0) {
            return setFocusedOptionIndex(options.length - 1);
          }

          setFocusedOptionIndex((prev) => prev - 1);
        }

        if (event.key === 'ArrowDown') {
          if (focusedOptionIndex >= options.length - 1) {
            return setFocusedOptionIndex(0);
          }

          setFocusedOptionIndex((prev) => prev + 1);
        }

        if (event.key === 'Enter') {
          onChange(options[focusedOptionIndex]);
        }
      }}
      onClick={() => {
        setIsOptionsVisible(true);
        setInputValue('');
      }}
    >
      <Input
        {...props}
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        indicator={
          <div className={s.indicatorContainer}>
            <DropDownIcon
              className={getClassName(s.indicator, isOptionsVisible && s.indicatorActive)}
            />
          </div>
        }
      />
      {isOptionsVisible && (
        <ul className={s.optionsContainer}>
          {filtredOptions.map((filterdOption, index) => {
            const isSelected = option.value === filterdOption.value;
            const isFocused = focusedOptionIndex === index;

            return (
              <li key={filterdOption.value}>
                <button
                  className={getClassName(
                    s.option,
                    isSelected && s.optionSelected,
                    isFocused && s.optionFocused,
                  )}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsOptionsVisible(false);
                    onChange(filterdOption);
                    setInputValue(filterdOption.label);
                  }}
                >
                  {filterdOption.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
