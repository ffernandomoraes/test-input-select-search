import { useRef, useState } from 'react';

import { useOnClickOutside } from 'usehooks-ts';

import ChevronDownIcon from './Icons/Chevron';
import ClearIcon from './Icons/Clear';
import SearchIcon from './Icons/Search';

type SelectSearchOption = {
  label: string;
  value: string;
  disabled?: string;
};

type SelectSearchProps = {
  label?: React.ReactNode;
  options?: SelectSearchOption[];
};

const STATE_DELAY_TIME = 10;

export default function SelectSearch({ label, options = [] }: SelectSearchProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const handleClickOutside = () => setIsVisible(false);

  const handleClickInside = () => setIsVisible(true);

  const handleSelectOption = (value: string) => {
    setValue(value);

    setTimeout(() => {
      setIsVisible(false);
    }, STATE_DELAY_TIME);
  };

  const handleForceFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  const handleClearValue = () => setValue('');

  const handleFocusInput = () => setInputFocus(true);

  const handleBlurInput = () => setInputFocus(false);

  const filteredOptions = options.filter(option => option.label.toLowerCase().includes(value.toLowerCase()));
  const hasOptions = filteredOptions.length > 0;
  const hasLabel = !!label;

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref} className='wrapper-select-search' onClick={handleClickInside}>
      {hasLabel && (
        <label
          htmlFor='input-search'
          className={`text-md text-gray-500 block duration-100 mb-2 ${inputFocus ? 'text-gray-900' : ''}`}
        >
          {label}
        </label>
      )}

      <div
        id='wrapper-input'
        onClick={handleForceFocusInput}
        className={`flex items-center border border-gray-200 gap-3 px-5 py-3 rounded-md w-full ${
          inputFocus ? 'outline outline-blue-500' : ''
        }`}
      >
        <div className='startIcon pr-1'>
          <SearchIcon />
        </div>

        <input
          id='input-search'
          ref={inputRef}
          type='text'
          className='flex-1 outline-none text-lg'
          placeholder='Pesquise por nome'
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
          onChange={handleChangeSearch}
          value={value}
        />

        {!value && (
          <div className={`endIcon ease-in duration-100 origin-center ${isVisible ? 'rotate-180' : ''}`}>
            <ChevronDownIcon />
          </div>
        )}

        {value && (
          <div className='endIcon cursor-pointer' onClick={handleClearValue}>
            <ClearIcon />
          </div>
        )}
      </div>

      {isVisible && (
        <div id='wrapper-options' className='overflow-auto max-h-[200px] border border-gray-200 rounded-md mt-1.5'>
          {filteredOptions.map((option, key) => (
            <div
              key={key}
              className='cursor-pointer font-light hover:bg-slate-100 py-2 px-4 text-lg'
              onClick={() => handleSelectOption(option.label)}
            >
              {option.label}
            </div>
          ))}

          {!hasOptions && (
            <div className='option font-light py-4 px-6 text-sm text-center'>Nenhum resultado encontrado</div>
          )}
        </div>
      )}
    </div>
  );
}
