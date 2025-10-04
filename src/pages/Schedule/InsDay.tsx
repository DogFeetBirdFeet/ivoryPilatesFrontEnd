import {useEffect, useMemo, useState} from 'react';
import {useLayoutContext} from '@/hooks/useLayoutContext';
import {WEEKDAYS_SCHEDULE_KR} from '@/constants/days';
import type {WeekDay} from '@/features/Dashboard/types';
import WeeklyDate from '@/features/Schedule/items/WeeklyDate';
import IconSchedule from '@/assets/icon/yellow/icon_sche.png';
import pilatesAcct from '@/assets/pilates_acct.png';
import pilatesLogo from '@/assets/pilates_logo.png';
import iconSettings from '@/assets/icon/purple/icon_setting.png';
import iconVac from '@/assets/icon/purple/icon_vac.png';
import iconLeft from '@/assets/chevrons_left_one.png';
import iconRight from '@/assets/chevrons_right_one.png';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import SectionDailySchedule from '@/features/Schedule/sections/SectionDailySchedule';

interface IInsDay {
    centerInfo: boolean;
    acctInfo: string[];
}

const generateMockData = (count: number): IInsDay[] => {
    return Array.from({length: count}, (_, i) => ({
        centerInfo: Math.random() > 0.5,
        acctInfo: Math.random() > 0.5 ? [] : ["강사 " + i, "강사 " + (i + 1), "강사 " + (i + 2)],
    }));
};

