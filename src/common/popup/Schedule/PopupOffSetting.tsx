import InputDate from '@/common/components/inputArea/InputDate';
import PopupConfirm from '../PopupConfirm';
import { useState } from 'react';
import SelectBox from '@/common/components/inputArea/SelectBox';
import iconTitle from '@/assets/icon/yellow/icon_sche.png';
import iconSave from '@/assets/icon/white/icon_save.png';
import iconBack from '@/assets/icon/purple/icon_cancel.png';

const mockData = [
  { codeId: '0', dtlNm: '원예진 강사' },
  { codeId: '1', dtlNm: '나큰솔 강사' },
  { codeId: '2', dtlNm: '김용진 강사' },
];

export default function PopupOffSetting({
  onClickBack,
  onClickConfirm,
}: {
  onClickBack: () => void;
  onClickConfirm: () => void;
}) {
  const [trainer, setTrainer] = useState<string | null>(mockData[0].codeId);
  const [offDay, setOffDay] = useState<Date | null>(new Date());

  return (
    <PopupConfirm
      imgSrc={iconTitle}
      titleText="휴가 설정"
      onClickBack={onClickBack}
      onClickConfirm={onClickConfirm}
      confirmText="저장하기"
      cancelText="취소하기"
      imgSrcConfirm={iconSave}
      imgSrcCancel={iconBack}
    >
      <p className="mb-10px">휴가를 설정할 강사와 날짜를 선택해주세요</p>
      <div className="grid grid-cols-2 gap-10px">
        <SelectBox
          id="trainerSel"
          options={mockData}
          value={trainer}
          onChange={(value) => setTrainer(value)}
          center={true}
        />
        <InputDate id="offDayDate" value={offDay} onChange={(value) => setOffDay(value)} />
      </div>
    </PopupConfirm>
  );
}
