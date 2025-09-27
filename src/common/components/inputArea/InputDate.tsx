import { useEffect, useMemo, useRef, useState } from "react";

interface IArea {
    id: string;
    className?: string;
}

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function formatDate(d: Date | null): string {
    if (!d) return "";
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function parseYYYYMMDD(raw: string): Date | null {
    const digits = raw.replace(/\D/g, "");
    if (digits.length !== 8) return null;
    const y = Number(digits.slice(0, 4));
    const m = Number(digits.slice(4, 6));
    const d = Number(digits.slice(6, 8));
    if (m < 1 || m > 12 || d < 1 || d > 31) return null;
    const dt = new Date(y, m - 1, d);
    // 유효성(월 말일 초과 등) 체크
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
    return dt;
}

type Cell = {
    date: Date;
    inCurrentMonth: boolean; // 현재 월 여부
};

export default function InputDate({ id, className }: IArea) {
    const [value, setValue] = useState<Date | null>(null);
    const [display, setDisplay] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState<number>(new Date().getFullYear());
    const [viewMonth, setViewMonth] = useState<number>(new Date().getMonth()); // 0-11

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const INPUT_BASE_CLASS =
        "w-[250px] leading-[30px] h-30px p-10px rounded-default bg-white border-[1px] border-gray text-base focus:outline-none focus:border-yellow text-center";

    // 외부 클릭 닫기
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
                setDisplay(formatDate(value));
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [value]);

    // 캘린더용 날짜 메타
    const firstDayOfMonth = useMemo(() => new Date(viewYear, viewMonth, 1), [viewYear, viewMonth]);
    const daysInMonth = useMemo(() => new Date(viewYear, viewMonth + 1, 0).getDate(), [viewYear, viewMonth]);
    const startWeekday = useMemo(() => firstDayOfMonth.getDay(), [firstDayOfMonth]); // 0=일

    const weeks = useMemo(() => {
        const cells: Cell[] = [];

        // 달력은 월요일 시작 형태와 비슷하게 보였지만, 여기서는 일(0)~토(6) 기준으로 맞춤
        const leading = (startWeekday + 6) % 7; // 앞쪽 패딩 개수(월 시작 정렬)
        // 이전 달 정보
        const prevMonthDate = new Date(viewYear, viewMonth, 0);
        const prevDays = prevMonthDate.getDate();

        // 앞 패딩: 이전 달 말일에서 이어 붙이기
        for (let i = leading - 1; i >= 0; i--) {
            const d = prevDays - i;
            cells.push({ date: new Date(viewYear, viewMonth - 1, d), inCurrentMonth: false });
        }

        // 현재 달
        for (let d = 1; d <= daysInMonth; d++) {
            cells.push({ date: new Date(viewYear, viewMonth, d), inCurrentMonth: true });
        }

        // 뒤 패딩: 마지막 주를 7의 배수로 맞출 만큼만 다음 달 날짜 추가
        const remainder = cells.length % 7;
        if (remainder !== 0) {
            const need = 7 - remainder;
            for (let i = 1; i <= need; i++) {
                cells.push({ date: new Date(viewYear, viewMonth + 1, i), inCurrentMonth: false });
            }
        }

        // 필요한 주까지만 렌더링
        const rows: Cell[][] = [];
        for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
        return rows;

    }, [daysInMonth, startWeekday, viewMonth, viewYear]);

    const openCalendar = () => {
        setOpen(true);
        // 포커스 시 숫자만 보이도록(사용자 입력 편의)
        setDisplay(value ? `${value.getFullYear()}${pad2(value.getMonth() + 1)}${pad2(value.getDate())}` : "");
        if (value) {
            setViewYear(value.getFullYear());
            setViewMonth(value.getMonth());
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d.]/g, ""); // 사용자가 구분점을 넣어도 허용
        setDisplay(raw);
    };

    const handleBlur = () => {
        const parsed = parseYYYYMMDD(display);
        setValue(parsed);
        setDisplay(formatDate(parsed));
    };

    const selectDate = (d: Date) => {
        setValue(d);
        setDisplay(formatDate(d));
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
        setOpen(false);
    };

    const isSameDate = (a: Date | null, b: Date | null) =>
        !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();


    const gotoPrevMonth = () => {
        const m = new Date(viewYear, viewMonth - 1, 1);
        setViewYear(m.getFullYear());
        setViewMonth(m.getMonth());
    };
    const gotoNextMonth = () => {
        const m = new Date(viewYear, viewMonth + 1, 1);
        setViewYear(m.getFullYear());
        setViewMonth(m.getMonth());
    };

    return (
        <div
            className={`relative ${className}`}
            ref={wrapperRef}
        >
            <input
                id={id}
                className={`${INPUT_BASE_CLASS}${className ? ` ${className}` : ""}`}
                type="text"
                inputMode="numeric"
                placeholder="YYYY.MM.DD"
                value={display}
                onFocus={openCalendar}
                onClick={openCalendar}
                onChange={handleInputChange}
                onBlur={handleBlur}
                readOnly={false}
            />

            {open && (
                <div className="absolute z-50 mt-5px w-[250px] rounded-default border border-purple bg-white shadow-lg">
                    <div className="flex items-center justify-between px-10px py-8px mt-10px text-xl">
                        <button type="button" className="px-6px py-6px rounded" onClick={gotoPrevMonth}>
                            {"<"}
                        </button>
                        <div className="font-bold">{`${viewYear}년 ${viewMonth + 1}월`}</div>
                        <button type="button" className="px-6px py-6px rounded" onClick={gotoNextMonth}>
                            {">"}
                        </button>
                    </div>

                    {/* 요일 헤더: 월~일 */}
                    <div className="grid grid-cols-7 gap-y-6 px-10px mt-20px">
                        {["월", "화", "수", "목", "금", "토", "일"].map((w, idx) => (
                            <div
                                key={w}
                                className={`text-center text-gray-500 text-sm ${idx >= 5 ? "text-red" : ""}`}
                            >
                                {w}
                            </div>
                        ))}
                    </div>

                    {/* 날짜 셀 */}
                    <div className="grid grid-cols-7 px-10px pb-10px">
                        {weeks.map((row, i) => (
                            <div key={i} className="contents">
                                {row.map((cell, j) => {
                                    const isSelected = isSameDate(cell.date, value);
                                    const isWeekend = [6, 0].includes(cell.date.getDay()); // 토(6), 일(0)
                                    const isOtherMonth = !cell.inCurrentMonth;

                                    // 텍스트 색상 우선순위: 선택됨 > 현재달 아님 > 주말 > 기본

                                    return (
                                        <button
                                            key={`${i}-${j}`}
                                            type="button"
                                            className={[
                                                "h-9 w-9 mx-auto rounded-full text-sm flex items-center justify-center transition-colors",
                                                isOtherMonth ? "text-calGray" : isWeekend ? "text-red" : "text-black",
                                                isSelected ? "bg-ppp text-white" : "hover:bg-ppp hover:text-white",
                                            ].join(" ")}
                                            onClick={() => {
                                                // 다른 달 날짜 클릭 시 해당 달로 이동 후 선택
                                                if (isOtherMonth) {
                                                    setViewYear(cell.date.getFullYear());
                                                    setViewMonth(cell.date.getMonth());
                                                }
                                                selectDate(cell.date);
                                            }}
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