import StatusBadge from '@/common/components/schedule/StatusBadge';
import imgPlus from '@/assets/dashboard/plus.png';
import iconPix from '@/assets/icon_pix.png';
import type { IInsDay } from '@/features/Schedule/type/types';
import { SCHEDULE_STATUS } from '@/constants/schedule';

interface ScheduleItemProps {
  schedule?: IInsDay;
  onAddSchedule?: () => void;
}

export default function ScheduleItem({ schedule, onAddSchedule }: ScheduleItemProps) {
  // 회원명 포맷팅 (2:1 수업인 경우 (2:1) 추가)
  const formatCustomerName = (schedule: IInsDay): string => {
    return schedule.grpType === 'D' ? `${schedule.cusNm} 회원님 (2:1)` : `${schedule.cusNm} 회원님`;
  };

  return (
    <>
      {schedule ? (
        <div
          key={schedule.schedId}
          className="h-35px grid grid-cols-[40px_auto_130px_120px] gap-20px items-center place-items-center"
        >
          <div className="flex items-center gap-5px justify-center">
            {schedule.fixYn === 'Y' ? <img src={iconPix} className="w-15px h-15px" alt={'pix'} /> : ''}
          </div>
          <div className="text-black text-xl font-medium justify-self-start">{formatCustomerName(schedule)}</div>
          <div className="text-gray text-xl font-medium">{schedule.trainerNm} 강사</div>
          <div>
            <StatusBadge status={schedule.clsStatus as keyof typeof SCHEDULE_STATUS} />
          </div>
        </div>
      ) : (
        <div className="h-35px grid grid-cols-[auto_130px] gap-20px items-center place-items-center">
          <div className="text-lightGray text-base">예약된 수업이 없습니다</div>
          <button
            className="flex items-center gap-5px bg-[#D6D4EE] text-base text-gray px-10px py-5px rounded-full"
            onClick={onAddSchedule}
          >
            <img src={imgPlus} className="w-15px h-15px" />
            스케줄 추가
          </button>
        </div>
      )}
    </>
  );
}
