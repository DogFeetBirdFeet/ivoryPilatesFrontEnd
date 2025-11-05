import { useMemo } from 'react';
import ScheduleItem from '@/features/Schedule/items/ScheduleItem';
import type { IInsDay, ITimeSlot } from '@/features/Schedule/type/types';

interface SectionDailyScheduleProps {
  selectedIdx: number | null;
  setSelectedIdx: (value: number | null) => void;
  data: IInsDay[];
  setIsAddingSch: (value: boolean) => void;
}

export default function SectionDailySchedule({
  selectedIdx,
  setSelectedIdx,
  data,
  setIsAddingSch,
}: SectionDailyScheduleProps) {
  // 13개 타임슬롯 생성 및 데이터 매핑
  const timeSlots: ITimeSlot[] = useMemo(() => {
    const slots: ITimeSlot[] = [];

    for (let hour = 9; hour <= 21; hour++) {
      // 해당 시간의 스케줄 데이터 찾기
      const timeData = data.filter((item: IInsDay) => item.schedTime === hour.toString().padStart(2, '0')) || [];
      slots.push({
        id: `slot-${hour}`,
        time: hour.toString().padStart(2, '0'),
        schedule: timeData.length > 0 ? (timeData as IInsDay[]) : null,
      });
    }
    return slots;
  }, [data]);

  const formatTime = (hour: string): string => {
    return `${hour.padStart(2, '0')}:00`;
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
              className={`p-10px border-b border-[#d9d9d9] last:border-b-0 cursor-pointer transition-colors
                ${selectedIdx === idx ? 'bg-beige' : 'bg-white hover:bg-grayWhite'}`}
              onDoubleClick={() => {
                setSelectedIdx(selectedIdx === idx ? null : idx);
                setIsAddingSch(false);
              }}
            >
              <div className="grid grid-cols-[100px_1fr] gap-20px items-center">
                {/* 시간 */}
                <div>
                  <div className="text-gray text-xl font-bold text-center">{formatTime(slot.time)}</div>
                  <div className="text-center  text-red text-base break-words">
                    {slot.schedule?.[0]?.resAcctNm || ''}
                    {slot.schedule?.[0]?.acctResYn === 'Y' ? ' 강사 휴식' : ''}
                  </div>
                </div>

                {/* 스케줄 */}
                <div className="flex flex-col gap-10px">
                  {(() => {
                    const filteredSchedules = slot.schedule?.filter((schedule) => schedule.mstId != null) || [];
                    return (
                      <>
                        {filteredSchedules.map((schedule, scheduleIdx) => (
                          <ScheduleItem
                            key={schedule.schedId || `slot_${slot.time}_schedule_${scheduleIdx}`}
                            schedule={schedule}
                          />
                        ))}
                        {filteredSchedules.length === 0 && (
                          <ScheduleItem
                            key={`slot_${slot.time}_empty`}
                            onAddSchedule={() => {
                              setSelectedIdx(idx);
                              setIsAddingSch(true);
                            }}
                          />
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
