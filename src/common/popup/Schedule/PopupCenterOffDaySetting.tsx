import { dateToLocal } from '@/utils/date';
import PopupConfirm from '../PopupConfirm';

interface IPopupProps {
  centerOffYn: 'Y' | 'N';
  date: string;
  confirmCallback: () => void;
  backCallback: () => void;
}

export default function PopupCenterOffDaySetting({ centerOffYn, date, confirmCallback, backCallback }: IPopupProps) {
  return (
    <PopupConfirm
      titleText="센터 휴무/영업 설정"
      onClickConfirm={confirmCallback}
      onClickBack={backCallback}
      confirmText="확인"
      cancelText="취소"
    >
      <div>
        <p>
          <span className="text-ppt">{dateToLocal(date)}</span>은{' '}
          <span className="text-ppt">{centerOffYn === 'Y' ? '휴무일' : '센터 영업일'}</span>입니다.
        </p>
        <p>
          <span className="text-ppt">{centerOffYn === 'Y' ? '센터 영업일' : '휴무일'}</span>로 변경하시겠습니까?
        </p>
      </div>
    </PopupConfirm>
  );
}
