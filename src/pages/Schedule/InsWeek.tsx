import {useEffect, useState} from 'react';
import IconSchedule from '@/assets/icon/yellow/icon_sche.png';
import {useLayoutContext} from '@/hooks/useLayoutContext';
import WeeklyCalender from '@/features/Schedule/items/WeeklyCalender';
import type {IInsDay} from '@/features/Schedule/type/types';
import {scheduleApiWeek} from '@/services/api';

export default function InsWeek() {

    const [currentWeek, setCurrentWeek] = useState<Date>(() => new Date());
    const [data, setData] = useState<IInsDay[]>([]);
    const [, setIsLoading] = useState<boolean>(false);

    const loadScheduleData = async (param: { staDate: string, endDate: string }) => {
        setIsLoading(true);
        try {
            const response = await scheduleApiWeek.getScheduleList(param);
            setData(response?.data || []);

            console.log(response?.data);
        } catch (error) {
            console.error('데이터 로드 실패:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        console.log(currentWeek);

        // 주간의 시작일(월요일) 계산
        const currentDay = currentWeek.getDay();
        const monOffset = currentDay === 0 ? -6 : 1 - currentDay; // 일요일이면 -6, 아니면 월요일까지의 오프셋

        const staDate = new Date(currentWeek);
        staDate.setDate(currentWeek.getDate() + monOffset);

        // 주간의 종료일(일요일) 계산
        const endDate = new Date(staDate);
        endDate.setDate(staDate.getDate() + 6);

        // YYYYMMDD 형식으로 포맷
        const staDateStr = staDate.getFullYear().toString() +
            (staDate.getMonth() + 1).toString().padStart(2, '0') +
            staDate.getDate().toString().padStart(2, '0');

        const endDateStr = endDate.getFullYear().toString() +
            (endDate.getMonth() + 1).toString().padStart(2, '0') +
            endDate.getDate().toString().padStart(2, '0');

        const initialFormValues = {staDate: staDateStr, endDate: endDateStr};
        loadScheduleData(initialFormValues);

    }, [currentWeek]);
    const {setHeaderTitle, setHeaderIcon} = useLayoutContext();
    useEffect(() => {
        setHeaderTitle('강사 주간 일정');
        setHeaderIcon(IconSchedule);
    }, [setHeaderTitle, setHeaderIcon]);


    const weekDaysKr = ['월', '화', '수', '목', '금', '토', '일'];

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

    // 시간대 데이터
    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
    ];

    // 셀 렌더링 헬퍼 - 실제 API 데이터 사용
    const getCellText = (dayIdx: number, time: string) => {
        const targetDate = weekDays[dayIdx];
        const dateStr = targetDate.getFullYear().toString() +
            (targetDate.getMonth() + 1).toString().padStart(2, '0') +
            targetDate.getDate().toString().padStart(2, '0');

        // 시간 형식 변환: "14:00" -> "14" (API는 "03"처럼 0패딩일 수 있어 padStart 적용)
        const timeHour = time.split(':')[0].padStart(2, '0');

        // 해당 날짜와 시간에 맞는 스케줄 찾기
        const schedule = data.find(item =>
            item.schedDate === dateStr && item.schedTime === timeHour
        );

        if (!schedule) return '예약가능';
        const name = (schedule.cusNm ?? '').trim();
        return name.length > 0 ? name : '예약가능';
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col p-6 bg-ppLight rounded-md mb-[30px]">
                <WeeklyCalender
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                />
            </div>
            <div className="flex flex-row p-6 bg-ppWhite h-[35px]">
                {weekDaysKr.map((daysStr) => (
                    <div className="flex items-center justify-center flex-1">
                        <div className="text-2xl text-ppt">{daysStr}</div>
                    </div>
                ))}
            </div>

            {/* 일별 스케줄 */}
            <div className="mt-4 flex gap-4">
                {weekDays.map((date, dayIdx) => {
                    const isCurrentMonth = date.getMonth() === currentWeek.getMonth();
                    return (
                        <div key={dayIdx} className={`flex-1 rounded-lg border p-4 ${
                            isCurrentMonth ? 'bg-white' : 'bg-gray100'
                        }`}>
                            {/* 날짜 헤더 */}
                            <div className="text-center mb-4">
                                {(() => {
                                    const isToday = date.toDateString() === new Date().toDateString();
                                    const isTodayBadge = isCurrentMonth && isToday;
                                    return (
                                        <span
                                            className={[
                                                'inline-flex items-center justify-center font-bold text-2xl mx-auto',
                                                isTodayBadge ? 'h-[40px] w-[40px] rounded-full bg-yellow text-black' : '',
                                                !isCurrentMonth ? 'h-[40px] w-[40px] rounded-full bg-white text-grayA1' : 'text-black'
                                            ].join(' ')}
                                        >
                                            {date.getDate()}
                                        </span>
                                    );
                                })()}
                            </div>

                            {/* 시간대별 스케줄 */}
                            {isCurrentMonth && (
                                <div className="space-y-1">
                                    {timeSlots.map((time) => {
                                        const scheduleText = getCellText(dayIdx, time);
                                        console.log(scheduleText)
                                        const isBooked = scheduleText !== '예약가능';

                                        return (
                                            <div key={time}
                                                 className="flex items-center justify-between py-2 border-b-2 border-gray">
                                                <div className="text-xl font-bold text-ppt">
                                                    {time}
                                                </div>
                                                <div className="text-xl flex items-center">
                                                <span className={isBooked ? "text-black" : "text-blueBtn"}>
                                                    {scheduleText}
                                                </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}