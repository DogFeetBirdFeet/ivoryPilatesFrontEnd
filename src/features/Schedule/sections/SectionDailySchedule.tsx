import {useEffect, useMemo, useState} from 'react';
import ScheduleItem from '@/features/Schedule/items/ScheduleItem';
import type {ITimeSlot} from '@/features/Schedule/types';

interface SectionDailyScheduleProps {
    selectedRowIndex?: string | null;
    setSelectedRowIndex?: (index: string | null) => void;
}

// 스케줄 Mock 데이터
const mockApiData = [
    {
        hour: 9,
        schedules: [{id: '1', pix: true, cusNm: '김혜준', trainerNm: '원예진', status: 'COM' as const, type: 'S' as const}],
    },
    {
        hour: 10,
        schedules: [{id: '2', pix: true, cusNm: '김혜준', trainerNm: '원예진', status: 'COM' as const, type: 'S' as const}],
    },
    {
        hour: 11,
        schedules: [{id: '3', pix: false, cusNm: '최호연', trainerNm: '김용진', status: 'NOS' as const, type: 'S' as const}],
    },
    {
        hour: 12,
        schedules: [{id: '4', pix: true, cusNm: '신화원', trainerNm: '원예진', status: 'SCH' as const, type: 'S' as const}],
    },
    {
        hour: 13,
        schedules: [{id: '5', pix: false, cusNm: '나큰솔', trainerNm: '원예진', status: 'SCH' as const, type: 'S' as const}],
    },
    {
        hour: 16,
        schedules: [
            {id: '6', pix: true, cusNm: '신화원', trainerNm: '최호연', status: 'SCH' as const, type: 'D' as const},
            {id: '7', pix: true, cusNm: '김용진', trainerNm: '최호연', status: 'SCH' as const, type: 'D' as const},
        ],
    },
    {
        hour: 17,
        schedules: [{id: '8', pix: false, cusNm: '나큰솔', trainerNm: '김혜준', status: 'SCH' as const, type: 'S' as const}],
    },
];

export default function SectionDailySchedule({
                                                 selectedRowIndex: propSelectedRowIndex,
                                                 setSelectedRowIndex: propSetSelectedRowIndex
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
    }, [currentHour]);

    // 13개 타임슬롯 생성 및 데이터 매핑
    const timeSlots: ITimeSlot[] = useMemo(() => {
        const slots: ITimeSlot[] = [];

        for (let hour = 9; hour <= 21; hour++) {
            // 해당 시간의 스케줄 데이터 찾기
            const scheduleData = mockApiData.find((item) => item.hour === hour);
            const scheduleItems = scheduleData ? scheduleData.schedules : null;

            slots.push({
                id: `slot-${hour}`,
                time: hour,
                schedule: scheduleItems
            });
        }

        return slots;
    }, [currentHour]); // TODO : fetch 후 재계산 필요

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
            <div className="flex-shrink-0 h-40px flex justify-between bg-ppLight">
                <div className="grid grid-cols-[120px_40px_160px_160px_160px] gap-20px items-center">
                    <div className="text-ppt text-xl font-bold text-center">시간</div>
                    <div className="text-ppt text-xl font-bold text-center">고정</div>
                    <div className="text-ppt text-xl font-bold text-center">회원명</div>
                    <div className="text-ppt text-xl font-bold text-center">강사명</div>
                    <div className="text-ppt text-xl font-bold text-center">상태</div>
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
                                <div className="text-gray text-xl font-bold text-center">{formatTime(slot.time)}</div>

                                <div className="flex flex-col">
                                    {/* 스케줄 */}
                                    <div className="flex flex-col gap-10px">
                                        {slot.schedule ? (
                                            slot.schedule.map((schedule) => (
                                                <ScheduleItem key={`schedule_${schedule.id}`} schedule={schedule}/>
                                            ))
                                        ) : (
                                            <ScheduleItem/>
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
