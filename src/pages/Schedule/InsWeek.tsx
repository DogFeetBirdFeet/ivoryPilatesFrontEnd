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

    // 주간 날짜 계산
    const getWeekDays = () => {
        const days = [];
        const currentDay = currentWeek.getDay();
        const monOffset = currentDay === 0 ? -6 : 1 - currentDay;

        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeek);
            date.setDate(currentWeek.getDate() + monOffset + i);
            days.push(date);
        }
        return days;
    };

    const weekDays = getWeekDays();
    const weekDaysKr = ['월', '화', '수', '목', '금', '토', '일'];

    // 시간대 데이터
    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
    ];

    // 샘플 스케줄 데이터
    const sampleSchedule = {
        '월': {
            '09:00': '원예진',
            '10:00': '원예진',
            '11:00': '예약가능',
            '12:00': '원예진',
            '13:00': '예약가능',
            '14:00': '예약가능',
            '15:00': '예약가능',
            '16:00': '원예진',
            '17:00': '예약가능',
            '18:00': '원예진',
            '19:00': '원예진',
            '20:00': '원예진',
            '21:00': '원예진'
        },
        '화': {
            '09:00': '원예진',
            '10:00': '원예진',
            '11:00': '예약가능',
            '12:00': '원예진',
            '13:00': '예약가능',
            '14:00': '예약가능',
            '15:00': '예약가능',
            '16:00': '원예진',
            '17:00': '예약가능',
            '18:00': '원예진',
            '19:00': '원예진',
            '20:00': '원예진',
            '21:00': '원예진'
        }
    };

    // 특별한 날짜 정보
    const specialDays: Record<string, { holiday?: string; vacation?: string; centerClosed?: string }> = {
        '금': {holiday: '개천절', vacation: '원예진강사 휴가'},
        '일': {holiday: '추석연휴', centerClosed: '센터 휴무일'}
    };

    return (
        <>
            <div className="flex-1 flex flex-col bg-ppLight p-6">
                <WeeklyCalender
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                />

                {/* 주간 스케줄 그리드 */}
                <div className="flex-1 bg-white rounded-lg border border-gray-300 p-4 mt-6">
                    <div className="grid grid-cols-8 gap-1 h-full">
                        {/* 시간대 컬럼 */}
                        <div className="flex flex-col">
                            <div className="h-16 border border-gray-300"></div>
                            {timeSlots.map((time) => (
                                <div key={time}
                                     className="h-16 flex items-center justify-center text-sm text-gray-600 border border-gray-300 bg-gray-50">
                                    {time}
                                </div>
                            ))}
                        </div>

                        {/* 요일별 컬럼 */}
                        {weekDays.map((day, dayIndex) => {
                            const dayName = weekDaysKr[dayIndex];
                            const specialDay = specialDays[dayName as keyof typeof specialDays];

                            return (
                                <div key={dayIndex} className="flex flex-col">
                                    {/* 요일 헤더 */}
                                    <div className="h-16 bg-white border border-gray-300 p-2">
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-gray-800 mb-1">
                                                {dayName}
                                            </div>
                                            <div className={`text-lg font-bold ${
                                                dayIndex === 1 ? 'bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center mx-auto text-white' : ''
                                            }`}>
                                                {day.getDate()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 특별한 날짜 정보 */}
                                    {specialDay && (
                                        <div
                                            className="h-16 border border-gray-300 flex flex-col items-center justify-center text-xs p-1">
                                            {specialDay.holiday && (
                                                <div className="text-red-600 font-medium mb-1">
                                                    {specialDay.holiday}
                                                </div>
                                            )}
                                            {specialDay.vacation && (
                                                <div className="text-purple-600 text-xs">
                                                    {specialDay.vacation}
                                                </div>
                                            )}
                                            {specialDay.centerClosed && (
                                                <div className="text-gray-600 text-xs">
                                                    {specialDay.centerClosed}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* 스케줄 셀들 */}
                                    {timeSlots.map((time) => {
                                        const scheduleData = sampleSchedule[dayName as keyof typeof sampleSchedule];
                                        const schedule = scheduleData?.[time as keyof typeof scheduleData];

                                        return (
                                            <div key={time}
                                                 className="h-16 border border-gray-300 flex items-center justify-center text-xs relative">
                                                {schedule && (
                                                    <div className="flex flex-col items-center">
                                                        <span className={`px-2 py-1 rounded text-xs ${
                                                            schedule === '예약가능' ? 'text-blue-600 bg-blue-50' : 'text-gray-800'
                                                        }`}>
                                                            {schedule}
                                                        </span>
                                                        {/* 빨간 점 표시 (12:00, 16:00에만) */}
                                                        {(time === '12:00' || time === '16:00') && schedule !== '예약가능' && (
                                                            <div className="w-1 h-1 bg-red-500 rounded-full mt-1"></div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}