export default function InsDay() {

    const [today] = useState(() => new Date());
    const [currentWeek, setCurrentWeek] = useState<Date>(() => new Date());
    const [curDate, setCurDate] = useState<number>(today.getDate());
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<number>(today.getDay());
    const [mockData] = useState<IInsDay[]>(generateMockData(1));


    // 헤더정보 세팅
    const {setHeaderTitle, setHeaderIcon} = useLayoutContext();

    useEffect(() => {
        setHeaderTitle('강사 일간 일정');
        setHeaderIcon(IconSchedule);
    }, [setHeaderTitle, setHeaderIcon]);

    const handleLeftClick = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(newWeek);

        // 같은 요일의 날짜를 찾아서 선택
        const targetDate = new Date(newWeek);
        const currentDay = newWeek.getDay();
        const monOffset = currentDay === 0 ? -6 : 1 - currentDay;

        // selectedDayOfWeek를 월요일 기준 인덱스로 변환
        const scheduleIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1;
        targetDate.setDate(newWeek.getDate() + monOffset + scheduleIndex);
        setCurDate(targetDate.getDate());
    };

    const handleRightClick = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(newWeek);

        // 같은 요일의 날짜를 찾아서 선택
        const targetDate = new Date(newWeek);
        const currentDay = newWeek.getDay();
        const monOffset = currentDay === 0 ? -6 : 1 - currentDay;

        // selectedDayOfWeek를 월요일 기준 인덱스로 변환
        const scheduleIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1;
        targetDate.setDate(newWeek.getDate() + monOffset + scheduleIndex);
        setCurDate(targetDate.getDate());
    };

    // 주간 날짜 계산을 메모이제이션
    const weekDays: WeekDay[] = useMemo(() => {
        const days = [];
        const currentDay: number = currentWeek.getDay();
        // 월요일(1)부터 시작하도록 오프셋 계산
        const monOffset: number = currentDay === 0 ? -6 : 1 - currentDay;

        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeek);
            date.setDate(currentWeek.getDate() + monOffset + i);

            days.push({
                date: date.getDate(),
                day: WEEKDAYS_SCHEDULE_KR[i], // 이미 월요일부터 시작하도록 수정됨
                fullDate: date,
                isCurDate: curDate === date.getDate(),
            });
        }

        return days;
    }, [currentWeek, curDate]);

    // 선택된 인덱스 계산
    const selectedIndex: number = weekDays.findIndex((day: WeekDay) => day.isCurDate);

    // 화살표 위치 계산
    const arrowLeft: string = useMemo(() => {
        if (selectedIndex === -1) return '0px';

        const buttonWidth: number = 60; // WeeklyDate 버튼 너비
        const gap: number = 8; // 버튼 간 간격 (gap-2 = 8px)
        const arrowWidth: number = 20; // borderLeft(10px) + borderRight(10px)
        const leftOffset: number = 56; // 왼쪽 화살표 버튼 너비 + 패딩

        const buttonPosition = leftOffset + selectedIndex * (buttonWidth + gap);
        return `${buttonPosition + buttonWidth / 2 - arrowWidth / 2}px`;
    }, [selectedIndex]);

    return (
        <>
            <div className="flex-1 flex flex-col bg-ppLight">

                {/* 주간 캘린더 */}
                <div className="bg-gray-100 rounded-lg p-4 h-110px">
                    <div className="flex items-center justify-center gap-4">
                        {/* 왼쪽 화살표 */}
                        <button
                            className="w-10 h-10 bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp/80 transition-colors"
                            onClick={handleLeftClick}>
                            <img src={iconLeft} alt="왼쪽 화살표"/>
                        </button>

                        {/* 날짜 버튼들 */}
                        <div className="flex gap-2">
                            {weekDays.map((day: WeekDay) => (
                                <WeeklyDate
                                    key={`res_${day.day}`}
                                    day={day}
                                    onClick={() => {
                                        setCurDate(day.date);
                                        setCurrentWeek(day.fullDate);
                                        setSelectedDayOfWeek(day.fullDate.getDay());
                                    }}
                                />
                            ))}
                        </div>

                        {/* 오른쪽 화살표 */}
                        <button
                            className="w-10 h-10 bg-ppp rounded-full flex items-center justify-center text-white hover:bg-ppp/80 transition-colors"
                            onClick={handleRightClick}>
                            <img src={iconRight} alt="오른쪽 화살표"/>
                        </button>
                    </div>
                </div>

                {/* 화살표 */}
                <div className="relative h-15px">
                    <div
                        className="absolute top-0 w-0 h-0 transition-all duration-200 ease-in-out"
                        style={{
                            left: arrowLeft,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderBottom: '15px solid #E8E6F8',
                        }}
                    />
                </div>
            </div>
            <div className="flex-1 flex flex-col py-20px">
                <div className="flex gap-20px mb-15px">
                    <div className="flex-1 bg-ppLight">
                        <div className="flex-1 flex items-center justify-between mb-10px">
                            <div className="flex items-center gap-4">
                                <img src={pilatesLogo} className="w-70px h-70px" draggable="false" alt={''}/>
                                <p className="text-xl font-bold">센터 </p>
                                {mockData[0].centerInfo && (
                                    <p className="text-xl text-red text-center">휴무일</p>
                                )}
                                {!mockData[0].centerInfo && (
                                    <p className="text-xl text-black text-center">휴무일이 아닙니다</p>
                                )}
                            </div>
                            <BtnIconText
                                type="B"
                                icon={iconSettings}
                                text="휴무 변경하기"
                                onClick={() => {
                                    console.log('센터 설정');
                                }}
                            />
                        </div>
                        <div className="flex-1 flex items-center justify-between mb-10px">
                            <div className="flex items-center gap-4">
                                <img src={pilatesAcct} className="w-70px h-70px" draggable="false" alt={''}/>
                                <p className="text-xl font-bold">강사 </p>
                                {mockData[0].acctInfo.length > 0 && (
                                    <>
                                        {mockData[0].acctInfo.map((acct) => (
                                            <p className="text-xl text-red text-center">{acct} 휴가</p>
                                        ))}
                                    </>
                                )}
                                {mockData[0].acctInfo.length === 0 && (
                                    <p className="text-xl text-black text-center">휴가자가 없습니다</p>
                                )}
                            </div>
                            <BtnIconText
                                type="B"
                                icon={iconVac}
                                text="휴가 추가하기"
                                onClick={() => {
                                    console.log('강사 설정');
                                }}
                            />
                        </div>
                        <div className="flex-1 flex items-center justify-center bg-white py-20px">
                            <SectionDailySchedule/>
                        </div>
                    </div>
                    <div className="flex-1">
                    </div>
                </div>
            </div>
        </>
    );
}