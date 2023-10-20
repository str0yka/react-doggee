import { DropDownIcon } from '~common/icons';
import { getClassName } from '~utils/helpers';

import { Input, InputWrapper } from '../../Input/Input';
import s from './Select.module.scss';
import { useSelect } from './hooks';

interface SelectProps extends Omit<InputProps, 'type' | 'value' | 'onSelect'> {
  options: Option[];
  defaultOption?: Option;
  onSelect?: (option: Option['value']) => void;
  filterOptions?: FilterOptionsFunction;
}

const DEFAULT_FILTER_FUNCTION = (option: Option, inputValue: string) =>
  option.label.toLowerCase().includes(inputValue.toLowerCase());

export const Select: React.FC<SelectProps> = ({
  options,
  defaultOption = options[0],
  onSelect,
  filterOptions = DEFAULT_FILTER_FUNCTION,
  ...props
}) => {
  const { state, refs, functions } = useSelect({ options, defaultOption, onSelect, filterOptions });

  return (
    <InputWrapper>
      <div
        ref={refs.selectRef}
        className={s.selectContainer}
        onKeyDown={functions.onSelectKeyDown}
        onClick={functions.onSelectClick}>
        <Input
          {...props}
          type="text"
          value={state.inputValue}
          onChange={functions.onInputValueChange}
          indicator={
            <div className={s.indicatorContainer}>
              <DropDownIcon
                className={getClassName(s.indicator, state.isOpen && s.indicatorActive)}
              />
            </div>
          }
        />
        {state.isOpen && (
          <ul
            ref={refs.ulRef}
            className={s.optionsContainer}>
            {state.filteredOptions.map((filteredOption) => {
              const isSelected = state.selectedOption.value === filteredOption.value;
              const isFocused = state.searchSelectedOption.value === filteredOption.value;

              return (
                <li key={filteredOption.value}>
                  <button
                    className={getClassName(
                      s.option,
                      isSelected && s.optionSelected,
                      isFocused && s.optionFocused,
                    )}
                    type="button"
                    onClick={() => functions.onSelectOption(filteredOption)}>
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
