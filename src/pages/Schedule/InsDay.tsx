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
import type { IInsDay } from '@/features/Schedule/type/types';
import { scheduleApi } from '@/services/Schedule/api';

const restTrainerMockData = [
  { hour: 13, trainers: ['원예진', '나큰솔'] },
  { hour: 15, trainers: ['김용진'] },
  { hour: 17, trainers: ['김혜준'] },
];

export default function InsDay() {

  // 주간 날짜 / 선택일자
  const [today] = useState(() => new Date());
  const [data, setData] = useState<Partial<IInsDay>[]>([]);
  const [currentWeek, setCurrentWeek] = useState<Date>(() => new Date());
  const [curDate, setCurDate] = useState<number>(today.getDate());
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<number>(today.getDay());

  // 선택 테이블row, 스케줄 추가 상태
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAddingSch, setIsAddingSch] = useState<boolean>(false);

  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  const loadScheduleData = async (param: { schDate: string; }) => {
    try {
      const response = await scheduleApi.getScheduleList(param);
      setData(response.data);

      console.log(response.data);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  };

  // 선택된 날짜를 YYYYMMDD 형식으로 변환하는 함수
  const getSelectedDateString = (): string => {
    const currentDay = currentWeek.getDay();
    const monOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const selectedDate = new Date(currentWeek);
    const scheduleIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1;
    selectedDate.setDate(currentWeek.getDate() + monOffset + scheduleIndex);
    return dateFormatToString(selectedDate, false);
  };

  useEffect(() => {
    setHeaderTitle('강사 일간 일정');
    setHeaderIcon(IconSchedule);
  }, [setHeaderTitle, setHeaderIcon]);

  useEffect(() => {
    const schDate = getSelectedDateString();
    loadScheduleData({ schDate });
  }, [currentWeek, selectedDayOfWeek]);

  // 선택된 시간대 text로 바꿔주는 함수
  const getSelectedTime = (idx: number): string => {
    const hour = (9 + idx).toString().padStart(2, '0');
    return `${hour}:00 ~ ${hour}:50`;
  };

  // 강사 휴식정보 불러오는 함수
  const getRestTrainerInfo = (idx: number): string | null => {
    const restData = data?.find((x: IInsDay) => x.schedTime === (9 + idx).toString());
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
    return data.filter((x: IInsDay) => x.schedTime === (selectedIdx + 9).toString());
  }, [selectedIdx, data]);

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
              data={data as IInsDay[]}
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
