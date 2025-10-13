import { useEffect, useRef, useState } from 'react';

interface OptionItem {
  codeId: number;
  dtlNm: string;
}

interface SelectBoxProps {
  id: string;
  label: string;
  options: OptionItem[];
  className?: string;
  icon?: string;
  value: number;
  onChange: (value: number) => void;
  style?: React.CSSProperties;
}

/**
 * SelectBox 컴포넌트
 * @param id - 고유 식별자
 * @param label - 라벨 텍스트
 * @param options - 선택 옵션 목록
 * @param className - 추가 CSS 클래스
 * @param icon - 필터 이미지 필요할 경우
 * @param value - 화면에서 상태로 관리하고 있는 필터 값
 * @param onChange - 화면 필터 상태를 변경하는 함수
 */
export default function FilterSelectBox({
  id,
  label,
  options,
  className,
  icon,
  value,
  onChange,
  style,
}: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const displayOptions = [{ codeId: 0, dtlNm: '전체' }, ...options];

  const getDisplayValue = () => {
    return displayOptions.find((opt) => opt.codeId === value)?.dtlNm;
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
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionItem: OptionItem) => {
    setIsOpen(false);
    onChange(optionItem.codeId);
  };

  return (
    <div className="flex items-center gap-10px" ref={wrapperRef}>
      {/* 필터 이미지 */}
      {icon && <img src={icon} className="w-[16px] h-[16px] flex-shrink-0" draggable="false" alt={''} />}

      <div className="relative">
        <button
          type="button"
          id={id}
          className={`h-30px px-10px py-5px rounded-default bg-white border-[1px] border-gray text-base text-left focus:outline-none focus:border-yellow hover:border-yellow transition-colors w-full ${className}`}
          style={style}
          onClick={handleToggle}
        >
          <p className="block truncate pr-[24px] text-gray">
            <span>{label}</span>
            <span className="px-5px">:</span>
            <span className="text-black">{getDisplayValue()}</span>
          </p>
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
            className={`absolute z-50 mt-5px w-full bg-white border border-gray rounded-default shadow-sm px-5px py-[8px] ${className}`}
          >
            <div className="max-h-[320px] overflow-auto">
              {displayOptions.map((optionItem, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-full h-30px px-5px text-left text-sm text-black rounded-[5px] hover:bg-ppbg transition-colors ${
                    value === optionItem.codeId && 'bg-ppWhite'
                  }`}
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
