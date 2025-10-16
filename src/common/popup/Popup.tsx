import imgAlarm from '@/assets/icon/yellow/icon_alarm.png';

interface IPopupProps {
  imgSrc?: string;
  titleText?: string;
  isAlert?: boolean;
  onClickConfirm: () => void;
  onClickBack?: () => void;
  children: React.ReactNode;
}

export default function Popup({ imgSrc, titleText, isAlert, onClickConfirm, onClickBack, children }: IPopupProps) {
  return (
    <div className="w-[400px] bg-white px-20px py-30px flex flex-col gap-15px rounded-default drop-shadow-2xl">
      {/* 타이틀 영역 */}
      <div className="flex gap-10px items-center">
        <img src={imgSrc || imgAlarm} className="h-30px w-30px" />
        <p className=" text-2xl font-bold leading-[35px] text-center">{titleText || '알림'}</p>
      </div>

      <hr className="border-none h-[2px] bg-[#D9D9D9]" />

      {/* 내용 영역 */}
      <div className="text-gray text-[14px] font-medium py-10px">{children}</div>

      {/* 버튼 영역 */}
      <div className="flex gap-10px justify-end">
        <button
          className={`w-110px h-30px flex gap-10px items-center justify-center rounded-[7px] text-[13px] transition-colors bg-ppp text-white hover:bg-opacity-90`}
          onClick={() => onClickConfirm()}
        >
          확인
        </button>

        {!isAlert && (
          <button
            className={`w-110px h-30px flex gap-10px items-center justify-center rounded-[7px] text-[13px] transition-colors bg-white border border-lightGray text-gray hover:bg-gray-50`}
            onClick={() => onClickBack && onClickBack()}
          >
            취소
          </button>
        )}
      </div>
    </div>
  );
}
