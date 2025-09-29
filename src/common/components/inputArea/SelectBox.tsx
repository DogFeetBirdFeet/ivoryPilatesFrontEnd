import { useState, useRef, useEffect } from 'react';

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
}

/**
 * SelectBox 컴포넌트
 * @param id - 고유 식별자
 * @param label - 라벨 텍스트
 * @param options - 선택 옵션 목록
 * @param className - 추가 CSS 클래스
 * @param icon - 필터 이미지 필요할 경우
 */
export default function SelectBox({ id, label, options, className, icon }: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number>(0); // 초기값 '전체'로 설정
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const displayOptions = [{ codeId: 0, dtlNm: '전체' }, ...options];

  const getDisplayValue = () => {
    return displayOptions.find((opt) => opt.codeId === selectedValue)?.dtlNm;
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
    setSelectedValue(optionItem.codeId);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-10px" ref={wrapperRef}>
      {/* 필터 이미지 */}
      {icon && <img src={icon} className="w-[16px] h-[16px] flex-shrink-0" draggable="false" alt={''} />}

      <div className="relative">
        <button
          type="button"
          id={id}
          className={`w-[250px] h-30px px-10px py-5px rounded-default bg-white border-[1px] border-gray text-base text-left focus:outline-none focus:border-yellow hover:border-yellow transition-colors ${className}`}
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
                  className={`w-full h-30px px-5px text-left text-sm text-black rounded-[5px] ${
                    selectedValue === optionItem.codeId && 'bg-ppWhite'
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
