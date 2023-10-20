import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '~utils/hooks';

interface UseSelectParams {
  options: Option[];
  defaultOption?: Option;
  onSelect?: (value: Option['value']) => void;
  filterOptions: FilterOptionsFunction;
}

export const useSelect = ({
  options,
  filterOptions,
  defaultOption = options[0],
  onSelect,
}: UseSelectParams) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const [searchSelectedOption, setSearchSelectedOption] = useState({
    index: options.findIndex((option) => option.value === defaultOption.value),
    value: defaultOption.value,
  });

  const selectRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const filteredOptions = useMemo(
    () => options.filter((option) => filterOptions(option, inputValue)),
    [options, inputValue],
  );

  useEffect(
    () =>
      (() => {
        if (!filteredOptions.length) return;

        const searchOption = filteredOptions.find(
          (option) => option.value === searchSelectedOption.value,
        );

        if (!searchOption) {
          return setSearchSelectedOption({ index: 0, value: filteredOptions[0].value });
        }

        setSearchSelectedOption({
          index: filteredOptions.findIndex((option) => option.value === searchOption.value),
          value: searchOption.value,
        });
      })(),
    [filteredOptions],
  );

  useLayoutEffect(() => {
    (() => {
      if (!ulRef.current) return;

      const optionHeight = ulRef.current.scrollHeight / options.length;
      const optionOffsetTop = optionHeight * searchSelectedOption.index;

      if (optionOffsetTop < ulRef.current.scrollTop) {
        ulRef.current.scrollTop = optionOffsetTop;
        return;
      }

      if (optionOffsetTop > ulRef.current.scrollTop + ulRef.current.offsetHeight - optionHeight) {
        ulRef.current.scrollTop = optionOffsetTop - ulRef.current.offsetHeight + optionHeight;
        return;
      }
    })();
  }, [ulRef, searchSelectedOption.index, isOpen]);

  const onClose = (newSelectedOption?: Option) => {
    setIsOpen(false);

    const selectedOptionNow = newSelectedOption ?? selectedOption;

    setInputValue(selectedOptionNow.label.toString());
    setSearchSelectedOption({
      index: options.findIndex((option) => option.value === selectedOptionNow.value),
      value: selectedOptionNow.value,
    });
  };

  const onOpen = () => {
    setIsOpen(true);
    setInputValue('');
  };

  const onSelectOption = (newSelectedOption: Option) => {
    setSelectedOption(newSelectedOption);
    onClose(newSelectedOption);
    onSelect?.(newSelectedOption.value);
  };

  const onSelectKeyDown = (event: React.KeyboardEvent) => {
    const firstOptionIndex = 0;
    const lastOptionIndex = filteredOptions.length - 1;

    if (!isOpen && event.code !== 'Enter') return;

    if (event.code === 'Enter') {
      event.preventDefault();

      if (!isOpen) return onOpen();

      const newSelectedOption = filteredOptions.find(
        (option) => option.value === searchSelectedOption.value,
      )!;
      onSelectOption(newSelectedOption);
    }

    if (event.code === 'ArrowUp') {
      event.preventDefault();
      if (searchSelectedOption.index <= firstOptionIndex) {
        const lastOption = filteredOptions[lastOptionIndex];
        return setSearchSelectedOption({ index: lastOptionIndex, value: lastOption.value });
      }

      const upperIndex = searchSelectedOption.index - 1;
      const upperOption = filteredOptions[upperIndex];

      return setSearchSelectedOption({
        index: upperIndex,
        value: upperOption.value,
      });
    }

    if (event.code === 'ArrowDown') {
      event.preventDefault();
      if (searchSelectedOption.index >= lastOptionIndex) {
        const firstOption = filteredOptions[firstOptionIndex];
        return setSearchSelectedOption({ index: firstOptionIndex, value: firstOption.value });
      }

      const lowerIndex = searchSelectedOption.index + 1;
      const lowerOption = filteredOptions[lowerIndex];

      return setSearchSelectedOption({
        index: lowerIndex,
        value: lowerOption.value,
      });
    }
  };

  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setInputValue(event.target.value);
  };

  const onSelectClick = () => {
    if (isOpen) return;
    onOpen();
  };

  useOnClickOutside(selectRef, () => onClose());

  return {
    state: {
      inputValue,
      selectedOption,
      isOpen,
      searchSelectedOption,
      filteredOptions,
    },
    refs: {
      selectRef,
      ulRef,
    },
    functions: {
      onClose,
      onOpen,
      onSelectOption,
      onSelectKeyDown,
      onInputValueChange,
      onSelectClick,
    },
  };
};
