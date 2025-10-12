import {useEffect, useMemo, useState} from 'react';
import ScheduleItem from '@/features/Schedule/items/ScheduleItem';
import type {IInsDay, ITimeSlot} from '@/features/Schedule/type/types';

interface SectionDailyScheduleProps {
    selectedRowIndex?: string | null;
    setSelectedRowIndex?: (index: string | null) => void;
    data?: IInsDay[];
    onAddSchedule?: () => void;
}

export default function SectionDailySchedule({
                                                 selectedRowIndex: propSelectedRowIndex,
                                                 setSelectedRowIndex: propSetSelectedRowIndex,
                                                 data: data,
                                                 onAddSchedule,
                                             }: SectionDailyScheduleProps = {}) {
    // 현재 시간대만 추적 (시간이 바뀔 때만 렌더링)
    const [currentHour, setCurrentHour] = useState(new Date().getHours());

    // props가 있으면 props 사용, 없으면 내부 상태 사용
    const selectedRowIndex = propSelectedRowIndex ?? `slot-${new Date().getHours()}`;
    const setSelectedRowIndex = propSetSelectedRowIndex ?? (() => {
    });

    useEffect(() => {
        // 10초마다 시간대 체크 (시간이 바뀔 때만 상태 업데이트)
        const interval = setInterval(() => {
            const newHour = new Date().getHours();
            if (newHour !== currentHour) {
                setCurrentHour(newHour);
                setSelectedRowIndex(`slot-${newHour}`);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [currentHour, setSelectedRowIndex]);

    // 13개 타임슬롯 생성 및 데이터 매핑
    const timeSlots: ITimeSlot[] = useMemo(() => {
        const slots: ITimeSlot[] = [];

        for (let hour = 9; hour <= 21; hour++) {
            // 해당 시간의 스케줄 데이터 찾기
            const timeData = data?.filter(item =>
                item.schedTime === hour.toString()
            ) || [];

            slots.push({
                id: `slot-${hour}`,
                time: hour,
                schedule: timeData.length > 0 ? timeData : null
            });
        }

        return slots;
    }, [data]);

    const formatTime = (hour: number): string => {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;

        if (hour < 12) {
            return `오전 ${timeString}`;
        } else {
            return `오후 ${timeString}`;
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-0">
            {/* 테이블 헤더 */}
            <div className="flex-shrink-0 h-40px flex justify-between bg-ppWhite rounded-lg">
                <div className="grid grid-cols-[120px_40px_160px_160px_160px] gap-20px items-center">
                    <div className="text-ppt text-2xl font-bold text-center">시간</div>
                    <div className="text-ppt text-2xl font-bold text-center">고정</div>
                    <div className="text-ppt text-2xl font-bold text-center">회원명</div>
                    <div className="text-ppt text-2xl font-bold text-center">강사명</div>
                    <div className="text-ppt text-2xl font-bold text-center">상태</div>
                </div>
            </div>

            {/* 테이블 바디 */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="">
                    {timeSlots.map((slot) => (
                        <div
                            key={`slot_time_${slot.time}`}
                            className={`px-10px py-10px border-b border-[#d9d9d9] last:border-b-0 
                ${selectedRowIndex === slot.id && 'bg-yellow'}`}
                            onClick={() => setSelectedRowIndex(slot.id)}
                        >
                            <div className="grid grid-cols-[120px_1fr] gap-20px items-center">
                                {/* 시간 */}
                                <div className="text-gray44 text-2xl font-bold text-center">{formatTime(slot.time)}</div>

                                <div className="flex flex-col">
                                    {/* 스케줄 */}
                                    <div className="flex flex-col gap-10px">
                                        {slot.schedule ? (
                                            slot.schedule.map((schedule) => (
                                                <ScheduleItem
                                                    key={`schedule_${schedule.schedId}`}
                                                    schedule={schedule}
                                                    onAddSchedule={onAddSchedule}
                                                />
                                            ))
                                        ) : (
                                            <ScheduleItem onAddSchedule={onAddSchedule}/>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
