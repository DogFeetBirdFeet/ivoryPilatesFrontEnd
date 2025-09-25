import { SCHEDULE_STATUS, SCHEDULE_TYPE } from '@/constants/schedule';
import { useEffect, useMemo, useState } from 'react';
import imgClsLog from '@/assets/icon/white/icon_cls_log_sm.png';
import imgPlus from '@/assets/dashboard/plus.png';
import BtnIcon from '@/components/common/buttons/BtnIcon';
import StatusBadge from '@/components/common/schedule/StatusBadge';

interface ITimeSlot {
  id: string;
  time: number;
  schedule: IScheduleItem[] | null;
  trainerBreak: string[] | null;
}

interface IScheduleItem {
  id: string;
  cusNm: string;
  trainerNm: string;
  status: keyof typeof SCHEDULE_STATUS; // 'SCH' | 'COM' | 'NOS'
  type: keyof typeof SCHEDULE_TYPE; // 'S' | 'D'
}

// 스케줄 Mock 데이터
const mockApiData = [
  {
    hour: 9,
    schedules: [{ id: '1', cusNm: '김혜준', trainerNm: '원예진', status: 'COM' as const, type: 'S' as const }],
  },
  {
    hour: 10,
    schedules: [{ id: '2', cusNm: '김혜준', trainerNm: '원예진', status: 'COM' as const, type: 'S' as const }],
  },
  {
    hour: 11,
    schedules: [{ id: '3', cusNm: '최호연', trainerNm: '김용진', status: 'NOS' as const, type: 'S' as const }],
  },
  {
    hour: 12,
    schedules: [{ id: '4', cusNm: '신화원', trainerNm: '원예진', status: 'SCH' as const, type: 'S' as const }],
  },
  {
    hour: 13,
    schedules: [{ id: '5', cusNm: '나큰솔', trainerNm: '원예진', status: 'SCH' as const, type: 'S' as const }],
  },
  {
    hour: 16,
    schedules: [
      { id: '6', cusNm: '신화원', trainerNm: '최호연', status: 'SCH' as const, type: 'D' as const },
      { id: '7', cusNm: '김용진', trainerNm: '최호연', status: 'SCH' as const, type: 'D' as const },
    ],
  },
  {
    hour: 17,
    schedules: [{ id: '8', cusNm: '나큰솔', trainerNm: '김혜준', status: 'SCH' as const, type: 'S' as const }],
  },
];

// 강사 휴식 Mock 데이터
const trainerBreakData = [
  { hour: 13, trainers: ['원예진'] },
  { hour: 15, trainers: ['김용진'] },
  { hour: 17, trainers: ['김혜준'] },
];

export default function DailyScheduleTable() {
  // 현재 시간대만 추적 (시간이 바뀔 때만 렌더링)
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    // 10초마다 시간대 체크 (시간이 바뀔 때만 상태 업데이트)
    const interval = setInterval(() => {
      const newHour = new Date().getHours();
      if (newHour !== currentHour) {
        setCurrentHour(newHour);
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

      // 해당 시간의 강사 휴식 찾기
      const breakData = trainerBreakData.find((item) => item.hour === hour);
      const trainerBreaks = breakData ? breakData.trainers : null;

      slots.push({
        id: `slot-${hour}`,
        time: hour,
        schedule: scheduleItems,
        trainerBreak: trainerBreaks,
      });
    }

    return slots;
  }, [currentHour]); // TODO : fetch 후 재계산 필요

  // 회원명 포맷팅 (2:1 수업인 경우 (2:1) 추가)
  const formatCustomerName = (schedule: IScheduleItem): string => {
    return schedule.type === 'D' ? `${schedule.cusNm} 회원님 (2:1)` : `${schedule.cusNm} 회원님`;
  };

  const formatTrainerBreak = (slotItem: ITimeSlot): string => {
    return slotItem.trainerBreak ? `+ ${slotItem.trainerBreak.join(', ')} 강사 휴식` : '';
  };

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
      <div className="px-10px mr-20px bg-[#E8E6F8] py-10px rounded-default flex-shrink-0">
        <div className="grid grid-cols-[120px_1fr_120px_80px_100px] gap-20px items-center">
          <div className="text-ppt text-xl font-bold text-center">시간</div>
          <div className="text-ppt text-xl font-bold text-center">회원명</div>
          <div className="text-ppt text-xl font-bold text-center">강사명</div>
          <div className="text-ppt text-xl font-bold text-center">일지</div>
          <div className="text-ppt text-xl font-bold text-center">상태</div>
        </div>
      </div>

      {/* 테이블 바디 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className={`px-10px py-10px border-b border-[#d9d9d9] last:border-b-0 
                ${currentHour === slot.time && 'bg-yellow'}`}
            >
              <div className="grid grid-cols-[120px_1fr] gap-20px items-center">
                {/* 시간 */}
                <div className="text-gray text-xl font-bold text-center">{formatTime(slot.time)}</div>

                <div className="flex flex-col">
                  {/* 스케줄 */}
                  <div className="flex flex-col gap-10px">
                    {slot.schedule ? (
                      // 스케줄 있는 경우
                      slot.schedule.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="grid grid-cols-[1fr_120px_80px_100px] gap-20px items-center place-items-center"
                        >
                          <div className="text-black text-xl font-medium justify-self-start">
                            {formatCustomerName(schedule)}
                          </div>
                          <div className="text-gray text-xl font-medium ">{schedule.trainerNm} 강사</div>
                          <div>
                            <BtnIcon type="A" icon={imgClsLog} />
                          </div>
                          <div>
                            <StatusBadge status={schedule.status} />
                          </div>
                        </div>
                      ))
                    ) : (
                      // 스케줄 없는 경우
                      <div className="grid grid-cols-[1fr_120px] gap-20px items-center place-items-center">
                        <div className="text-lightGray text-base">예약된 수업이 없습니다</div>
                        <button className="flex items-center gap-5px bg-[#D6D4EE] text-base text-gray px-10px py-5px rounded-full">
                          <img src={imgPlus} className="w-15px h-15px" />
                          스케줄 추가
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 강사 휴식 */}
                  <div className="text-red text-base">{formatTrainerBreak(slot)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
