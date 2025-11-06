import { useMemo } from 'react';
import iconLeft from '@/assets/chevrons_left_one.png';
import iconRight from '@/assets/chevrons_right_one.png';

interface WeeklyCalenderProps {
  currentWeek: Date;
  setCurrentWeek: (date: Date) => void;
}

export default function WeeklyCalender({ currentWeek, setCurrentWeek }: WeeklyCalenderProps) {
  function getMonday(date: Date) {
    const d = new Date(date);
    // normalize time to local midnight to avoid TZ/daylight issues
    d.setHours(0, 0, 0, 0);
    const day = d.getDay(); // 0..6 (Sun..Sat)
    const monOffset = day === 0 ? -6 : 1 - day; // Sunday->-6, Monday->0, Tue->-1 ...
    d.setDate(d.getDate() + monOffset);
    return d;
  }
  const handleLeftClick = () => {
    const thisMonday = getMonday(currentWeek);

    // 이번 주의 7일을 만든다 (Mon ~ Sun)
    const weekDays = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(thisMonday);
      d.setDate(thisMonday.getDate() + i);
      d.setHours(0, 0, 0, 0);
      return d;
    });

    // 이 주에 '말일(last day of month)'이 포함되어 있는지 확인
    const lastOfMonthInWeek = weekDays.find(() => {
      const daysInMonth = new Date(currentWeek.getFullYear(), currentWeek.getMonth() + 1, 0).getDate();
      return currentWeek.getDate() === daysInMonth;
    });

    if (lastOfMonthInWeek) {
      // 말일이 있으면 그 말일을 currentWeek로 설정 -> same week 유지, "현재달"을 이전달로 바꿈
      setCurrentWeek(lastOfMonthInWeek);
      return;
    }

    // 아니면 기존 동작: 이전 주 월요일로 이동
    const prevMonday = new Date(thisMonday);
    prevMonday.setDate(thisMonday.getDate() - 7);
    setCurrentWeek(prevMonday);
  };
  const handleRightClick = () => {
    const thisMonday = getMonday(currentWeek);

    // 이번 주의 7일을 만든다 (Mon ~ Sun)
    const weekDays = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(thisMonday);
      d.setDate(thisMonday.getDate() + i);
      d.setHours(0, 0, 0, 0);
      return d;
    });

    // 이 주에 '1일'이 포함되어 있는지 확인(다음달 1일일 가능성)
    const firstOfMonthInWeek = weekDays.find((d) => d.getDate() === 1);

    if (firstOfMonthInWeek && weekInfo.weekNumber != 1) {
      // 1일이 있으면 그 1일을 currentWeek로 설정 -> same week를 유지하면서 "현재달"을 다음달로 바꿈
      setCurrentWeek(firstOfMonthInWeek);
      return;
    }

    // 아니면 기존 동작: 다음 주 월요일로 이동
    const nextMonday = new Date(thisMonday);
    nextMonday.setDate(thisMonday.getDate() + 7);
    setCurrentWeek(nextMonday);
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
      <div className="flex items-center justify-center gap-[50px] h-[12px]">
        {/* 왼쪽 화살표 */}
        <button
          className="w-[40px] h-[40px] bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp transition-colors"
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
          className="w-[40px] h-[40px] bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp transition-colors"
          onClick={handleRightClick}
        >
          <img src={iconRight} alt="다음 주" className="w-[10px] h-[15px]" />
        </button>
      </div>
    </div>
  );
}
