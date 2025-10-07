import StatusBadge from '@/common/components/schedule/StatusBadge';
import imgPlus from '@/assets/dashboard/plus.png';
import iconPix from '@/assets/icon_pix.png';
import type {IInsDay} from '@/features/Schedule/type/types';
import {SCHEDULE_STATUS} from '@/constants/schedule';
import BtnIconText from '@/common/components/buttons/BtnIconText';

interface ScheduleItemProps {
    schedule?: IInsDay;
    onAddSchedule?: () => void;
}

export default function ScheduleItem({schedule, onAddSchedule}: ScheduleItemProps) {
    // 회원명 포맷팅 (2:1 수업인 경우 (2:1) 추가)
    const formatCustomerName = (schedule: IInsDay): string => {
        return schedule.grpYn === 'Y' ? `${schedule.cusNm} 회원님 (2:1)` : `${schedule.cusNm} 회원님`;
    };

    return (
        <>
            {schedule?.schedId ? (
                <div
                    key={schedule.schedId}
                    className="grid grid-cols-[40px_160px_160px_160px] gap-20px items-center place-items-center"
                >
                    <div className="flex items-center gap-5px justify-self-start">
                        {schedule.fixYn === 'Y' ? <img src={iconPix} className="w-15px h-15px" alt={'pix'}/> : ''}
                    </div>
                    <div className="text-black text-xl text-center font-medium">{formatCustomerName(schedule)}</div>
                    <div className="text-gray text-xl text-center font-medium">{schedule.trainerNm} 강사</div>
                    <div>
                        <StatusBadge status={schedule.clsStatus as keyof typeof SCHEDULE_STATUS}/>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-[1fr_120px] gap-20px items-center place-items-center">
                    <div className="text-lightGray text-base">예약된 수업이 없습니다</div>
                    <BtnIconText
                        type="B"
                        icon={imgPlus}
                        text="스케줄 추가하기"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddSchedule?.();
                        }}
                    />
                </div>
            )}
        </>
    );
}
