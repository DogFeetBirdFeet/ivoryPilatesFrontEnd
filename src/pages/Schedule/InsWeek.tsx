import { useEffect, useState, useRef, useMemo } from 'react';
import IconSchedule from '@/assets/icon/yellow/icon_sche.png';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import WeeklyCalender from '@/features/Schedule/items/WeeklyCalender';
import type { IInsDay } from '@/features/Schedule/type/types';
import { scheduleApiWeek } from '@/services/Schedule/api';
import iconPix from '@/assets/icon_pix.png';
import iconUnderPosition from '@/assets/icon/purple/icon_underPosition.png';
import iconUpperPosition from '@/assets/icon/purple/icon_upperPosition.png';
export default function InsWeek() {
  const [currentWeek, setCurrentWeek] = useState<Date>(() => new Date());
  const [data, setData] = useState<IInsDay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 각 일자별로 스크롤 상태 관리 (false: 09:00부터, true: 마지막 스케줄부터)
  const [scrollDown, setScrollDown] = useState<boolean[]>([false, false, false, false, false, false, false]);
  // 박스 높이 측정을 위한 ref
  const boxRef = useRef<HTMLDivElement>(null);
  // 각 일자별로 표시할 시간대를 동적으로 계산한 결과
  const [visibleSlotsByDay, setVisibleSlotsByDay] = useState<Record<number, string[]>>({});
  const [isScrollableByDay, setIsScrollableByDay] = useState<Record<number, boolean>>({});
  const loadScheduleData = async (param: { staDate: string; endDate: string }) => {
    setIsLoading(true);
    try {
      const response = await scheduleApiWeek.getScheduleList(param);
      setData(response?.data || []);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 주간의 시작일(월요일) 계산
    const currentDay = currentWeek.getDay();
    const monOffset = currentDay === 0 ? -6 : 1 - currentDay; // 일요일이면 -6, 아니면 월요일까지의 오프셋

    const staDate = new Date(currentWeek);
    staDate.setDate(currentWeek.getDate() + monOffset);

    // 주간의 종료일(일요일) 계산
    const endDate = new Date(staDate);
    endDate.setDate(staDate.getDate() + 6);

    // YYYYmmDD 형식으로 포맷
    const staDateStr =
      staDate.getFullYear().toString() +
      (staDate.getMonth() + 1).toString().padStart(2, '0') +
      staDate.getDate().toString().padStart(2, '0');

    const endDateStr =
      endDate.getFullYear().toString() +
      (endDate.getMonth() + 1).toString().padStart(2, '0') +
      endDate.getDate().toString().padStart(2, '0');

    const initialFormValues = { staDate: staDateStr, endDate: endDateStr };
    loadScheduleData(initialFormValues).then((r) => r);
  }, [currentWeek]);
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();
  useEffect(() => {
    setHeaderTitle('강사 주간 일정');
    setHeaderIcon(IconSchedule);
  }, [setHeaderTitle, setHeaderIcon]);

  const weekDaysKr = ['월', '화', '수', '목', '금', '토', '일'];

  // 주간 날짜 계산 - useMemo로 메모이제이션하여 currentWeek가 변경될 때만 재계산
  const weekDays = useMemo(() => {
    const days = [];
    const currentDay = currentWeek.getDay();
    const monOffset = currentDay === 0 ? -6 : 1 - currentDay;

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeek);
      date.setDate(currentWeek.getDate() + monOffset + i);
      days.push(date);
    }
    return days;
  }, [currentWeek]);

  // 시간대 데이터
  const timeSlots: string[] = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
  ];

  // 셀 렌더링 헬퍼 - 실제 API 데이터 사용
  const getCellText = (dayIdx: number, time: string) => {
    const targetDate = weekDays[dayIdx];
    const dateStr =
      targetDate.getFullYear().toString() +
      (targetDate.getMonth() + 1).toString().padStart(2, '0') +
      targetDate.getDate().toString().padStart(2, '0');

    // 시간 형식 변환: "14:00" -> "14" (API는 "03"처럼 0패딩일 수 있어 padStart 적용)
    const timeHour = time.split(':')[0].padStart(2, '0');

    // 해당 날짜와 시간에 맞는 스케줄 찾기
    const schedule = data.filter(
      (item) => item.schedDate === dateStr && item.schedTime === timeHour && item.mstId !== undefined
    );
    if (schedule.length > 1) {
      return schedule.map((item) => item.cusNm).join('\n');
    } else {
      return schedule.find((item) => item.schedDate === dateStr && item.schedTime === timeHour)?.cusNm ?? '예약가능';
    }
  };

  const getDateStr = (date: Date) => {
    return (
      date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0')
    );
  };
  // 각 일자별로 실제 slot 높이를 측정하고 표시할 시간대 결정
  useEffect(() => {
    if (isLoading || !data.length) return;

    const calculateVisibleSlots = () => {
      const newVisibleSlots: Record<number, string[]> = {};
      const newIsScrollable: Record<number, boolean> = {};

      weekDays.forEach((date, dayIdx) => {
        const dateStr = getDateStr(date);
        const tarDate = data.filter((d: IInsDay) => d.schedDate === dateStr);
        const isCenterOff = tarDate.some((d: IInsDay) => d.centerOffYn === 'Y');

        if (isCenterOff) {
          newVisibleSlots[dayIdx] = [];
          newIsScrollable[dayIdx] = false;
          return;
        }

        // 해당 일자의 박스 찾기
        const dayBox = document.querySelector(`[data-day-index="${dayIdx}"]`) as HTMLElement;
        if (!dayBox) {
          newVisibleSlots[dayIdx] = timeSlots;
          newIsScrollable[dayIdx] = false;
          return;
        }

        // 스케줄 wrapper 높이 측정
        const scheduleWrapper = dayBox.querySelector('.flex.flex-col.flex-1.min-h-0') as HTMLElement;
        if (!scheduleWrapper) {
          newVisibleSlots[dayIdx] = timeSlots;
          newIsScrollable[dayIdx] = false;
          return;
        }

        const wrapperHeight = scheduleWrapper.clientHeight;
        if (wrapperHeight === 0) {
          newVisibleSlots[dayIdx] = timeSlots;
          newIsScrollable[dayIdx] = false;
          return;
        }

        // 스크롤 버튼 높이 제외
        const scrollButton = dayBox.querySelector('button[aria-label="위로 보기"], button[aria-label="더 보기"]');
        const scrollButtonHeight = scrollButton ? 48 : 0;
        const availableHeight = wrapperHeight - scrollButtonHeight;

        // 모든 slot의 높이를 측정
        const scheduleContainer = dayBox.querySelector('.space-y-1');
        if (!scheduleContainer) {
          newVisibleSlots[dayIdx] = timeSlots;
          newIsScrollable[dayIdx] = false;
          return;
        }

        const slots = scheduleContainer.querySelectorAll('div[data-time-slot]');
        let accumulatedHeight = 0;
        const visibleSlots: string[] = [];

        slots.forEach((slot) => {
          const slotElement = slot as HTMLElement;
          const slotHeight = slotElement.offsetHeight;
          const computedStyle = window.getComputedStyle(slotElement);
          const marginBottom = parseFloat(computedStyle.marginBottom) || 4;
          const totalSlotHeight = slotHeight + marginBottom;

          if (accumulatedHeight + totalSlotHeight <= availableHeight) {
            const time = slotElement.getAttribute('data-time-slot');
            if (time) {
              visibleSlots.push(time);
              accumulatedHeight += totalSlotHeight;
            }
          }
        });

        newVisibleSlots[dayIdx] = visibleSlots;
        newIsScrollable[dayIdx] = visibleSlots.length < timeSlots.length;
      });

      setVisibleSlotsByDay(newVisibleSlots);
      setIsScrollableByDay(newIsScrollable);
    };

    // DOM이 완전히 렌더링된 후 측정
    const timeoutId = setTimeout(calculateVisibleSlots, 300);

    // ResizeObserver로 박스 크기 변경 감지
    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleSlots();
    });

    // 모든 일자 박스 관찰
    weekDays.forEach((_, dayIdx) => {
      const dayBox = document.querySelector(`[data-day-index="${dayIdx}"]`);
      if (dayBox) {
        resizeObserver.observe(dayBox as HTMLElement);
      }
    });

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [data, isLoading, weekDays]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col p-6 bg-ppLight rounded-md mb-[30px]">
        <WeeklyCalender currentWeek={currentWeek} setCurrentWeek={setCurrentWeek} />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center flex-1">
          <div className="animate-spin rounded-full h-[120px] w-[120px] border-t-2 border-b-2 border-yellow"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-row p-6 bg-ppWhite h-[25px]">
            {weekDaysKr.map((daysStr) => (
              <div className="flex items-center justify-center flex-1">
                <div className="text-2xl text-ppt">{daysStr}</div>
              </div>
            ))}
          </div>

          {/* 일별 스케줄 */}
          <div className="mt-4 flex gap-4 flex-1 min-h-0">
            {weekDays.map((date, dayIdx) => {
              const isCurrentMonth = date.getMonth() === currentWeek.getMonth();
              return (
                <div
                  key={dayIdx}
                  data-day-index={dayIdx}
                  ref={dayIdx === 0 ? boxRef : undefined}
                  className={`flex flex-col flex-1 rounded-lg border p-4 overflow-hidden ${isCurrentMonth ? 'bg-white' : 'bg-gray100'}`}
                >
                  {/* 날짜 헤더 */}
                  <div className="text-center mb-4">
                    {(() => {
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isTodayBadge = isCurrentMonth && isToday;
                      const dateStr =
                        date.getFullYear().toString() +
                        (date.getMonth() + 1).toString().padStart(2, '0') +
                        date.getDate().toString().padStart(2, '0');
                      // 공휴일/센터휴무 여부 계산 (날짜별로 한 번만)
                      const tarDate = data.filter((d: IInsDay) => d.schedDate === dateStr);
                      const hasHoliday = tarDate.some((d: IInsDay) => d.holYn === 'Y');
                      const holidayName = hasHoliday ? tarDate.find((d: IInsDay) => d.holYn === 'Y')?.holNm || '' : '';
                      const acctOffYn = tarDate.some((d: IInsDay) => d.acctOffYn === 'Y');
                      const acctOffName = acctOffYn
                        ? tarDate.find((d: IInsDay) => d.acctOffYn === 'Y')?.offAcctNm || ''
                        : '';
                      return (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span
                            className={[
                              'inline-flex items-center justify-center font-bold text-2xl',
                              isTodayBadge ? 'h-[40px] w-[40px] rounded-full bg-yellow text-black' : '',
                              !isCurrentMonth ? 'h-[40px] w-[40px] rounded-full bg-white text-grayA1' : 'text-black',
                              !isTodayBadge && isCurrentMonth ? 'h-[40px] w-[40px] rounded-full bg-grayWhite' : '',
                            ].join(' ')}
                          >
                            {date.getDate()}
                          </span>
                          <div className="h-[60px] flex flex-col items-center justify-center gap-1">
                            {hasHoliday && <span className="text-red font-bold text-xl">{holidayName}</span>}
                            {acctOffYn && <span className="text-ppp text-xl">{acctOffName} 강사 휴일</span>}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* 시간대별 스케줄 */}
                  {isCurrentMonth &&
                    (() => {
                      const dateStr = getDateStr(date);
                      const tarDate = data.filter((d: IInsDay) => d.schedDate === dateStr);
                      const isCenterOff = tarDate.some((d: IInsDay) => d.centerOffYn === 'Y');

                      if (isCenterOff) {
                        return (
                          <div className="flex-1 flex items-center justify-center">
                            <span className={'text-gray text-xl'}>센터 휴무일</span>
                          </div>
                        );
                      }

                      const isScrolledDown = scrollDown[dayIdx];

                      // 동적으로 계산된 표시할 시간대 가져오기
                      let visibleTimeSlots: string[] = visibleSlotsByDay[dayIdx] || timeSlots;
                      const isScrollable = isScrollableByDay[dayIdx] || false;

                      // 아래로 스크롤된 경우: 마지막부터 역순으로 표시
                      if (isScrolledDown) {
                        // wrapper 높이 측정
                        const dayBox = document.querySelector(`[data-day-index="${dayIdx}"]`) as HTMLElement;
                        if (dayBox) {
                          const scheduleWrapper = dayBox.querySelector('.flex.flex-col.flex-1.min-h-0') as HTMLElement;
                          if (scheduleWrapper) {
                            const wrapperHeight = scheduleWrapper.clientHeight;
                            const scrollButton = dayBox.querySelector('button[aria-label="위로 보기"]');
                            const scrollButtonHeight = scrollButton ? 48 : 0;
                            const availableHeight = wrapperHeight - scrollButtonHeight;

                            const scheduleContainer = dayBox.querySelector('.space-y-1');
                            if (scheduleContainer) {
                              const slots = scheduleContainer.querySelectorAll('div[data-time-slot]');
                              let accumulatedHeight = 0;
                              const reversedVisibleSlots: string[] = [];

                              // 역순으로 순회
                              for (let i = slots.length - 1; i >= 0; i--) {
                                const slot = slots[i] as HTMLElement;
                                const time = slot.getAttribute('data-time-slot');
                                if (!time) continue;

                                const slotHeight = slot.offsetHeight;
                                const computedStyle = window.getComputedStyle(slot);
                                const marginBottom = parseFloat(computedStyle.marginBottom) || 4;
                                const totalSlotHeight = slotHeight + marginBottom;

                                if (accumulatedHeight + totalSlotHeight <= availableHeight) {
                                  reversedVisibleSlots.unshift(time);
                                  accumulatedHeight += totalSlotHeight;
                                } else {
                                  break;
                                }
                              }
                              visibleTimeSlots = reversedVisibleSlots;
                            }
                          }
                        }
                      }

                      return (
                        <div className="flex flex-col flex-1 min-h-0">
                          {isScrolledDown && (
                            <div className="flex justify-center items-center py-2 border-b border-gray-300 mb-2">
                              <button
                                onClick={() => {
                                  setScrollDown((prev) => prev.map((val, idx) => (idx === dayIdx ? false : val)));
                                }}
                                className="flex items-center justify-center w-[10px] h-[12px]"
                                aria-label="위로 보기"
                              >
                                <img src={iconUpperPosition} className="w-[10px] h-[12px]" alt={'위로 보기'} />
                              </button>
                            </div>
                          )}
                          <div
                            className={`space-y-1 flex-1 overflow-hidden flex flex-col ${
                              isScrolledDown ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {timeSlots.map((time) => {
                              const scheduleText = getCellText(dayIdx, time);
                              const isBooked = scheduleText !== '예약가능';
                              const isVisible = visibleTimeSlots.includes(time) || isScrolledDown;

                              return (
                                <div
                                  key={time}
                                  data-time-slot={time}
                                  className={[
                                    'flex items-center justify-between py-[10px] border-[#d9d9d9] hover:bg-grayWhite',
                                    time !== '21:00' ? 'border-b-2' : '',
                                    !isVisible && !isScrolledDown ? 'hidden' : '',
                                  ].join(' ')}
                                >
                                  <div className="text-xl font-bold text-ppt flex items-center gap-5px">
                                    {time}
                                    {tarDate.filter(
                                      (d: IInsDay) => d.schedTime === time.substring(0, 2) && d.fxYn === 'Y'
                                    ).length > 0 ? (
                                      <img src={iconPix} className="w-15px h-15px" alt={'pix'} />
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  <div className="text-xl flex items-center whitespace-break-spaces">
                                    <span className={isBooked ? 'text-black' : 'text-blueBtn'}>{scheduleText}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {isScrollable && !isScrolledDown && (
                            <div className="flex justify-center items-center py-2 border-t border-gray-300 mt-2">
                              <button
                                onClick={() => {
                                  setScrollDown((prev) => prev.map((val, idx) => (idx === dayIdx ? true : val)));
                                }}
                                className="flex items-center justify-center w-[10px] h-[12px]"
                                aria-label="더 보기"
                              >
                                <img src={iconUnderPosition} className="w-[10px] h-[12px]" alt={'아래로 보기'} />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
