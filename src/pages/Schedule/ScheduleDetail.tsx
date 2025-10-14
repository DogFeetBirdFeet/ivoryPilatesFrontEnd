import iconCalendar from '@/assets/dashboard/calender.png';
import iconExit from '@/assets/icon/icon_black_exit.png';
import CenterAndAcctInfo from '@/features/Schedule/items/CenterAndAcctInfo';
import { dateToLocal } from '@/utils/date';
import { useState } from 'react';

export default function ScheduleDetail() {
  const [selectedTime, setSelectedTime] = useState();

  return (
    <div className="h-full bg-ppbg py-30px overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {/* 헤더 */}
      <header className="flex items-center justify-between h-40px mb-20px mx-20px">
        <div className="flex items-center">
          <img src={iconCalendar} className="w-30px h-30px mr-10px" />
          <span className="text-[25px] leading-40px text-ppt font-bold">일간 일정 정보</span>
        </div>
        <button>
          <img src={iconExit} className="w-35px h-35px" />
        </button>
      </header>

      {/* 날짜 정보 */}
      <section className="grid grid-cols-[300px_auto] bg-purpleLight2 rounded-default p-20px mb-20px mx-20px">
        <div className="flex justify-center items-center text-[25px] leading-40px text-ppt font-bold">
          {dateToLocal(new Date())}
        </div>
        <div className="flex flex-col justify-center">
          <CenterAndAcctInfo date={new Date()} centerOffYn="N" holYn="N" acctOffYn="Y" offAcctNm="원예진" />
        </div>
      </section>

      {/* 스케줄 정보 */}
      <section></section>
    </div>
  );
}
