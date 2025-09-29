import { INPUT_BASE_CLASS } from './styleConstants';

interface IInputText {
  id: string;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
}

/**
 * 문자만 입력 가능한 Input 컴포넌트
 * 숫자와 특수문자는 입력이 제한.
 */
export default function InputText({
  id,
  value,
  className,
  placeholder,
  onChange,
  maxLength,
  disabled = false,
}: IInputText) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 문자만 허용 (한글, 영문, 공백)
    const textOnly = e.target.value.replace(/[^a-zA-Z가-힣\s]/g, '');

    if (onChange) {
      onChange(textOnly);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 숫자 키 입력 방지
    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      id={id}
      value={value}
      className={`${INPUT_BASE_CLASS} ${className || ''}`}
      placeholder={placeholder}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength={maxLength}
      disabled={disabled}
    />
  );
}
