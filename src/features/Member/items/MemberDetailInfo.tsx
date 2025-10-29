import InputNumber from '@/common/components/inputArea/InputNumber';
import type { IMember } from '../types';
import InputDate from '@/common/components/inputArea/InputDate';
import { dateFormatToString, formatBirth, stringToDate } from '@/utils/date';
import { MEM_TYPE } from '@/constants/member';
import SelectBox from '@/common/components/inputArea/SelectBox';
import type { Dispatch, SetStateAction } from 'react';

export default function MemberDetailInfo({
  editMode,
  data,
  setData,
}: {
  editMode: boolean;
  data: IMember;
  setData: Dispatch<SetStateAction<IMember>>;
}) {
  // 공통 핸들러 함수
  const handleChange = <K extends keyof IMember>(field: K, value: IMember[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="w-[1200px]">
      {/* 연락처/생년월일/성별/타입 */}
      <div className="grid grid-cols-4 h-80px gap-50px mb-20px">
        <div className="bg-white h-full flex flex-col px-20px py-10px rounded-default">
          <p className="text-ppt text-sm font-bold">연락처</p>
          <div className="flex-1 flex items-end text-black text-[18px] font-medium">
            {editMode ? (
              <InputNumber
                id="memberNumber"
                value={data.contact}
                onChange={(newVal) => handleChange('contact', newVal)}
              />
            ) : (
              data.contact
            )}
          </div>
        </div>
        <div className="bg-white h-full flex flex-col px-20px py-10px rounded-default">
          <p className="text-ppt text-sm font-bold">생년월일</p>
          <div className="flex-1 flex items-end text-black text-[18px] font-medium">
            {editMode ? (
              <InputDate
                id="memberBirth"
                value={stringToDate(data.birthDate)}
                onChange={(newVal) => handleChange('birthDate', dateFormatToString(newVal, false))}
              />
            ) : (
              formatBirth(data.birthDate)
            )}
          </div>
        </div>
        <div className="bg-white h-full flex flex-col px-20px py-10px rounded-default">
          <p className="text-ppt text-sm font-bold">성별</p>
          <div className="flex-1 flex items-end text-black text-[18px] font-medium">
            {editMode ? (
              <SelectBox
                className="w-full"
                id="MemberGender"
                options={[
                  { codeId: 'W', dtlNm: '여자' },
                  { codeId: 'M', dtlNm: '남자' },
                ]}
                value={data.gender}
                onChange={(newVal) => handleChange('gender', newVal)}
                center={true}
              />
            ) : (
              <span>{data.gender === 'W' ? '여자' : '남자'}</span>
            )}
          </div>
        </div>
        <div className="bg-white h-full flex flex-col px-20px py-10px rounded-default">
          <p className="text-ppt text-sm font-bold">회원구분</p>
          <div className="flex-1 flex items-end text-black text-[18px] font-medium">{`${MEM_TYPE[data.memType]}회원`}</div>
        </div>
      </div>

      {/* 기타 기본정보 */}
      <div className="flex justify-between gap-100px p-20px bg-white rounded-default">
        {/* 키/몸무게, 시술/수술내역, 지병, 메모 */}
        <div className="grid grid-cols-[150px_auto] gap-y-30px">
          <p className="text-ppt text-sm font-bold">키</p>
          <div className="text-black text-sm">{data.height} cm</div>
          <p className="text-ppt text-sm font-bold">몸무게</p>
          <div className="text-black text-sm">{data.weight} kg</div>
          <p className="text-ppt text-sm font-bold">시술 · 수술 내역</p>
          <div className="text-black text-sm">{data.surHist}</div>
          <p className="text-ppt text-sm font-bold">지병</p>
          <div className="text-black text-sm">{data.disease}</div>
          <p className="text-ppt text-sm font-bold">메모</p>
          <div className="text-black text-sm">{data.remark || <p className="text-lightGray">내역이 없습니다</p>}</div>
        </div>

        {/* 바디체킹 이미지 */}
        <div className="w-[250px]">
          <p className="text-xl text-gray font-bold mb-20px">바디체킹 이미지</p>
          <div className="w-full h-[260px] flex justify-center items-center bg-grayWhite rounded-default">
            {/* <img className="w-full h-full" /> */}
            <p className="text-sm font-bold text-lightGray">등록된 이미지가 없습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
