import SelectBox from '@/common/components/inputArea/SelectBox';
import { formatBirth, stringToDate } from '@/utils/date';
import type { IMemberReg } from '../types';
import type { Dispatch, SetStateAction } from 'react';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import iconPlus from '@/assets/icon/purple/icon_plus.png';

interface IProps {
  data: IMemberReg;
  setData: Dispatch<SetStateAction<IMemberReg>>;
  editMode: boolean;
}

export default function MemberDetailClsInfo({ data, setData, editMode }: IProps) {
  // TODO : 현재 재직중인 강사데이터 불러오기
  const acctOption = [
    { codeId: '1', dtlNm: '원예진' },
    { codeId: '2', dtlNm: '김용진' },
    { codeId: '3', dtlNm: '나큰솔' },
  ];

  const lastClsDateCal = (tarDate: string) => {
    const target = stringToDate(tarDate);
    const current = new Date();

    // 밀리초 차이를 일(day) 단위로 변환
    const diffTime = current.getTime() - target.getTime(); // 밀리초 차이
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일수로 변환
    return `${formatBirth(tarDate)} (${diffDays}일 전)`;
  };

  const handleFixClsAdd = () => {
    // TODO 팝업 오픈 및 데이터 추가
  };

  return (
    <>
      {/* 담당 강사 */}
      <p className="text-ppt text-sm font-bold">
        담당 강사<span className="text-red">*</span>
      </p>
      <SelectBox
        id="acctId"
        className="w-200px"
        value={data.acctId}
        onChange={(newVal) => setData((prev: typeof data) => ({ ...prev, acctId: newVal }))}
        options={acctOption}
        center={true}
      />

      {/* 마지막 수강일자 */}
      <p className="text-ppt text-sm font-bold">마지막 수강일자</p>
      <p>{lastClsDateCal(data.lastClsDate)}</p>

      {/* 고정수업 */}
      <p className="text-ppt text-sm font-bold">고정 수업</p>
      <div className="flex flex-col">
        {editMode && <BtnIconText type="B" text="추가하기" icon={iconPlus} onClick={handleFixClsAdd} />}
        {data.flxClsYn === 'Y' && <div>{/* 고정수업정보 */}</div>}
      </div>
    </>
  );
}
