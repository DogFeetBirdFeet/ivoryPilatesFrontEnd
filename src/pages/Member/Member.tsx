import { useLayoutContext } from '@/hooks/useLayoutContext';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import InputText from '@/common/components/inputArea/InputText';
import BtnSearch from '@/common/components/buttons/BtnSearch';

export default function Member() {
  const [curTab, setCurTab] = useState(1);

  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('회원 조회');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  const tabList = [
    { text: '전체', route: '/all' },
    { text: '등록 회원', route: '/active' },
    { text: '상담 회원', route: '/cons' },
    { text: '휴면 회원', route: '/inactive' },
    { text: '탈퇴 회원', route: '/quit' },
  ];

  return (
    <div className="h-full">
      <h1 className="h-50px text-[25px] text-gray font-bold">등록회원 (50)</h1>
      <div className="flex h-40px">
        {tabList.map((item, idx) => (
          <div
            key={`tab_${idx}`}
            className={`w-120px text-xl text-lightGray font-bold flex justify-center items-center cursor-pointer border-b-2 ${
              curTab === idx ? 'border-yellow' : 'border-lightGray'
            }`}
            onClick={() => setCurTab(idx)}
          >
            {item.text}
          </div>
        ))}
        <div className="flex-1 border-b-2 border-lightGray" />
        <div>
          <Outlet />
        </div>
      </div>

      {/* 서치바 */}
      <section className="flex p-20px gap-30px font-medium text-xl text-black bg-ppLight rounded-default mt-10px">
        <div className="flex-1 flex justify-between">
          <div className="flex w-[220px] gap-20px">
            <label htmlFor="name" className="flex-shrink-0 ">
              이름
            </label>
            <InputText id="name" className="flex-1" />
          </div>

          <div className="flex w-[220px] gap-20px">
            <label htmlFor="phoneNumber" className="flex-shrink-0 ">
              연락처
            </label>
            <InputText id="phoneNumber" className="flex-1" />
          </div>

          <div className="flex w-[280px]">
            <label htmlFor="cnt" className="mr-20px flex-shrink-0">
              잔여 회차
            </label>
            <InputText id="cnt" className="flex-1" />
            <span className="flex-shrink-0 ml-10px">회 미만</span>
          </div>

          <div className="flex gap-20px w-[420px]">
            <label htmlFor="date" className="flex-shrink-0 ">
              최근 수강 일자
            </label>
            <InputText id="date" className="flex-1" />
          </div>
        </div>

        <BtnSearch />
      </section>
    </div>
  );
}
