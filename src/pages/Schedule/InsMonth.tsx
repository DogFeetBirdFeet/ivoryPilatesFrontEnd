import MonthlyCalender from '@/features/Schedule/items/MonthlyCalender.tsx';
import { useEffect, useState } from 'react';
import { useLayoutContext } from '@/hooks/useLayoutContext.ts';
import IconSchedule from '@/assets/icon/yellow/icon_sche.png';
import { useForm } from 'react-hook-form';
import { scheduleApiMonth } from '@/services/api.ts';
import type { IInsDay } from '@/features/Schedule/type/types';
import SearchInputCus from '@/common/components/inputArea/SearchInputCus.tsx';
import SearchCondition from '@/common/components/searchBar/SearchCondition.tsx';

interface ISearchForm {
  searchUserNm: string;
  schMonth: string;
}

export default function InsMonth() {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IInsDay[]>([]);

  // react-hook-form 검색조건
  const { watch, setValue, handleSubmit } = useForm<ISearchForm>({
    defaultValues: {
      searchUserNm: '',
      schMonth: new Date().toISOString().slice(0, 7).replace('-', ''),
    },
  });

  const weekDaysKr = ['월', '화', '수', '목', '금', '토', '일'];
  // --- 캘린더(월 단위) 계산: 월요일 시작 기준 ---
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0~11
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // JS getDay(): 0(일)~6(토) -> 월(0)~일(6) 변환
  const startOffset = (firstOfMonth.getDay() + 6) % 7;

  // 총 셀 수(앞/뒤 패딩 포함)를 6주(42칸)로 고정
  const totalCells = 35;

  // 오늘 표시용
  const today = new Date();
  const isToday = (d: number | null) =>
    d && today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;

  // 유틸: 인덱스 → (셀 타입, 표시 날짜, 실제-현재월여부)
  type CellKind = 'prev' | 'curr' | 'next';
  const cells = Array.from({ length: totalCells }, (_, idx) => {
    let kind: CellKind;
    let displayDay: number;
    if (idx < startOffset) {
      kind = 'prev';
      displayDay = prevMonthDays - startOffset + idx + 1;
    } else if (idx >= startOffset && idx < startOffset + daysInMonth) {
      kind = 'curr';
      displayDay = idx - startOffset + 1;
    } else {
      kind = 'next';
      displayDay = idx - (startOffset + daysInMonth) + 1;
    }
    // 현재 월 날짜만 두자리 문자열로 만들면 data 매핑 가능
    const dayStr = kind === 'curr' ? String(displayDay).padStart(2, '0') : null;
    const dayData = kind === 'curr' ? data.filter((x) => x.day === dayStr) : [];

    return { kind, displayDay, dayStr, dayData };
  });

  const getDateInfo = (dayData: IInsDay[]) => {
    const schTotal = dayData.length;

    const schEnd = dayData?.filter((x) => x?.clsStatus === 'COM').length;
    const schSch = dayData.filter((x) => x?.clsStatus === 'SCH').length;
    const schRest = schTotal - schEnd - schSch;
    return { schEnd, schSch, schRest };
  };

  const loadSchData = async (searchParams?: ISearchForm) => {
    setIsLoading(true);

    try {
      if (!searchParams) return;

      // currentMonth를 YYYYMM 형태의 문자열로 변환
      const schMonthString = `${currentMonth.getFullYear()}${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;

      const params = {
        searchUserNm: searchParams?.searchUserNm || undefined,
        schMonth: schMonthString,
      };

      const response = await scheduleApiMonth.getScheduleList(params);
      setData(response.data);
    } catch (error) {
      console.log('데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
      // TODO 제거
      console.log(isLoading);
    }
  };

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    const initializeData = async () => {
      // 초기 폼 값으로 데이터 로드
      const initialFormValues = {
        searchUserNm: '',
        schMonth: `${currentMonth.getFullYear()}${String(currentMonth.getMonth() + 1).padStart(2, '0')}`,
      };
      await loadSchData(initialFormValues);
    };
    initializeData().then((r) => r);
  }, [currentMonth]);

  // 헤더 정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();
  useEffect(() => {
    setHeaderTitle('강사 월간 일정');
    setHeaderIcon(IconSchedule);
  }, [setHeaderTitle, setHeaderIcon]);

  // 검색 실행
  const onSubmit = (data: ISearchForm) => {
    loadSchData(data).then((r) => r);
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 상단 검색/달 네비 바 */}
        <div className="flex items-center justify-between bg-ppLight rounded-xl px-6 py-4">
          {/* 좌측: 회원 + 검색 인풋 */}
          <SearchCondition id="searchName" labelText="회원명">
            <SearchInputCus
              id="searchName"
              value={watch('searchUserNm')}
              onChange={(value) => setValue('searchUserNm', value)}
              onSearch={(data) => {
                const cusNm = `${data.memberName} 회원님 ${data.grpType === 'D' ? '(2:1 그룹회원)' : ''}`;
                setValue('searchUserNm', cusNm);
              }}
              className="w-full"
            />
          </SearchCondition>

          {/* 우측: 월 네비게이션 (WeeklyCalender) */}
          <div className="ml-6 flex items-center">
            <MonthlyCalender currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
          </div>
        </div>
      </form>

      <div className="flex flex-row p-6 bg-ppWhite h-[35px] mt-5">
        {weekDaysKr.map((daysStr, index) => (
          <div key={index} className="flex items-center justify-center flex-1">
            <div className="text-2xl text-ppt font-medium">{daysStr}</div>
          </div>
        ))}
      </div>

      <div className=" pb-8 mt-5">
        <div className="grid grid-cols-7 gap-4">
          {cells.map(({ kind, displayDay, dayData }, i) => {
            const schDaysInfo = getDateInfo(dayData);

            const isCurr = kind === 'curr';
            const showContent = isCurr; // 현재 월만 라벨 표시
            const isTodayBadge = isCurr && isToday(displayDay);

            // 공휴일/센터휴무 여부 계산
            const hasHoliday = isCurr && dayData.some((d: any) => d.holYn === 'Y');
            const isCenterOff = isCurr && dayData.some((d: any) => d.centerOffYn === 'Y');
            const holidayName =
              hasHoliday && !isCenterOff ? dayData.find((d: any) => d.holYn === 'Y')?.holNm || '' : '';

            return (
              <div
                key={i}
                className={[
                  'h-[130px] rounded-xl border px-3 py-2 flex flex-col',
                  isCurr ? 'bg-white border-ppGridHeader' : 'bg-gray100 border-ppGridHeader',
                ].join(' ')}
              >
                {/* 날짜 헤더 */}
                <div className="flex items-center justify-between">
                  {/* 날짜 숫자 (좌측) */}
                  <div className="relative">
                    <span
                      className={[
                        'inline-flex items-center justify-center font-bold text-xl',
                        isTodayBadge ? 'h-[30px] w-[30px] rounded-full bg-yellow' : '',
                        !isCurr ? 'h-[30px] w-[30px] rounded-full bg-white' : '',
                        isCurr ? (hasHoliday ? 'text-red' : 'text-black') : 'text-grayA1',
                      ].join(' ')}
                    >
                      {displayDay}
                    </span>
                  </div>
                  {hasHoliday && !isCenterOff && <span className="text-red font-bold text-xl">{holidayName}</span>}
                </div>

                {isCenterOff && (
                  <div className="mt-4 flex justify-center">
                    <span className="text-red font-bold">센터 휴무일</span>
                  </div>
                )}

                {/* 본문: 현재 월만 라벨 3줄 노출 */}
                <div className="mt-3 grid grid-rows-3 gap-1 text-xl leading-5 font-medium">
                  <div className={showContent ? 'flex items-center justify-between' : 'opacity-0'}>
                    <span className="text-black">수업 완료</span>
                    <span className="text-ppt">{schDaysInfo.schEnd}</span>
                  </div>
                  <div className={showContent ? 'flex items-center justify-between' : 'opacity-0'}>
                    <span className="text-black">수업 예정</span>
                    <span className="text-yellowCal">{schDaysInfo.schSch}</span>
                  </div>
                  <div className={showContent ? 'flex items-center justify-between' : 'opacity-0'}>
                    <span className="text-black">예약 가능</span>
                    <span className="text-blueBtn">{schDaysInfo.schRest}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
