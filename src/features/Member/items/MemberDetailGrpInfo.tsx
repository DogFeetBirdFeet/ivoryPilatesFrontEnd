import type { Dispatch, SetStateAction } from 'react';
import type { IMemberReg } from '../types';
import SearchInputCus from '@/common/components/inputArea/SearchInputCus';
import { formatBirth } from '@/utils/date';

export default function MemberDetailGrpInfo({
  data,
  setData,
  editMode,
}: {
  data: IMemberReg;
  setData: Dispatch<SetStateAction<IMemberReg>>;
  editMode: boolean;
}) {
  return (
    <section className="p-20px rounded-default bg-[#DAD6E5]">
      <div className="flex justify-between items-center mb-20px">
        <p className="text-2xl font-bold text-ppt">그룹회원 정보</p>
        <p className="text-sm text-red">
          *사용중인 수강권이 있는 회원을 추가할 경우 현재 입력된 결제수강권 정보는 초기화됩니다
        </p>
      </div>

      <div className="grid grid-cols-[150px_1fr] gap-y-20px items-center">
        <p className="text-gray text-sm font-bold">그룹회원 여부</p>
        {editMode ? (
          <div className="flex items-center">
            <input
              type="radio"
              id="groupY"
              value={'Y'}
              checked={data.grpYn === 'Y'}
              onChange={() =>
                setData((prev) => ({
                  ...prev,
                  grpYn: 'Y',
                }))
              }
              className="mr-5px"
            />
            <label htmlFor="groupY" className="mr-30px">
              Y
            </label>

            <input
              type="radio"
              id="groupN"
              value={'N'}
              checked={data.grpYn === 'N'}
              onChange={() =>
                setData((prev) => ({
                  ...prev,
                  grpYn: 'N',
                }))
              }
              className="mr-5px"
            />
            <label htmlFor="groupN">N</label>
          </div>
        ) : (
          <div>{data.grpYn}</div>
        )}

        {data.grpYn === 'Y' && (
          <>
            {/* 그룹회원 타입 */}
            <p className="text-gray text-sm font-bold">그룹회원 타입</p>
            {editMode ? (
              <div className="flex items-center">
                <input
                  type="radio"
                  id="groupTypeS"
                  value={'S'}
                  checked={data.grpType === 'S'}
                  onChange={() =>
                    setData((prev) => ({
                      ...prev,
                      grpType: 'S',
                    }))
                  }
                  className="mr-5px"
                />
                <label htmlFor="groupTypeS" className="mr-30px ">
                  수강권 공유
                </label>
                <input
                  type="radio"
                  id="groupTypeG"
                  value={'G'}
                  checked={data.grpType === 'G'}
                  onChange={() =>
                    setData((prev) => ({
                      ...prev,
                      grpType: 'G',
                    }))
                  }
                  className="mr-5px"
                />
                <label htmlFor="groupTypeG">2:1 수업</label>
              </div>
            ) : (
              <p>{data.grpType === 'S' ? '수강권 공유' : '2:1 수업'}</p>
            )}

            {/* 그룹회원 목록 */}
            <p className="text-gray text-sm font-bold">그룹회원 목록</p>
            <div className="w-[400px] flex flex-col">
              <SearchInputCus
                id="searchCusInput"
                onSearch={(data) => {
                  console.log(data);
                }}
              />
              {data.grpList &&
                data.grpList.map(({ memberId, memberName, memberBirth, memberGender }) => {
                  const text = `${memberName} (${formatBirth(memberBirth)} / ${memberGender === 'W' ? '여성' : '남성'})`;
                  return <div id={`grpMember${memberId}`}>{text}</div>;
                })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
