import { useState } from 'react';
import { INPUT_BASE_CLASS } from './styleConstants';

interface IArea {
  id: string;
  className?: string;
}

/**
 *
 * 금액(원) 형태 문자를 입력 받기 위한 input
 * @param id
 * @param className
 * @constructor
 */
export default function InputMoney({ id, className }: IArea) {
  const [amount, setAmount] = useState<string>('0');

  // 숫자에 쉼표 추가
  const formatNumber = (value: string) => {
    const number = value.replace(/[^\d]/g, ''); // 숫자만 추출
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 쉼표 추가
  };

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        className={`${INPUT_BASE_CLASS} text-end pr-25px ${className}`}
        inputMode="decimal"
        value={formatNumber(amount)}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <span className="absolute right-[10px] leading-[30px] text-lightGray">원</span>
    </div>
  );
}
