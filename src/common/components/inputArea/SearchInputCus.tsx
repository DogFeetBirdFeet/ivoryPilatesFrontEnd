import { INPUT_COMMON_STYLE, INPUT_DEFAULT, INPUT_ERROR } from './styleConstants';
import iconSearch from '@/assets/icon/icon_black_search.png';
import useOverlay from '@/hooks/useOverlay';
import PopupSearchMem from '@/common/popup/PopupSearchMem';
import type { SCHEDULE_TYPE } from '@/constants/schedule';

interface IMemberData {
  memberId: string;
  memberName: string;
  contact: string;
  gender: string;
  isGroup: boolean;
  grpType: keyof typeof SCHEDULE_TYPE | null;
  groupMem: string;
}

interface IInputText {
  id: string;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  onSearch: (data: IMemberData) => void;
  maxLength?: number;
  disabled?: boolean;
  error?: boolean;
}

export default function SearchInputCus({
  id,
  value,
  className,
  placeholder,
  onChange,
  onSearch,
  disabled = false,
  error = false,
}: IInputText) {
  const overlay = useOverlay();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange?.(inputValue);
  };

  const handleSearch = () => {
    // TODO : 회원명으로 검색 fetch -> 데이터 1개일때 자동세팅 추가 필요

    // 팝업 오픈 후, 팝업에서 선택한 데이터 세팅
    overlay.showPopup(
      <PopupSearchMem
        initNameValue={value}
        onDoubleClick={(data) => {
          onSearch(data);
          overlay.closePopup();
        }}
      />
    );
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        id={id}
        value={value}
        className={`w-full ${className} ${INPUT_COMMON_STYLE} ${error ? INPUT_ERROR : INPUT_DEFAULT}`}
        placeholder={placeholder ? placeholder : '회원명을 입력해주세요'}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button className="absolute top-[5px] right-[10px]" onClick={handleOnClick}>
        <img src={iconSearch} className=" w-20px h-20px" />
      </button>
    </div>
  );
}
