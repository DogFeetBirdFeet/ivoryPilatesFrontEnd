import iconCalendar from '@/assets/dashboard/calender.png';
import iconExit from '@/assets/icon/icon_black_exit.png';
import iconClock from '@/assets/icon_clock.png';
import iconPlus from '@/assets/icon/white/icon_plus.png';
import CenterAndAcctInfo from '@/features/Schedule/items/CenterAndAcctInfo';
import SectionDailySchedule from '@/features/Schedule/sections/SectionDailySchedule';
import { dateFormatToString, dateToLocal } from '@/utils/date';
import { useMemo, useState } from 'react';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import ScheduleInfo from '@/features/Schedule/items/ScheduleInfo';
import ScheduleInfoForm from '@/features/Schedule/items/ScheduleInfoForm';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import useOverlayStore from '@/common/Layout/store/overlayStore';

const restTrainerMockData = [
  { hour: 13, trainers: ['원예진', '나큰솔'] },
  { hour: 15, trainers: ['김용진'] },
  { hour: 17, trainers: ['김혜준'] },
];

export default function ScheduleDetail({ date, initTime }: { date: string; initTime?: number }) {
  const mockApiData = [
    {
      schedId: 'sch_1',
      cusId: 'cus_1',
      cusNm: '김혜준',
      trainerId: '1',
      trainerNm: '원예진',
      schedDate: date,
      schedTime: '9',
      fixYn: 'Y',
      grpType: 'S' as const,
      clsStatus: 'COM' as const,
    },
    {
      schedId: 'sch_2',
      cusId: 'cus_2',
      cusNm: '나큰솔',
      trainerId: '1',
      trainerNm: '원예진',
      schedDate: date,
      schedTime: '10',
      fixYn: 'N',
      grpType: null,
      clsStatus: 'COM' as const,
    },
    {
      schedId: 'sch_3',
      cusId: 'cus_3',
      cusNm: '김용진',
      trainerId: '2',
      trainerNm: '신화원',
      schedDate: date,
      schedTime: '11',
      fixYn: 'N',
      grpType: 'D' as const,
      clsStatus: 'NOS' as const,
    },
    {
      schedId: 'sch_4',
      cusId: 'cus_4',
      cusNm: '최호연',
      trainerId: '2',
      trainerNm: '신화원',
      schedDate: date,
      schedTime: '11',
      fixYn: 'N',
      grpType: 'D' as const,
      clsStatus: 'NOS' as const,
    },
    {
      schedId: 'sch_5',
      cusId: 'cus_5',
      cusNm: '김혜준',
      trainerId: '3',
      trainerNm: '김용진',
      schedDate: date,
      schedTime: '12',
      fixYn: 'Y',
      grpType: null,
      clsStatus: 'SCH' as const,
    },
    {
      schedId: 'sch_6',
      cusId: 'cus_2',
      cusNm: '나큰솔',
      trainerId: '2',
      trainerNm: '신화원',
      schedDate: date,
      schedTime: '19',
      fixYn: 'N',
      grpType: null,
      clsStatus: 'SCH' as const,
    },
  ];
  const [selectedIdx, setSelectedIdx] = useState<number | null>(initTime ? initTime - 9 : null);
  const [isAddingSch, setIsAddingSch] = useState<boolean>(false);
  const overlay = useOverlayStore();

  // 선택된 시간대 text로 바꿔주는 함수
  const getSelectedTime = (idx: number): string => {
    const hour = (9 + idx).toString().padStart(2, '0');
    return `${hour}:00 ~ ${hour}:50`;
  };

  // 강사 휴식정보 불러오는 함수
  const getRestTrainerInfo = (idx: number): string | null => {
    const restData = restTrainerMockData.find(({ hour }) => hour === 9 + idx);
    return restData ? `${restData.trainers.join(', ')} 강사` : null;
  };

  // 선택된 시간대의 정보 계산 (selectedIdx가 변경될 때만 재계산)
  const selectedTimeInfo = useMemo(() => {
    if (selectedIdx === null) return { time: '', restTrainer: '' };

    return {
      time: getSelectedTime(selectedIdx),
      restTrainer: getRestTrainerInfo(selectedIdx),
    };
  }, [selectedIdx]);

  // 스케줄 추가 취소버튼 클릭 callback 함수
  function handleCancelAdd() {
    setIsAddingSch(false);
  }

  // 스케줄 추가 저장버튼 클릭시 callback 함수
  function handleSave() {
    // 저장 로직 구현
    console.log('저장하기');
    setIsAddingSch(false);
  }

  // 필터된 스케줄 데이터 (selectedIdx가 변경될 때만 재계산)
  const filteredSchedules = useMemo(() => {
    if (selectedIdx === null) return [];
    return mockApiData.filter((data) => data.schedTime === (selectedIdx + 9).toString());
  }, [selectedIdx, mockApiData]);

  return (
    <div className="h-full bg-ppbg pt-30px pb-200px overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {/* 헤더 */}
      <header className="flex items-center justify-between h-40px mb-20px mx-20px">
        <div className="flex items-center">
          <img src={iconCalendar} className="w-30px h-30px mr-10px" />
          <span className="text-[25px] leading-40px text-ppt font-bold">일간 일정 정보</span>
        </div>
        <button
          onClick={() => {
            overlay.closeLast();
          }}
        >
          <img src={iconExit} className="w-35px h-35px" />
        </button>
      </header>

      {/* 날짜 정보 */}
      <section className="grid grid-cols-[300px_auto] bg-purpleLight2 rounded-default p-20px mb-20px mx-20px">
        <div className="flex justify-center items-center text-[25px] leading-40px text-ppt font-bold">
          {dateToLocal(date)}
        </div>
        <div className="flex flex-col justify-center">
          <CenterAndAcctInfo date={date} centerOffYn="N" holYn="N" acctOffYn="Y" offAcctNm="원예진" />
        </div>
      </section>

      {/* 스케줄 정보 */}
      <section className="flex h-[420px] mb-20px">
        <SectionDailySchedule
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          restTrainers={restTrainerMockData}
          data={mockApiData}
          setIsAddingSch={setIsAddingSch}
        />
      </section>

      {/* 시간대 정보 */}
      {selectedIdx !== null && (
        <>
          {/* 시간/휴식 정보 */}
          <section className="mx-20px mb-20px">
            <div className="flex items-center justify-between">
              {/* 시간/휴식 */}
              <div className="flex-1 flex items-center gap-10px">
                <img src={iconClock} alt="시계" className="w-40px h-40px" />
                <div className="flex flex-col">
                  <div className="text-[25px] font-bold text-ppt">{selectedTimeInfo.time}</div>
                  <div className="font-medium">
                    <span className="text-red mr-5px">강사 휴식 |</span>
                    <span className={selectedTimeInfo.restTrainer ? 'text-ppt' : 'text-gray'}>
                      {selectedTimeInfo.restTrainer || '휴식 강사 없음'}
                    </span>
                  </div>
                </div>
              </div>
              {/* 스케줄 추가 버튼 */}
              <BtnIconText
                type="A"
                icon={iconPlus}
                text="스케줄 추가하기"
                onClick={() => {
                  setIsAddingSch(true);
                }}
              />
            </div>
          </section>

          {/* 스케줄 상세 */}
          <section className="flex flex-col gap-20px mx-20px">
            {isAddingSch && (
              <ScheduleInfoForm
                onCancel={handleCancelAdd}
                onSave={handleSave}
                initDate={dateFormatToString(new Date(), false)}
                initTime="9"
              />
            )}
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((data) => <ScheduleInfo key={data.schedId} {...data} />)
            ) : (
              <div className="flex justify-center items-center h-200px">
                <p className="text-sm font-bold text-gray">예약된 수업이 없습니다.</p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
