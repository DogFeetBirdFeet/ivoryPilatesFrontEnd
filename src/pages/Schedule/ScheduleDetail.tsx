import iconCalendar from '@/assets/dashboard/calender.png';
import iconExit from '@/assets/icon/icon_black_exit.png';
import iconClock from '@/assets/icon_clock.png';
import iconPlus from '@/assets/icon/white/icon_plus.png';
import CenterAndAcctInfo from '@/features/Schedule/items/CenterAndAcctInfo';
import SectionDailySchedule from '@/features/Schedule/sections/SectionDailySchedule';
import { dateToLocal } from '@/utils/date';
import { useMemo, useState } from 'react';
import BtnIconText from '@/common/components/buttons/BtnIconText';

const mockApiData = [
  {
    id: '1',
    cusNm: '김혜준',
    trainerNm: '원예진',
    clsStatus: 'COM' as const,
    grpType: 'S' as const,
    fixYn: 'Y',
    schedTime: '9',
  },
  {
    id: '2',
    cusNm: '김혜준',
    trainerNm: '원예진',
    clsStatus: 'COM' as const,
    grpType: 'S' as const,
    fixYn: 'N',
    schedTime: '10',
  },
  {
    id: '3',
    cusNm: '최호연',
    trainerNm: '김용진',
    clsStatus: 'NOS' as const,
    grpType: 'S' as const,
    fixYn: 'N',
    schedTime: '11',
  },
  {
    id: '4',
    cusNm: '신화원',
    trainerNm: '원예진',
    clsStatus: 'SCH' as const,
    grpType: 'S' as const,
    fixYn: 'N',
    schedTime: '12',
  },
  {
    id: '5',
    cusNm: '나큰솔',
    trainerNm: '원예진',
    clsStatus: 'SCH' as const,
    grpType: 'S' as const,
    fixYn: 'N',
    schedTime: '13',
  },
  {
    id: '6',
    cusNm: '신화원',
    trainerNm: '최호연',
    clsStatus: 'SCH' as const,
    grpType: 'D' as const,
    fixYn: 'Y',
    schedTime: '16',
  },
  {
    id: '7',
    cusNm: '김용진',
    trainerNm: '최호연',
    clsStatus: 'SCH' as const,
    grpType: 'D' as const,
    fixYn: 'N',
    schedTime: '16',
  },

  {
    id: '8',
    cusNm: '나큰솔',
    trainerNm: '김혜준',
    clsStatus: 'SCH' as const,
    grpType: 'S' as const,
    fixYn: 'N',
    schedTime: '17',
  },
];

const restTrainerMockData = [
  { time: '13', trainerNm: '원예진' },
  { time: '17', trainerNm: '나큰솔' },
];

export default function ScheduleDetail() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAddingSch, setIsAddingSch] = useState<boolean>(false);

  // 선택된 시간대 text로 바꿔주는 함수
  const getSelectedTime = (idx: number): string => {
    const hour = (9 + idx).toString().padStart(2, '0');
    return `${hour}:00 ~ ${hour}:50`;
  };

  // 강사 휴식정보 불러오는 함수
  const getRestTrainerInfo = (idx: number): string | null => {
    const restData = restTrainerMockData.find(({ time }) => time === (9 + idx).toString());
    return restData ? `${restData.trainerNm} 강사` : null;
  };

  // 선택된 시간대의 정보 계산 (selectedIdx가 변경될 때만 재계산)
  const selectedTimeInfo = useMemo(() => {
    if (selectedIdx === null) return { time: '', restTrainer: '' };

    return {
      time: getSelectedTime(selectedIdx),
      restTrainer: getRestTrainerInfo(selectedIdx),
    };
  }, [selectedIdx]);

  return (
    <div className="h-full bg-ppbg py-30px overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {/* 헤더 */}
      <header className="flex items-center justify-between h-40px mb-20px mx-20px">
        <div className="flex items-center">
          <img src={iconCalendar} className="w-30px h-30px mr-10px" />
          <span className="text-[25px] leading-40px text-ppt font-bold">일간 일정 정보</span>
        </div>
        <button>
          <img src={iconExit} className="w-35px h-35px" />
        </button>
      </header>

      {/* 날짜 정보 */}
      <section className="grid grid-cols-[300px_auto] bg-purpleLight2 rounded-default p-20px mb-20px mx-20px">
        <div className="flex justify-center items-center text-[25px] leading-40px text-ppt font-bold">
          {dateToLocal(new Date())}
        </div>
        <div className="flex flex-col justify-center">
          <CenterAndAcctInfo date={new Date()} centerOffYn="N" holYn="N" acctOffYn="Y" offAcctNm="원예진" />
        </div>
      </section>

      {/* 스케줄 정보 */}
      <section className="flex h-[420px] mb-20px">
        <SectionDailySchedule
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          data={mockApiData}
          onAddSchedule={() => {}}
        />
      </section>

      {/* 시간대 정보 */}
      {selectedIdx !== null && (
        <>
          <section className="mx-20px">
            <div className="flex items-center justify-between">
              {/* 시간/휴식 정보 */}
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
        </>
      )}
    </div>
  );
}
