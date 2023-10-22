import { DropDownIcon } from '~common/icons';
import { IntlText } from '~features/intl';
import { getClassName } from '~utils/helpers';

import { Input, InputWrapper } from '../../Input/Input';

import s from './Select.module.scss';
import { useSelect } from './hooks';

interface SelectProps<Options extends Option[]>
  extends Omit<InputProps, 'type' | 'value' | 'onSelect'> {
  options: Options;
  value: Options[number]['value'];
  onSelect?: (option: Options[number]['value']) => void;
  filterOptions?: FilterOptionsFunction;
}

const DEFAULT_FILTER_FUNCTION = (option: Option, inputValue: string) =>
  option.label.toLowerCase().includes(inputValue.toLowerCase());

export const Select = <Options extends Option[]>({
  options,
  value,
  onSelect,
  filterOptions = DEFAULT_FILTER_FUNCTION,
  ...props
}: SelectProps<Options>) => {
  const { state, refs, functions } = useSelect({ options, value, onSelect, filterOptions });

  return (
    <InputWrapper>
      <div
        ref={refs.selectRef}
        className={s.selectContainer}
        role='listbox'
        tabIndex={0}
        onClick={functions.onSelectClick}
        onKeyDown={functions.onSelectKeyDown}
      >
        <Input
          {...props}
          type='text'
          value={state.inputValue}
          indicator={
            <div className={s.indicatorContainer}>
              <DropDownIcon
                className={getClassName(s.indicator, state.isOpen && s.indicatorActive)}
              />
            </div>
          }
          onChange={functions.onInputValueChange}
        />
        {state.isOpen && (
          <ul
            ref={refs.ulRef}
            className={s.optionsContainer}
          >
            {!state.filteredOptions.length && (
              <li>
                <button
                  className={getClassName(s.option, s.optionNotFound)}
                  type='button'
                >
                  <IntlText path='select.options.label.noOptions' />
                </button>
              </li>
            )}
            {state.filteredOptions.map((filteredOption) => {
              const isSelected = state.value === filteredOption.value;
              const isFocused = state.searchSelectedOption.value === filteredOption.value;

              return (
                <li key={filteredOption.value}>
                  <button
                    type='button'
                    className={getClassName(
                      s.option,
                      isSelected && s.optionSelected,
                      isFocused && s.optionFocused
                    )}
                    onClick={() => functions.onSelectOption(filteredOption.value)}
                  >
                    {filteredOption.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </InputWrapper>
  );
};
