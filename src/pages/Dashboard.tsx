import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import dashboardIcon from '@/assets/icon/yellow/icon_dashboard.png';
import dayoffIcon from '@/assets/dashboard/dayoff.png';
import calenderIcon from '@/assets/dashboard/calender.png';
import reservationIcon from '@/assets/dashboard/reservation.png';
import SectionTitle from '@/features/Dashboard/items/SectionTitle';
import SectionWeeklyReservation from '@/features/Dashboard/sections/SectionWeeklyReservation';
import SectionDailySchedule from '@/features/Dashboard/sections/SectionDailySchedule';
import SectionDayOff from '@/features/Dashboard/sections/SectionDayOff';

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
      {/* 일간 일정 정보*/}
      <section className="h-full max-h-[calc(100vh-82px)] min-w-[1050px] bg-[#FCFBFF] flex flex-col py-20px pl-30px pr-15px rounded-default">
        <SectionTitle icon={calenderIcon} title="일간 일정 정보" />
        <SectionDailySchedule />
      </section>

      {/* 휴일/예약 정보 */}
      <div className="h-full w-[500px] flex flex-col gap-30px">
        {/* 휴일 정보 섹션 */}
        <section className="h-[330px] bg-[#FCFBFF] flex flex-col py-20px pl-30px pr-15px rounded-default">
          <SectionTitle icon={dayoffIcon} title="휴일 정보" />
          <SectionDayOff />
        </section>

        {/* 주간 예약 정보 섹션 */}
        <section className="flex-1 bg-[#FCFBFF] flex flex-col py-20px px-30px rounded-default">
          <SectionTitle icon={reservationIcon} title="주간 예약 정보" />
          <SectionWeeklyReservation />
        </section>
      </div>
    </div>
  );
}
