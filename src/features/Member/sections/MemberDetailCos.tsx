import MemberDetailInfo from '@/features/Member/items/MemberDetailInfo';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import iconIvo from '@/assets/icon/purple/icon_ivo.png';
import iconConvert from '@/assets/icon/purple/icon_convert.png';
import iconEdit from '@/assets/icon/purple/icon_save.png';
import iconBack from '@/assets/icon/purple/icon_cancel.png';
import iconSave from '@/assets/icon/white/icon_save.png';
import { useState } from 'react';
import type { IMember } from '../types';
import InputText from '@/common/components/inputArea/InputText';

export default function MemberDetailCos({ memberData }: { memberData: IMember }) {
  const [editMode, setEditMode] = useState(false);
  const [regMode, setRegMode] = useState(false);
  const [data, setData] = useState<IMember>(memberData);

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
      <div className="flex">
        {/* 좌측 */}
        <div className="flex flex-col">
          {/* 기본정보 */}
          <MemberDetailInfo editMode={editMode} data={data} setData={setData} />

          {/* 수업정보 */}
          <div></div>

          {/* 그룹회원 정보 */}
          <div></div>
        </div>

        {/* 우측 */}
        <div className="">{/* 우측 콘텐츠 */}</div>
      </div>
    </div>
  );
}
