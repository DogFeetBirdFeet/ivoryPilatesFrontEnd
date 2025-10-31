import MemberDetailInfo from '@/features/Member/items/MemberDetailInfo';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import iconIvo from '@/assets/icon/purple/icon_ivo.png';
import iconConvert from '@/assets/icon/purple/icon_convert.png';
import iconEdit from '@/assets/icon/purple/icon_save.png';
import iconBack from '@/assets/icon/purple/icon_cancel.png';
import iconSave from '@/assets/icon/white/icon_save.png';
import { useState } from 'react';
import { type IMemberReg, type IMemberCos } from '../types';
import InputText from '@/common/components/inputArea/InputText';
import { dateFormatToString, formatBirth, stringToDate } from '@/utils/date';
import InputDate from '@/common/components/inputArea/InputDate';
import MemberDetailClsInfo from '../items/MemberDetailClsInfo';
import MemberDetailGrpInfo from '../items/MemberDetailGrpInfo';

export default function MemberDetailCos({ memberData }: { memberData: IMemberCos }) {
  const [editMode, setEditMode] = useState(false);
  const [regMode, setRegMode] = useState(false);
  const [data, setData] = useState<IMemberCos>(memberData);
  const [regData, setRegData] = useState<IMemberReg>({
    ...memberData,
    lastClsDate: memberData.consDate,
    acctId: '1',
    flxClsYn: 'N',
    grpYn: 'N',
  });

  return (
    <div className="flex flex-col">
      {/* 헤더 이름 & 버튼 - 상단 영역 */}
      <div className="flex items-center mb-20px">
        <img src={iconIvo} className="w-60px h-60px mr-20px" alt="User Icon" />
        <div className="flex items-center whitespace-nowrap">
          {editMode ? (
            <InputText
              id="memberName"
              value={data.name}
              onChange={(newVal) => setData((prev) => ({ ...prev, name: newVal }))}
              className="h-full mr-10px"
            />
          ) : (
            <span className="text-3xl text-ppt font-bold mr-10px">{data.name}</span>
          )}
          <span className="text-3xl text-ppt font-bold">회원님</span>
        </div>
        {/* 버튼 */}
        <div className="ml-auto flex gap-10px">
          {editMode || regMode ? (
            <>
              <BtnIconText
                type="B"
                icon={iconBack}
                text="취소하기"
                onClick={() => {
                  setEditMode(false);
                  setRegMode(false);
                }}
              />
              <BtnIconText
                type="A"
                icon={iconSave}
                text="저장하기"
                onClick={() => {
                  setEditMode(false);
                  setRegMode(false);
                }}
              />
            </>
          ) : (
            <>
              <BtnIconText
                type="B"
                icon={iconConvert}
                text="등록회원으로 전환하기"
                onClick={() => {
                  setRegMode(true);
                }}
              />
              <BtnIconText
                type="B"
                icon={iconEdit}
                text="회원정보 수정하기"
                onClick={() => {
                  setEditMode(true);
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* 좌우 분리 영역 */}
      <div className="flex gap-30px">
        {/* 좌측 */}
        <div className="flex flex-col gap-20px">
          {/* 기본정보 */}
          <MemberDetailInfo editMode={editMode} data={data} setData={setData} />

          {/* 수업정보 */}
          <section className="grid grid-cols-[150px_1fr] gap-y-20px items-center p-20px bg-white rounded-default">
            {regMode ? (
              <>
                <MemberDetailClsInfo data={regData} setData={setRegData} editMode={true} />
              </>
            ) : editMode ? (
              <>
                <p className="text-ppt text-sm font-bold">
                  상담 일자<span className="text-red">*</span>
                </p>
                <InputDate
                  id="consDateInput"
                  value={stringToDate(data.consDate)}
                  className="w-200px"
                  onChange={(newVal) => setData((prev) => ({ ...prev, consDate: dateFormatToString(newVal, false) }))}
                />
              </>
            ) : (
              <>
                <p className="text-ppt text-sm font-bold">상담 일자</p>
                <p>{formatBirth(data.consDate)}</p>
              </>
            )}
          </section>

          {/* 그룹회원 정보 */}
          {regMode && <MemberDetailGrpInfo data={regData} setData={setRegData} editMode={true} />}
        </div>

        {/* 우측 */}
        {regMode && (
          <div className="flex flex-col w-[350px]">
            <p className="text-2xl font-bold text-ppt">수강권 등록</p>
          </div>
        )}
      </div>
    </div>
  );
}
