// import { useNavigate } from 'react-router-dom';
// import useOverlay from '@/hooks/useOverlay';
import pilatesAcct from '@/assets/pilates_acct.png';
import pilatesLogo from '@/assets/pilates_logo.png';
import iconVac from '@/assets/icon/purple/icon_vac.png';
import iconSettings from '@/assets/icon/purple/icon_setting.png';
import BtnIconText from '@/common/components/buttons/BtnIconText';
// import PopupConfirm from '@/common/popup/PopupConfirm';

interface IDailySchedule {
  date: Date;
  centerOffYn: 'Y' | 'N';
  holYn: 'Y' | 'N';
  acctOffYn: 'Y' | 'N';
  offAcctNm: string;
}

export default function CenterAndAcctInfo({ date, centerOffYn, holYn, acctOffYn, offAcctNm }: IDailySchedule) {
  //   const overlay = useOverlay();
  //   const navigate = useNavigate();

  //   function handleCenterOffConfirm() {
  //     let isSchExists = false;
  //     data?.map((item) => {
  //       if (item.schedId) {
  //         isSchExists = true;
  //       }
  //     });
  //     if (isSchExists) {
  //       overlay.showPopup(
  //         <PopupConfirm
  //           onClickConfirm={() => handleConfirm('휴무일')}
  //           onClickBack={() => ({})}
  //           isAlert={true}
  //           confirmText="확인"
  //         >
  //           <div>
  //             <p>수업 예약이 있는 날짜는 휴가/휴무 설정을 할 수 없습니다.</p>
  //           </div>
  //         </PopupConfirm>
  //       );
  //     } else {
  //       overlay.showPopup(
  //         <PopupConfirm
  //           onClickConfirm={() => handleConfirm('휴무일')}
  //           onClickBack={handleBack}
  //           confirmText="확인"
  //           cancelText="취소"
  //         >
  //           <div>
  //             <p>
  //               {data?.[0].year}년 {data?.[0].month}월 {data?.[0].day}일은 센터 영업일입니다.
  //             </p>
  //             <p>휴무일로 변경하시겠습니까?</p>
  //           </div>
  //         </PopupConfirm>
  //       );
  //     }
  //   }

  //   function handleCenterOnConfirm() {
  //     overlay.showPopup(
  //       <PopupConfirm
  //         titleText="센터 휴무/영업 설정"
  //         onClickConfirm={() => handleConfirm('영업일')}
  //         onClickBack={handleBack}
  //         confirmText="확인"
  //         cancelText="취소"
  //       >
  //         <div>
  //           <p>
  //             {data?.[0].year}년 {data?.[0].month}월 {data?.[0].day}일은 센터 후무일입니다.
  //           </p>
  //           <p>영업일일로 변경하시겠습니까?</p>
  //         </div>
  //       </PopupConfirm>
  //     );
  //   }

  //   function handleChangeCenterOffConfirm() {
  //     const holyYn = data?.[0]?.holYn;

  //     if (undefined === holyYn || holyYn === 'N') {
  //       overlay.showPopup(
  //         <PopupConfirm
  //           titleText="센터 휴무/영업 설정"
  //           onClickConfirm={handleCenterOnConfirm}
  //           onClickBack={handleBack}
  //           confirmText="확인"
  //           cancelText="취소"
  //         >
  //           <div>
  //             <p>
  //               {data?.[0].year}년 {data?.[0].month}월 {data?.[0].day}일은 센터 영업일입니다.
  //             </p>
  //             <p>휴무일로 변경하시겠습니까?</p>
  //           </div>
  //         </PopupConfirm>
  //       );
  //     }

  //     if (holyYn === 'Y') {
  //       overlay.showPopup(
  //         <PopupConfirm
  //           titleText="센터 휴무/영업 설정"
  //           onClickConfirm={handleCenterOffConfirm}
  //           onClickBack={handleBack}
  //           confirmText="확인"
  //           cancelText="취소"
  //         >
  //           <div>
  //             <p>
  //               {data?.[0].year}년 {data?.[0].month}월 {data?.[0].day}일은 공휴일입니다.
  //             </p>
  //             <p>센터 영업일로 변경하시겠습니까?</p>
  //           </div>
  //         </PopupConfirm>
  //       );
  //     }
  //   }

  //   function handleConfirm(text: string) {
  //     console.log(`센터 ${text}로 변경`);
  //     overlay.closePopup();
  //     navigate(-1);
  //   }

  //   function handleBack() {
  //     overlay.closePopup();
  //   }

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
            //   handleChangeCenterOffConfirm();
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
            console.log('강사 설정');
          }}
        />
      </div>
    </>
  );
}
