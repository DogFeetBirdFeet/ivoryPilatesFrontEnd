import BtnIcon from '@/components/common/buttons/BtnIcon';
import StatusBadge from '@/components/common/schedule/StatusBadge';
import imgClsLog from '@/assets/icon/white/icon_cls_log_sm.png';
import imgPlus from '@/assets/dashboard/plus.png';
import type { IScheduleItem } from '../types';

export default function ScheduleItem({ schedule }: { schedule?: IScheduleItem }) {
  // 회원명 포맷팅 (2:1 수업인 경우 (2:1) 추가)
  const formatCustomerName = (schedule: IScheduleItem): string => {
    return schedule.type === 'D' ? `${schedule.cusNm} 회원님 (2:1)` : `${schedule.cusNm} 회원님`;
  };

  return (
    <>
      {schedule ? (
        <div
          key={schedule.id}
          className="grid grid-cols-[1fr_120px_80px_100px] gap-20px items-center place-items-center"
        >
          <div className="text-black text-xl font-medium justify-self-start">{formatCustomerName(schedule)}</div>
          <div className="text-gray text-xl font-medium ">{schedule.trainerNm} 강사</div>
          <div>
            <BtnIcon type="A" icon={imgClsLog} />
          </div>
          <div>
            <StatusBadge status={schedule.status} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_120px] gap-20px items-center place-items-center">
          <div className="text-lightGray text-base">예약된 수업이 없습니다</div>
          <button className="flex items-center gap-5px bg-[#D6D4EE] text-base text-gray px-10px py-5px rounded-full">
            <img src={imgPlus} className="w-15px h-15px" />
            스케줄 추가
          </button>
        </div>
      )}
    </>
  );
}
