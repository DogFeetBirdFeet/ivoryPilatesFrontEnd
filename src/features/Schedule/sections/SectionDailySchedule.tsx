import { useMemo } from 'react';
import ScheduleItem from '@/features/Schedule/items/ScheduleItem';
import type { IInsDay, ITimeSlot } from '@/features/Schedule/type/types';

interface SectionDailyScheduleProps {
  selectedIdx: number | null;
  setSelectedIdx: (value: number | null) => void;
  data: IInsDay[];
  onAddSchedule?: () => void;
}

export default function SectionDailySchedule({
  selectedIdx,
  setSelectedIdx,
  data,
  onAddSchedule,
}: SectionDailyScheduleProps) {
  // 13개 타임슬롯 생성 및 데이터 매핑
  const timeSlots: ITimeSlot[] = useMemo(() => {
    const slots: ITimeSlot[] = [];

    for (let hour = 9; hour <= 21; hour++) {
      // 해당 시간의 스케줄 데이터 찾기
      const timeData = data.filter((item) => item.schedTime === hour.toString()) || [];

      slots.push({
        id: `slot-${hour}`,
        time: hour.toString(),
        schedule: timeData.length > 0 ? timeData : null,
      });
    }
    return slots;
  }, [data]);

  const formatTime = (hour: string): string => {
    const timeString = `${hour.padStart(2, '0')}:00`;
    return timeString;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* 테이블 헤더 */}
      <div className="flex-shrink-0 flex justify-between bg-ppWhite rounded-t-lg p-10px mx-20px">
        <div className="w-full grid grid-cols-[100px_40px_auto_130px_120px] gap-20px items-center text-ppt text-xl font-bold text-center">
          <div>시간</div>
          <div>고정</div>
          <div>회원명</div>
          <div>강사명</div>
          <div>상태</div>
        </div>
      </div>

      {/* 테이블 바디 */}
      <div className="overflow-y-auto custom-scrollbar ml-20px">
        <div>
          {timeSlots.map((slot, idx) => (
            <div
              key={`slot_time_${slot.time}`}
              className={`p-10px border-b border-[#d9d9d9] last:border-b-0
                ${selectedIdx === idx ? 'bg-yellow' : 'bg-white'}`}
              onDoubleClick={() => setSelectedIdx(selectedIdx === idx ? null : idx)}
            >
              <div className="grid grid-cols-[100px_1fr] gap-20px items-center">
                {/* 시간 */}
                <div className="text-gray text-xl font-bold text-center">{formatTime(slot.time)}</div>

                {/* 스케줄 */}
                <div className="flex flex-col gap-10px">
                  {slot.schedule ? (
                    slot.schedule.map((schedule) => <ScheduleItem key={schedule.schedId} schedule={schedule} />)
                  ) : (
                    <ScheduleItem key={`slot_${slot.time}_sch`} onAddSchedule={onAddSchedule} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
