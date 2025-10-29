import useOverlay from '@/hooks/useOverlay';
import pilatesAcct from '@/assets/pilates_acct.png';
import pilatesLogo from '@/assets/pilates_logo.png';
import iconVac from '@/assets/icon/purple/icon_vac.png';
import iconSettings from '@/assets/icon/purple/icon_setting.png';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import PopupCenterOffDaySetting from '@/common/popup/Schedule/PopupCenterOffDaySetting';
import Popup from '@/common/popup/Popup';
import PopupTrainerOffDaySetting from '@/common/popup/Schedule/PopupTrainerOffDaySetting';

interface IDailySchedule {
  date: string;
  centerOffYn: 'Y' | 'N';
  holYn: 'Y' | 'N';
  acctOffYn: 'Y' | 'N';
  offAcctNm: string;
}

export default function CenterAndAcctInfo({ date, centerOffYn, holYn, acctOffYn, offAcctNm }: IDailySchedule) {
  const overlay = useOverlay();

  // 센터 휴무 변경 버튼 클릭 이벤트
  function handleChangeCenterOffConfirm() {
    overlay.showPopup(
      <PopupCenterOffDaySetting
        centerOffYn={centerOffYn}
        date={date}
        confirmCallback={handleCenterOffConfirm}
        backCallback={handleBack}
      />
    );
  }

  // 센터 휴무 저장버튼 클릭 후 callback
  function handleCenterOffConfirm() {
    // TODO 휴무 변경 데이터 패칭
    console.log(`센터 휴무 변경`);
    overlay.closeLastPopup();

    // TODO : 예약이 있는 경우 변경 불가
    overlay.showPopup(
      <Popup isAlert={true} onClickConfirm={handleBack}>
        <div>
          <p>수업 예약이 있는 날짜는 휴가/휴무 설정을 할 수 없습니다.</p>
        </div>
      </Popup>
    );
  }

  // 휴가 설정
  function handleChangeTrainerOffDay() {
    overlay.showPopup(
      <PopupTrainerOffDaySetting initDate={date} onClickBack={handleBack} onClickConfirm={handleTrainerOffConfirm} />
    );
  }

  // 휴가설정 저장버튼 클릭 후 callback
  function handleTrainerOffConfirm(trainerId: string, offDate: string) {
    console.log(trainerId, offDate, '휴가설정');

    overlay.closeLastPopup();
  }

  // 팝업 취소버튼 클릭 후 callback
  function handleBack() {
    overlay.closeLastPopup();
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10px text-sm font-bold">
          <img src={pilatesLogo} className="w-35px h-35px" draggable="false" alt={'필라테스 로고'} />
          <p>센터</p>
          {centerOffYn === 'Y' && (
            <>
              {holYn === 'Y' && <p className="text-red">공휴일 휴무</p>}
              {holYn === 'N' && <p className="text-red">휴무일</p>}
            </>
          )}
          {centerOffYn === 'N' && <p className="text-gray">휴무일이 아닙니다</p>}
        </div>
        <BtnIconText
          type="B"
          icon={iconSettings}
          text="휴무 변경하기"
          onClick={() => {
            handleChangeCenterOffConfirm();
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10px text-sm font-bold">
          <img src={pilatesAcct} className="w-35px h-35px" draggable="false" alt={'강사 로고'} />
          <p>강사</p>
          {acctOffYn === 'Y' && <p className="text-red">{offAcctNm} 강사 휴가</p>}
          {acctOffYn === 'N' && <p className="text-gray">휴가자가 없습니다</p>}
        </div>
        <BtnIconText
          type="B"
          icon={iconVac}
          text="휴가 추가하기"
          onClick={() => {
            handleChangeTrainerOffDay();
          }}
        />
      </div>
    </>
  );
}
