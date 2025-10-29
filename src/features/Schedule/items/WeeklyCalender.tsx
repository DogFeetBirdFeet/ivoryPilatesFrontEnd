import { useMemo } from 'react';
import iconLeft from '@/assets/chevrons_left_one.png';
import iconRight from '@/assets/chevrons_right_one.png';

interface WeeklyCalenderProps {
  currentWeek: Date;
  setCurrentWeek: (date: Date) => void;
}

export default function WeeklyCalender({ currentWeek, setCurrentWeek }: WeeklyCalenderProps) {
  const handleLeftClick = () => {
    const newWeek = new Date(currentWeek);
    // 현재 주의 첫날(월요일)을 구해서 이전 주의 첫날(월요일)로 이동
    const currentDay = newWeek.getDay();
    const monOffset = currentDay === 0 ? -6 : 1 - currentDay; // 월요일까지의 오프셋
    newWeek.setDate(newWeek.getDate() + monOffset - 7); // 이전 주의 월요일
    setCurrentWeek(newWeek);
  };

  const handleRightClick = () => {
    const newWeek = new Date(currentWeek);
    // 현재 주의 마지막 날(일요일)을 구해서 다음 주의 첫날(월요일)로 이동
    const currentDay = newWeek.getDay();
    const sunOffset = currentDay === 0 ? 0 : 7 - currentDay; // 일요일까지의 오프셋
    newWeek.setDate(newWeek.getDate() + sunOffset + 1); // 일요일 다음날(월요일)
    setCurrentWeek(newWeek);
  };

  // 주차 정보 계산
  const weekInfo = useMemo(() => {
    const year = currentWeek.getFullYear();
    const month = currentWeek.getMonth() + 1;

    // 해당 월의 첫 번째 날
    const firstDayOfMonth = new Date(year, currentWeek.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // 현재 주가 해당 월의 몇 번째 주인지 계산
    const currentDate = currentWeek.getDate();
    const weekNumber = Math.ceil((currentDate + firstDayOfWeek) / 7);

    return {
      year,
      month,
      weekNumber,
    };
  }, [currentWeek]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-4 h-12">
        {/* 왼쪽 화살표 */}
        <button
          className="w-[40px] h-[40px] bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp/80 transition-colors"
          onClick={handleLeftClick}
        >
          <img src={iconLeft} alt="이전 주" className="w-[10px] h-[15px]" />
        </button>

        {/* 주차 정보 */}
        <div className="text-3xl font-bold text-ppt">
          {weekInfo.year}년 {weekInfo.month.toString().padStart(2, '0')}월 {weekInfo.weekNumber}주차
        </div>

        {/* 오른쪽 화살표 */}
        <button
          className="w-[40px] h-[40px] bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp/80 transition-colors"
          onClick={handleRightClick}
        >
          <img src={iconRight} alt="다음 주" className="w-[10px] h-[15px]" />
        </button>
      </div>
    </div>
  );
}
