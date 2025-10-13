import { useRef } from 'react';
import { INPUT_COMMON_STYLE, INPUT_DEFAULT, INPUT_ERROR } from './styleConstants';

interface IInputText {
  id: string;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  error?: boolean;
}

export default function InputText({
  id,
  value,
  className,
  placeholder,
  onChange,
  maxLength,
  disabled = false,
  error = false,
}: IInputText) {
  const isComposingRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // 한글조합 중이 아닐 때만 필터링
    if (!isComposingRef.current) {
      const textOnly = inputValue.replace(/[^a-zA-Z가-힣\s]/g, '');
      onChange?.(textOnly);
    } else {
      // 조합 중에는 그대로 전달
      onChange?.(inputValue);
    }
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;

    // 한글 조합 완료 후 필터링
    const textOnly = e.currentTarget.value.replace(/[^a-zA-Z가-힣\s]/g, '');
    onChange?.(textOnly);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      id={id}
      value={value}
      className={`w-full ${className} ${INPUT_COMMON_STYLE} ${error ? INPUT_ERROR : INPUT_DEFAULT}`}
      placeholder={placeholder}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      maxLength={maxLength}
      disabled={disabled}
    />
  );
}
