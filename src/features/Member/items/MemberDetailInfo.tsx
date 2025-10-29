import InputNumber from '@/common/components/inputArea/InputNumber';
import type { IMember } from '../types';
import InputDate from '@/common/components/inputArea/InputDate';
import { dateFormatToString, formatBirth, stringToDate } from '@/utils/date';
import { MEM_TYPE } from '@/constants/member';
import SelectBox from '@/common/components/inputArea/SelectBox';
import type { Dispatch, SetStateAction } from 'react';
import Textarea from '@/common/components/inputArea/Textarea';
import BodyCheckImg from './BodyCheckImg';

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

  const primary = () => <span className="text-red">*</span>;

  // 바디체킹 이미지 업로드 이벤트
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange('bodyImg', file);

      // // 이미지 미리보기
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   handleChange('bodyImg', reader.result as string);
      //   // setImagePreview(reader.result as string);
      // };
      // reader.readAsDataURL(file);
    }
  };

  return (
    <section className="w-[1200px]">
      {/* 연락처/생년월일/성별/타입 */}
      <div className="grid grid-cols-4 h-80px gap-50px mb-20px">
        <div className="bg-white h-full flex flex-col px-20px py-10px rounded-default">
          <p className="text-ppt text-sm font-bold">연락처{editMode && primary()}</p>
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
          <p className="text-ppt text-sm font-bold">생년월일{editMode && primary()}</p>
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
          <p className="text-ppt text-sm font-bold">성별{editMode && primary()}</p>
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
        <div className="flex-1 grid grid-cols-[150px_1fr] gap-y-30px">
          {/* 키 */}
          <p className="text-ppt text-sm font-bold">키{editMode && primary()}</p>
          <div className="text-black text-sm">
            {editMode ? (
              <InputNumber
                id="heightInput"
                value={data.height}
                allowDecimal={true}
                textSort="end"
                suffix="cm"
                onChange={(val) => handleChange('height', val)}
              />
            ) : (
              <span>{data.height} cm</span>
            )}
          </div>

          {/* 몸무게 */}
          <p className="text-ppt text-sm font-bold">몸무게{editMode && primary()}</p>
          <div className="text-black text-sm">
            {editMode ? (
              <InputNumber
                id="weightInput"
                value={data.weight}
                allowDecimal={true}
                textSort="end"
                suffix="kg"
                onChange={(val) => handleChange('weight', val)}
              />
            ) : (
              <span>{data.weight} kg</span>
            )}
          </div>

          {/* 시술 · 수술 내역 */}
          <p className="text-ppt text-sm font-bold">시술 · 수술 내역</p>
          <div className="text-black text-sm">
            {editMode ? (
              <Textarea
                id="surHistTextarea"
                value={data.surHist || ''}
                className="h-100px"
                onChange={(newVal) => handleChange('surHist', newVal)}
              />
            ) : (
              data.surHist || <p className="text-lightGray">내역이 없습니다</p>
            )}
          </div>

          {/* 지병 */}
          <p className="text-ppt text-sm font-bold">지병</p>
          <div className="text-black text-sm">
            {editMode ? (
              <Textarea
                id="diseaseTextarea"
                value={data.disease || ''}
                className="h-100px"
                onChange={(newVal) => handleChange('disease', newVal)}
              />
            ) : (
              data.disease || <p className="text-lightGray">내역이 없습니다</p>
            )}
          </div>

          {/* 메모 */}
          <p className="text-ppt text-sm font-bold">메모</p>
          <div className="text-black text-sm">
            {editMode ? (
              <Textarea
                id="remarkTextarea"
                value={data.remark || ''}
                className="h-100px"
                onChange={(newVal) => handleChange('remark', newVal)}
              />
            ) : (
              data.remark || <p className="text-lightGray">내역이 없습니다</p>
            )}
          </div>
        </div>

        {/* 바디체킹 이미지 */}
        <div className="w-[250px]">
          <p className="text-xl text-gray font-bold mb-20px">바디체킹 이미지</p>
          <BodyCheckImg image={data.bodyImg} onImageChange={handleImageUpload} editMode={editMode} />
        </div>
      </div>
    </section>
  );
}
