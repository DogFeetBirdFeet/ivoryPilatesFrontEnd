import { WEEKDAYS_KR } from '@/constants/days';
import { useMemo } from 'react';

export default function TodayDate() {
  const today = new Date();

  // 날짜 포맷팅
  const formattedDate: string = useMemo(() => {
    const year: number = today.getFullYear();
    const month: string = String(today.getMonth() + 1).padStart(2, '0');
    const day: string = String(today.getDate()).padStart(2, '0');
    const weekday: string = WEEKDAYS_KR[today.getDay()];

    return `${year}.${month}.${day} ${weekday}요일`;
  }, [today]);

  return (
    <div className="text-gray text-[18px] font-bold mb-20px">
      <span className="text-ppt">오늘은 </span>
      {formattedDate}
    </div>
  );
}
