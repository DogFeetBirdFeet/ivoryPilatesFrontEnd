import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import dashboardIcon from '@/assets/icon/yellow/icon_dashboard.png';
import dayoffIcon from '@/assets/dashboard/dayoff.png';
import calenderIcon from '@/assets/dashboard/calender.png';
import reservationIcon from '@/assets/dashboard/reservation.png';
import SectionTitle from '@/components/features/Dashboard/SectionTitle';
import DayOff from '@/components/features/Dashboard/DayOff';

type HeaderContext = {
  setHeaderTitle: (title: string) => void;
  setHeaderIcon: (icon: string | null) => void;
};

export default function Dashboard() {
  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useOutletContext<HeaderContext>();

  useEffect(() => {
    setHeaderTitle('홈 대시보드');
    setHeaderIcon(dashboardIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  return (
    <div className="h-full grid grid-cols-[1fr_500px] gap-30px">
      <section className="h-full min-w-[1050px] overflow-y-auto bg-[#FCFBFF] rounded-default">
        <SectionTitle icon={calenderIcon} title="일간 일정 정보" />
      </section>

      {/* 휴일/예약정보 */}
      <div className="h-full w-[500px] flex flex-col gap-30px">
        {/* 휴일 정보 섹션 */}
        <section className="h-[330px] bg-[#FCFBFF] flex flex-col rounded-default">
          <SectionTitle icon={dayoffIcon} title="휴일 정보" />

          <div className="flex-1 overflow-y-auto pl-30px pr-[18px] mb-30px custom-scrollbar">
            <div className="flex flex-col gap-10px pb-10px">
              <DayOff type={'B'} dayOffInfo={{ day: '2025-08-04 (월)', content: '원예진 강사 휴가' }} />
              <DayOff type={'A'} dayOffInfo={{ day: '2025-08-15 (금)', content: '광복절' }} />
              <DayOff type={'B'} dayOffInfo={{ day: '2025-08-04 (월)', content: '원예진 강사 휴가' }} />
              <DayOff type={'B'} dayOffInfo={{ day: '2025-08-04 (월)', content: '원예진 강사 휴가' }} />
              <DayOff type={'B'} dayOffInfo={{ day: '2025-08-04 (월)', content: '원예진 강사 휴가' }} />
            </div>
          </div>
        </section>

        {/* 주간 예약 정보 섹션 */}
        <section className="flex-1 bg-[#FCFBFF] flex flex-col rounded-default">
          <SectionTitle icon={reservationIcon} title="주간 예약 정보" />

          <div className="flex-1 px-30px">{/* 주간 예약 정보 내용 */}</div>
        </section>
      </div>
    </div>
  );
}
