import { useState, useMemo } from 'react';
import weekCalendar from '@/assets/dashboard/week-calendar.png';
import check from '@/assets/dashboard/check.png';
import flag from '@/assets/dashboard/flag.png';
import { DAY_NAMES } from '@/constants/days';
import TodayDate from '../items/TodayDate';
import type { WeekDay } from '../types';
import WeeklyDate from '../items/WeeklyDate';
import useOverlay from '@/hooks/useOverlay';
import ScheduleDetail from '@/pages/Schedule/ScheduleDetail';
import { dateFormatToString } from '@/utils/date';

export default function SectionWeeklyReservation() {
  const overlay = useOverlay();
  const today = new Date();
  const [curDate, setCurDate] = useState<number>(today.getDate());

  // 주간 날짜 계산을 메모이제이션
  const weekDays: WeekDay[] = useMemo(() => {
    const days = [];
    const currentDay: number = today.getDay();
    const monOffset: number = currentDay === 0 ? -6 : 1 - currentDay;

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + monOffset + i);

      days.push({
        date: date.getDate(),
        day: DAY_NAMES[i],
        fullDate: date,
        isCurDate: curDate === date.getDate(),
      });
    }

    return days;
  }, [today, curDate]);

  // 선택된 인덱스 계산
  const selectedIndex: number = weekDays.findIndex((day: WeekDay) => day.isCurDate);

  // 화살표 위치 계산
  const arrowLeft: string = useMemo(() => {
    if (selectedIndex === -1) return '0px';

    const totalWidth: number = 440;
    const buttonWidth: number = 50;
    const arrowWidth: number = 20; // borderLeft(10px) + borderRight(10px)

    if (selectedIndex === 0) {
      return `${buttonWidth / 2 - arrowWidth / 2}px`;
    } else if (selectedIndex === 6) {
      return `${totalWidth - buttonWidth / 2 - arrowWidth / 2}px`;
    } else {
      const spaceBetween: number = (totalWidth - buttonWidth) / 6;
      return `${selectedIndex * spaceBetween + buttonWidth / 2 - arrowWidth / 2}px`;
    }
  }, [selectedIndex]);

  return (
    <div className="flex-1 flex flex-col">
      {/* 오늘 날짜 */}
      <TodayDate />

      {/* 주간 캘린더 */}
      <div className="h-110px flex justify-between py-10px mb-10px w-[440px]">
        {weekDays.map((day: WeekDay) => (
          <WeeklyDate key={`res_${day.day}`} day={day} onClick={() => setCurDate(day.date)} />
        ))}
      </div>

      {/* 화살표 */}
      <div className="relative h-15px">
        <div
          className="absolute top-0 w-0 h-0 transition-all duration-200 ease-in-out"
          style={{
            left: arrowLeft,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '15px solid #E8E6F8',
          }}
        />
      </div>

      {/* 예약 가능 시간대 정보 */}
      <div className="bg-[#E8E6F8] rounded-default py-20px px-15px mb-20px">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-30px">
            <img src={weekCalendar} className="w-70px h-70px" alt="주간 캘린더" loading="lazy" />
            <div className="font-bold text-[18px] flex flex-col justify-center">
              <div className="text-lightGray mb-5px">예약 가능한 시간대가</div>
              <div className="text-black">
                <span className="text-red">6타임</span> 있어요!
              </div>
            </div>
          </div>

          <button
            className="h-60px w-60px bg-ppp text-white rounded-full text-base font-bold 
                       flex flex-col items-center justify-center
                       hover:bg-ppp/90 active:scale-95 transition-all duration-200"
            type="button"
            onClick={() => {
              overlay.showPopup(
                <ScheduleDetail date={dateFormatToString(weekDays[selectedIndex].fullDate, false)} />,
                'sideSheet'
              );
            }}
          >
            <span>일정</span>
            <span>추가</span>
          </button>
        </div>
      </div>

      {/* 하단 통계 */}
      <div className="flex items-center gap-20px">
        {/* 수업 예정 */}
        <div className="flex-1 flex justify-center items-center gap-10px">
          <img src={check} className="w-30px h-30px" alt="수업 예정 아이콘" />
          <span className="text-gray text-xl font-semibold">수업 예정</span>
          <span className="text-ppt text-xl font-bold">7건</span>
        </div>

        {/* 수업 완료 */}
        <div className="flex-1 flex justify-center items-center gap-10px">
          <img src={flag} className="w-30px h-30px" alt="수업 완료 아이콘" />
          <span className="text-gray text-xl font-semibold">수업 완료</span>
          <span className="text-black text-xl font-bold">3건</span>
        </div>
      </div>
    </div>
  );
}
