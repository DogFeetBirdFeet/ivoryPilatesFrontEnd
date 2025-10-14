import { useEffect, useRef, useState } from 'react';
import { INPUT_COMMON_STYLE, INPUT_DEFAULT } from './styleConstants';

interface OptionItem {
  codeId: string;
  dtlNm: string;
}

interface SelectBoxProps {
  id: string;
  options: OptionItem[];
  className?: string;
  value: string | null;
  center?: boolean;
  onChange: (value: string) => void;
}

/**
 * SelectBox 컴포넌트
 * @param id - 고유 식별자
 * @param options - 선택 옵션 목록
 * @param className - 추가 CSS 클래스
 * @param value - 화면에서 상태로 관리하고 있는 필터 값
 * @param center - option값 가운데 정렬(true 적용시 가운데)
 * @param onChange - 화면 필터 상태를 변경하는 함수
 */
export default function SelectBox({ id, options, className, value, center = false, onChange }: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const getDisplayValue = () => {
    return options.find((opt) => opt.codeId === value)?.dtlNm;
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    // 닫힐 때 포커스 제거
    if (!newState) {
      buttonRef.current?.blur();
    }
  };

  const handleSelect = (optionItem: OptionItem) => {
    setIsOpen(false);
    onChange(optionItem.codeId);
    buttonRef.current?.blur(); // 선택 후에도 포커스 제거
  };

  return (
    <div className={`flex items-center gap-10px ${className}`} ref={wrapperRef}>
      <div className="relative w-full">
        <button
          type="button"
          ref={buttonRef}
          id={id}
          className={`w-full flex items-center ${INPUT_COMMON_STYLE} ${INPUT_DEFAULT}`}
          onClick={handleToggle}
        >
          <p className={`text-black w-full ${center ? 'text-center' : 'text-left'}`}>{getDisplayValue()}</p>
          <span className="absolute inset-y-0 right-0 flex items-center pr-10px pointer-events-none">
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div
            className={`absolute z-50 mt-5px w-full bg-white border border-gray rounded-default shadow-sm${className}`}
          >
            <div className="max-h-[200px] overflow-y-auto px-5px py-[8px] custom-scrollbar">
              {options.map((optionItem, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-full h-40px px-5px text-sm text-black rounded-[5px] hover:bg-ppbg transition-colors 
                    ${center ? 'text-center' : 'text-left'}
                  ${value === optionItem.codeId && 'bg-ppWhite'}`}
                  onClick={() => handleSelect(optionItem)}
                >
                  {optionItem.dtlNm}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
