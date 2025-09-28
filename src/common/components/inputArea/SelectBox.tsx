import { useState, useRef, useEffect } from "react";

interface OptionItem {
    codeId: number;
    dtlNm: string;
}

interface SelectBoxProps {
    id: string;
    label: string;
    options: OptionItem[];
    value?: string;
    option?: 'N' | 'S' | 'A'; // N: 없음, S: 첫 번째 목록 값, A: 전체
    className?: string;
    icon?: string;
    onChange?: (value: string) => void;
}

/**
 * SelectBox 컴포넌트
 * @param id - 고유 식별자
 * @param label - 라벨 텍스트
 * @param options - 선택 옵션 목록
 * @param value - 현재 선택된 값
 * @param option - 전체 옵션 처리 방식 (N: 없음, S: 첫 번째 값, A: 전체)
 * @param className - 추가 CSS 클래스
 * @param icon - 이미지 필요할 경우
 * @param onChange - 값 변경 시 콜백
 */
export default function SelectBox({ 
    id, 
    label, 
    options, 
    value, 
    option = 'A', 
    className, 
    icon,
    onChange 
}: SelectBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<number | string>(value || '');
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // 전체 옵션 처리
    const getDisplayOptions = () => {
        if (option === 'N') {
            return options; // 전체 옵션 없음
        } else if (option === 'S') {
            return [options[0], ...options]; // 첫 번째 값이 전체 역할
        } else {
            return [{ codeId: 0, dtlNm: '전체' }, ...options]; // 전체 옵션 추가
        }
    };

    const displayOptions = getDisplayOptions();
    const getDisplayValue = () => {
        if (selectedValue) {
            const selectedOption = displayOptions.find(opt => opt.codeId === selectedValue);
            return selectedOption ? selectedOption.dtlNm : '';
        }
        return option === 'A' ? '전체' : displayOptions[0]?.dtlNm || '';
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
        onChange?.(optionItem.codeId.toString());
    };

    return (
        <div className={`flex items-center gap-10px ${className}`} ref={wrapperRef}>
            {icon && <img src={icon} className="w-[16px] h-[16px] flex-shrink-0" draggable="false" alt={""}/>}
            <div className="relative">
                <button
                    type="button"
                    id={id}
                    className="w-[250px] h-30px px-10px py-5px rounded-default bg-white border-[1px] border-gray text-base text-left focus:outline-none focus:border-yellow hover:border-yellow transition-colors"
                    onClick={handleToggle}
                >
                    <span className="block truncate">{label} : {getDisplayValue()}</span>
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
                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray rounded-default shadow-lg max-h-60 overflow-auto">
                        {displayOptions.map((optionItem, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-full px-10px py-8px text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                                    selectedValue === optionItem.codeId ? 'bg-ppp text-white' : 'text-gray-900'
                                }`}
                                onClick={() => handleSelect(optionItem)}
                            >
                                {optionItem.dtlNm}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}