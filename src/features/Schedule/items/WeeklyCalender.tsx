import { useMemo } from 'react';
import iconLeft from '@/assets/chevrons_left_one.png';
import iconRight from '@/assets/chevrons_right_one.png';

interface WeeklyCalenderProps {
    currentWeek: Date;
    setCurrentWeek: (date: Date) => void;
}

export default function WeeklyCalender({
    currentWeek,
    setCurrentWeek,
}: WeeklyCalenderProps) {
    const handleLeftClick = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(newWeek);
    };

    const handleRightClick = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(currentWeek.getDate() + 7);
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
            weekNumber
        };
    }, [currentWeek]);

    return (
        <div className="bg-ppbg rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-center gap-4 h-12">
                {/* 왼쪽 화살표 */}
                <button
                    className="w-10 h-10 bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp/80 transition-colors"
                    onClick={handleLeftClick}
                >
                    <img src={iconLeft} alt="이전 주" className="w-4 h-4" />
                </button>

                {/* 주차 정보 */}
                <div className="text-lg font-medium text-gray">
                    {weekInfo.year}년 {weekInfo.month}월 {weekInfo.weekNumber}주차
                </div>

                {/* 오른쪽 화살표 */}
                <button
                    className="w-10 h-10 bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp/80 transition-colors"
                    onClick={handleRightClick}
                >
                    <img src={iconRight} alt="다음 주" className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}