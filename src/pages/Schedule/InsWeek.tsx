import {useEffect, useState} from 'react';
import IconSchedule from '@/assets/icon/yellow/icon_sche.png';
import {useLayoutContext} from '@/hooks/useLayoutContext';
import WeeklyCalender from '@/features/Schedule/items/WeeklyCalender';

export default function InsWeek() {

    const [currentWeek, setCurrentWeek] = useState<Date>(() => new Date());

    const {setHeaderTitle, setHeaderIcon} = useLayoutContext();
    useEffect(() => {
        setHeaderTitle('강사 주간 일정');
        setHeaderIcon(IconSchedule);
    }, [setHeaderTitle, setHeaderIcon]);

    const weekDaysKr = ['월', '화', '수', '목', '금', '토', '일'];

    // 시간대 데이터
    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
    ];

    // 샘플 스케줄 데이터
    const sampleSchedule: Record<string, Record<string, string>> = {
        '월': {
            '09:00': '원예진', '10:00': '원예진', '11:00': '예약가능', '12:00': '원예진',
            '13:00': '예약가능', '14:00': '예약가능', '15:00': '예약가능', '16:00': '원예진',
            '17:00': '예약가능', '18:00': '원예진', '19:00': '원예진', '20:00': '원예진', '21:00': '원예진'
        },
        '화': {
            '09:00': '원예진', '10:00': '원예진', '11:00': '예약가능', '12:00': '원예진',
            '13:00': '예약가능', '14:00': '예약가능', '15:00': '예약가능', '16:00': '원예진',
            '17:00': '예약가능', '18:00': '원예진', '19:00': '원예진', '20:00': '원예진', '21:00': '원예진'
        }
    };

    // 셀 렌더링 헬퍼
    const getCellText = (dayIdx: number, time: string) => {
        const dayKey = weekDaysKr[dayIdx];
        return sampleSchedule[dayKey]?.[time] ?? '';
    };
    return (
        <div className="flex flex-col">
            <div className="flex flex-col p-6 bg-ppLight rounded-md mb-[30px]">
                <WeeklyCalender
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                />
            </div>
            <div className="flex flex-row p-6 bg-ppWhite">
                {weekDaysKr.map((daysStr) => (
                    <div className="flex items-center justify-center flex-1">
                        <div className="text-2xl text-ppt">{daysStr}</div>
                    </div>
                ))}
            </div>

            <div className="mt-4 bg-white rounded-md overflow-hidden">
                {/* grid: 1열은 시간, 나머지 7열은 요일 */}
                <div className="grid grid-cols-[84px_repeat(7,minmax(0,1fr))]">
                    {/* 행 반복 */}
                    {timeSlots.map((time) => (
                        <div key={time} className="contents">
                            {/* 요일별 셀 7개 */}
                            {weekDaysKr.map((_, dayIdx) => {
                                return (
                                    <div className="border border-black">
                                        <div key={time} className="text-sm text-gray-600 text-center">{time}</div>
                                        <div
                                            key={`${time}-${dayIdx}`}
                                            className="px-3 py-3 min-h-[44px]"
                                        >
                                            <div className="text-sm text-gray-600 text-center">
                                                {getCellText(dayIdx, time)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}