import { INPUT_BASE_CLASS } from './styleConstants';

interface IInputNumber {
  id: string;
  value: string | number;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  allowDecimal?: boolean;
}

/**
 * 숫자만 입력 가능한 Input 컴포넌트
 * allowDecimal을 true로 설정하지 않으면 정수만 입력 가능
 */
export default function InputNumber({
  id,
  value,
  className,
  placeholder,
  onChange,
  maxLength,
  disabled = false,
  allowDecimal = false,
}: IInputNumber) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let numbersOnly = e.target.value;

    if (allowDecimal) {
      // 소수점 허용: 숫자와 점(.)만 허용
      numbersOnly = numbersOnly.replace(/[^0-9.]/g, '');

      // 소수점이 여러 개 입력되는 것 방지
      const parts = numbersOnly.split('.');
      if (parts.length > 2) {
        numbersOnly = parts[0] + '.' + parts.slice(1).join('');
      }

      // 맨 앞에 점이 오는 경우 방지 (0.5는 가능하지만 .5는 방지)
      if (numbersOnly.startsWith('.')) {
        numbersOnly = numbersOnly.substring(1);
      }
    } else {
      // 정수만 허용: 숫자만 허용
      numbersOnly = numbersOnly.replace(/[^0-9]/g, '');
    }

    if (onChange) {
      onChange(numbersOnly);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 소수점 중복 입력 방지
    if (allowDecimal && e.key === '.' && (e.target as HTMLInputElement).value.includes('.')) {
      e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      inputMode={allowDecimal ? 'decimal' : 'numeric'}
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
