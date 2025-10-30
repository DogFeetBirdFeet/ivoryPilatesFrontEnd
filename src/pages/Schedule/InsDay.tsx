import { useEffect, useMemo, useState } from 'react';
import WeeklyDayCalender from '@/features/Schedule/items/WeeklyDayCalender.tsx';
import CenterAndAcctInfo from '@/features/Schedule/items/CenterAndAcctInfo';
import SectionDailySchedule from '@/features/Schedule/sections/SectionDailySchedule';
import IconSchedule from '@/assets/icon/yellow/icon_sche.png';
import iconClock from '@/assets/icon_clock.png';
import iconPlus from '@/assets/icon/white/icon_plus.png';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import ScheduleInfo from '@/features/Schedule/items/ScheduleInfo';
import ScheduleInfoForm from '@/features/Schedule/items/ScheduleInfoForm';
import { dateFormatToString } from '@/utils/date';
import { useLayoutContext } from '@/hooks/useLayoutContext';

const restTrainerMockData = [
  { hour: 13, trainers: ['원예진', '나큰솔'] },
  { hour: 15, trainers: ['김용진'] },
  { hour: 17, trainers: ['김혜준'] },
];

export default function InsDay() {
  // TODO : mockData -> 실데이터로 변경
  const mockApiData = [
    {
      schedId: 'sch_1',
      cusId: 'cus_1',
      cusNm: '김혜준',
      trainerId: '1',
      trainerNm: '원예진',
      schedDate: '20251016',
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
      schedDate: '20251016',
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
      schedDate: '20251016',
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
      schedDate: '20251016',
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
      schedDate: '20251016',
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
      schedDate: '20251016',
      schedTime: '19',
      fixYn: 'N',
      grpType: null,
      clsStatus: 'SCH' as const,
    },
  ];
  // 주간 날짜 / 선택일자
  const [today] = useState(() => new Date());
  const [currentWeek, setCurrentWeek] = useState<Date>(() => new Date());
  const [curDate, setCurDate] = useState<number>(today.getDate());
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<number>(today.getDay());

  // 선택 테이블row, 스케줄 추가 상태
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAddingSch, setIsAddingSch] = useState<boolean>(false);

  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('강사 일간 일정');
    setHeaderIcon(IconSchedule);
  }, [setHeaderTitle, setHeaderIcon]);

  // 선택된 시간대 text로 바꿔주는 함수
  const getSelectedTime = (idx: number): string => {
    const hour = (9 + idx).toString().padStart(2, '0');
    return `${hour}:00 ~ ${hour}:50`;
  };

  // 강사 휴식정보 불러오는 함수
  const getRestTrainerInfo = (idx: number): string | null => {
    const restData = restTrainerMockData.find(({ hour }) => hour === 9 + idx);
    return restData ? `${restData.trainers} 강사` : null;
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
    <div className="min-w-[1300px]">
      <div className="flex justify-center bg-ppLight rounded-default mb-20px mx-20px py-[30px]">
        <WeeklyDayCalender
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          curDate={curDate}
          setCurDate={setCurDate}
          selectedDayOfWeek={selectedDayOfWeek}
          setSelectedDayOfWeek={setSelectedDayOfWeek}
        />
      </div>

      <div className="flex gap-20px mb-15px">
        {/* 일간 스케줄 */}
        <div className="w-[800px]">
          <div className="bg-purpleLight2 rounded-lg p-20px mx-20px mb-20px">
            <CenterAndAcctInfo
              date={dateFormatToString(new Date(), false)}
              centerOffYn="N"
              holYn="N"
              acctOffYn="Y"
              offAcctNm="원예진"
            />
          </div>
          <div className="flex h-[calc(100vh-420px)]">
            <SectionDailySchedule
              selectedIdx={selectedIdx}
              setSelectedIdx={setSelectedIdx}
              data={mockApiData}
              restTrainers={restTrainerMockData}
              setIsAddingSch={setIsAddingSch}
            />
          </div>
        </div>

        {/* 타임 디테일 */}
        <div className="flex-1">
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
      </div>
    </div>
  );
}
