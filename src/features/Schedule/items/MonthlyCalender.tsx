import {useMemo} from 'react';
import iconLeft from '@/assets/chevrons_left_one.png';
import iconRight from '@/assets/chevrons_right_one.png';

interface MonthlyCalenderProps {
    currentMonth: Date;
    setCurrentMonth: (date: Date) => void;
}

export default function MonthlyCalender({currentMonth, setCurrentMonth}: MonthlyCalenderProps) {
    const handleLeftClick = () => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() - 1);
        setCurrentMonth(newMonth);
    };

    const handleRightClick = () => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(newMonth);
    };

    const monthInfo = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        return {year, month};
    }, [currentMonth]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-center gap-[4px] h-[12px]">
                {/* 왼쪽 화살표 */}
                <button
                    className="w-[40px] h-[40px] bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp/80 transition-colors"
                    onClick={handleLeftClick}
                >
                    <img src={iconLeft} alt="이전 달" className="w-[10px] h-15px"/>
                </button>

                {/* 주차 정보 */}
                <div className="text-3xl font-bold text-ppt">
                    {monthInfo.year}.{monthInfo.month.toString().padStart(2, '0')}
                </div>

                {/* 오른쪽 화살표 */}
                <button
                    className="w-[40px] h-[40px] bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp/80 transition-colors"
                    onClick={handleRightClick}
                >
                    <img src={iconRight} alt="다음 달" className="w-[10px] h-15px"/>
                </button>
            </div>
        </div>
    )
}