import { useEffect, useMemo, useRef, useState } from 'react';
import iconLeft from '@/assets/icon/chevron_left.png';
import iconRight from '@/assets/icon/chevron_right.png';
import { INPUT_COMMON_STYLE, INPUT_DEFAULT, INPUT_ERROR } from './styleConstants';
import { dateFormatToString, isSameDate, parseStringToDate } from '@/utils/date';

interface IInputDate {
  id: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  className?: string;
  sortRight?: boolean;
  error?: boolean;
}

type CalendarCell = {
  date: Date;
  inCurrentMonth: boolean;
};

export default function InputDate({ id, value, onChange, className, sortRight = false, error = false }: IInputDate) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewYear, setViewYear] = useState<number>(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(new Date().getMonth());

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 부모 value와 동기화
  useEffect(() => {
    setSelectedDate(value);
    // 외부에서 값이 변경되면 input도 업데이트
    if (inputRef.current && !isEditing) {
      inputRef.current.value = dateFormatToString(value);
    }
  }, [value, isEditing]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 캘린더 그리드 생성
  const calendarWeeks = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const startWeekday = (firstDay.getDay() + 6) % 7;

    const cells: CalendarCell[] = [];

    // 이전 달
    const prevMonthLastDay = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = startWeekday - 1; i >= 0; i--) {
      cells.push({
        date: new Date(viewYear, viewMonth - 1, prevMonthLastDay - i),
        inCurrentMonth: false,
      });
    }

    // 현재 달
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({
        date: new Date(viewYear, viewMonth, day),
        inCurrentMonth: true,
      });
    }

    // 다음 달
    const remainder = cells.length % 7;
    if (remainder !== 0) {
      for (let i = 1; i <= 7 - remainder; i++) {
        cells.push({
          date: new Date(viewYear, viewMonth + 1, i),
          inCurrentMonth: false,
        });
      }
    }

    const weeks: CalendarCell[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  }, [viewYear, viewMonth]);

  const handleFocus = () => {
    setIsOpen(true);
    setIsEditing(true);
    if (selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
    }
    // 포커스 시 숫자만 보이도록
    if (inputRef.current && selectedDate) {
      inputRef.current.value = dateFormatToString(selectedDate, false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d]/g, '').slice(0, 8); // 8자리 제한
    if (inputRef.current) {
      inputRef.current.value = cleaned;
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setIsOpen(false);

    if (inputRef.current) {
      const parsed = parseStringToDate(inputRef.current.value);
      setSelectedDate(parsed);
      onChange(parsed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur(); // 엔터 시 blur 처리
    }
  };

  const handlePrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newDate = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(newDate.getFullYear());
    setViewMonth(newDate.getMonth());
  };

  const handleNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newDate = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(newDate.getFullYear());
    setViewMonth(newDate.getMonth());
  };

  const handleCellClick = (cell: CalendarCell) => {
    // 현재 달 날짜만 선택
    const date = cell.date;
    const formatted = dateFormatToString(date);

    // 상태 업데이트
    setSelectedDate(date);
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
    setIsOpen(false);
    setIsEditing(false);

    // input 값 직접 업데이트
    if (inputRef.current) {
      inputRef.current.value = formatted;
      inputRef.current.blur();
    }

    // 부모에게 전달
    onChange(date);
  };

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="numeric"
        className={`${INPUT_COMMON_STYLE} ${error ? INPUT_ERROR : INPUT_DEFAULT} w-full text-center text-black`}
        defaultValue={dateFormatToString(selectedDate)}
        maxLength={10}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      {isOpen && (
        <div
          className={`absolute top-[35px] z-50 w-[280px] px-20px py-20px rounded-default border border-[#D9D9D9] bg-white shadow-2xl font-bold ${
            sortRight ? 'right-0' : ''
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between text-xl mb-10px">
            <button type="button" onMouseDown={handlePrevMonth} className="px-6px py-6px rounded">
              <img src={iconLeft} alt="이전 달" className="w-[24px] h-[24px]" />
            </button>
            <div className="font-extrabold text-gray">{`${viewYear}년 ${viewMonth + 1}월`}</div>
            <button type="button" onMouseDown={handleNextMonth} className="px-6px py-6px rounded">
              <img src={iconRight} alt="다음 달" className="w-[24px] h-[24px]" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="h-35px grid grid-cols-7 justify-items-center gap-10px text-[#444444]">
            {['월', '화', '수', '목', '금', '토', '일'].map((day, idx) => (
              <div key={day} className={`self-center w-25px h-25px text-center text-sm ${idx >= 5 ? 'text-red' : ''}`}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 justify-items-center gap-10px">
            {calendarWeeks.map((week, weekIdx) => (
              <div key={weekIdx} className="contents">
                {week.map((cell, cellIdx) => {
                  const isSelected = isSameDate(cell.date, selectedDate);
                  const isWeekend = [6, 0].includes(cell.date.getDay());

                  const textColor = isSelected
                    ? 'text-white'
                    : !cell.inCurrentMonth
                    ? 'text-calGray'
                    : isWeekend
                    ? 'text-red'
                    : 'text-[#444444]';

                  const bgColor = isSelected ? 'bg-ppp' : 'hover:bg-ppp hover:text-white';

                  return (
                    <button
                      key={`${weekIdx}-${cellIdx}`}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleCellClick(cell);
                      }}
                      className={`w-25px h-25px text-center rounded-[5px] text-sm flex items-center justify-center transition-colors ${textColor} ${bgColor}`}
                    >
                      {cell.date.getDate()}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
