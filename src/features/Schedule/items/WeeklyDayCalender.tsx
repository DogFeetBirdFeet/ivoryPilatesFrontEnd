import {useMemo} from 'react';
import {WEEKDAYS_SCHEDULE_KR} from '@/constants/days';
import type {WeekDay} from '@/features/Dashboard/types';
import WeeklyDate from '@/features/Schedule/items/WeeklyDate';
import iconLeft from '@/assets/chevrons_left_one.png';
import iconRight from '@/assets/chevrons_right_one.png';

interface WeeklyCalenderProps {
    currentWeek: Date;
    setCurrentWeek: (date: Date) => void;
    curDate: number;
    setCurDate: (date: number) => void;
    selectedDayOfWeek: number;
    setSelectedDayOfWeek: (day: number) => void;
}

export default function WeeklyDayCalender({
                                              currentWeek,
                                              setCurrentWeek,
                                              curDate,
                                              setCurDate,
                                              selectedDayOfWeek,
                                              setSelectedDayOfWeek,
                                          }: WeeklyCalenderProps) {
    const handleLeftClick = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(newWeek);

        // 같은 요일의 날짜를 찾아서 선택
        const targetDate = new Date(newWeek);
        const currentDay = newWeek.getDay();
        const monOffset = currentDay === 0 ? -6 : 1 - currentDay;

        // selectedDayOfWeek를 월요일 기준 인덱스로 변환
        const scheduleIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1;
        targetDate.setDate(newWeek.getDate() + monOffset + scheduleIndex);
        setCurDate(targetDate.getDate());
    };

    const handleRightClick = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(newWeek);

        // 같은 요일의 날짜를 찾아서 선택
        const targetDate = new Date(newWeek);
        const currentDay = newWeek.getDay();
        const monOffset = currentDay === 0 ? -6 : 1 - currentDay;

        // selectedDayOfWeek를 월요일 기준 인덱스로 변환
        const scheduleIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1;
        targetDate.setDate(newWeek.getDate() + monOffset + scheduleIndex);
        setCurDate(targetDate.getDate());
    };

    // 주간 날짜 계산을 메모이제이션
    const weekDays: WeekDay[] = useMemo(() => {
        const days = [];
        const currentDay: number = currentWeek.getDay();
        // 월요일(1)부터 시작하도록 오프셋 계산
        const monOffset: number = currentDay === 0 ? -6 : 1 - currentDay;

        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeek);
            date.setDate(currentWeek.getDate() + monOffset + i);

            days.push({
                date: date.getDate(),
                day: WEEKDAYS_SCHEDULE_KR[i], // 이미 월요일부터 시작하도록 수정됨
                fullDate: date,
                isCurDate: curDate === date.getDate(),
            });
        }

        return days;
    }, [currentWeek, curDate]);

    // 선택된 인덱스 계산
    const selectedIndex: number = weekDays.findIndex((day: WeekDay) => day.isCurDate);

    // 화살표 위치 계산
    useMemo(() => {
        if (selectedIndex === -1) return '0px';

        const buttonWidth: number = 60; // WeeklyDate 버튼 너비
        const gap: number = 8; // 버튼 간 간격 (gap-2 = 8px)
        const arrowWidth: number = 20; // borderLeft(10px) + borderRight(10px)
        const leftOffset: number = 56; // 왼쪽 화살표 버튼 너비 + 패딩

        const buttonPosition = leftOffset + selectedIndex * (buttonWidth + gap);
        return `${buttonPosition + buttonWidth / 2 - arrowWidth / 2}px`;
    }, [selectedIndex]);
    return (
        <>
            {/* 주간 캘린더 */}
            <div className="flex items-center justify-center gap-[50px]">
                {/* 왼쪽 화살표 */}
                <button
                    className="w-[40px] h-[40px] bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp/80 transition-colors"
                    onClick={handleLeftClick}
                >
                    <img src={iconLeft} alt="왼쪽 화살표"/>
                </button>

                {/* 날짜 버튼들 */}
                <div className="flex gap-[30px]">
                    {weekDays.map((day: WeekDay) => (
                        <WeeklyDate
                            key={`res_${day.day}`}
                            day={day}
                            onClick={() => {
                                setCurDate(day.date);
                                setCurrentWeek(day.fullDate);
                                setSelectedDayOfWeek(day.fullDate.getDay());
                            }}
                        />
                    ))}
                </div>

                {/* 오른쪽 화살표 */}
                <button
                    className="w-10 h-10 bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp/80 transition-colors"
                    onClick={handleRightClick}
                >
                    <img src={iconRight} alt="오른쪽 화살표"/>
                </button>
            </div>
        </>
    );
}
