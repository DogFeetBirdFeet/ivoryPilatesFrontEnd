import {useEffect, useState} from 'react';
import {useLayoutContext} from '@/hooks/useLayoutContext';
import WeeklyCalender from '@/features/Schedule/items/WeeklyCalender';
import CenterAndAcctInfo from '@/features/Schedule/items/CenterAndAcctInfo';
import IconSchedule from '@/assets/icon/yellow/icon_sche.png';
import SectionDailySchedule from '@/features/Schedule/sections/SectionDailySchedule';
import iconClock from '@/assets/icon_clock.png';

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
    const [selectedRowIndex, setSelectedRowIndex] = useState<string | null>(`slot-${new Date().getHours()}`);

    // 선택된 시간에서 시간 범위 계산
    const getTimeRange = () => {
        if (!selectedRowIndex) return {start: '00:00', end: '00:50'};

        const hour = parseInt(selectedRowIndex.replace('slot-', ''));
        const startTime = `${hour.toString().padStart(2, '0')}:00`;
        const endHour = hour;
        const endMinute = 50;
        const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

        return {start: startTime, end: endTime};
    };

    const timeRange = getTimeRange();

    // 헤더정보 세팅
    const {setHeaderTitle, setHeaderIcon} = useLayoutContext();

    useEffect(() => {
        setHeaderTitle('강사 일간 일정');
        setHeaderIcon(IconSchedule);
        console.log(selectedRowIndex, selectedDayOfWeek);
    }, [setHeaderTitle, setHeaderIcon, selectedRowIndex, selectedDayOfWeek]);


    return (
        <>
            <div className="flex-1 flex flex-col bg-ppLight">
                <WeeklyCalender
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                    curDate={curDate}
                    setCurDate={setCurDate}
                    selectedDayOfWeek={selectedDayOfWeek}
                    setSelectedDayOfWeek={setSelectedDayOfWeek}
                />
            </div>
            <div className="flex-1 flex flex-col py-20px">
                <div className="flex gap-20px mb-15px">
                    <div className="flex-1 bg-ppLight">
                        <CenterAndAcctInfo mockData={mockData}/>
                        <div className="flex-1 flex items-center justify-center bg-white py-20px">
                            <SectionDailySchedule
                                selectedRowIndex={selectedRowIndex}
                                setSelectedRowIndex={setSelectedRowIndex}
                            />
                        </div>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            {/* 왼쪽 섹션 - 시계 아이콘과 시간 정보 */}
                            <div className="flex items-center gap-4">
                                <img src={iconClock} alt="시계" className="w-16 h-16"/>
                                <div className="flex flex-col">
                                    <div className="text-2xl font-bold text-gray-800">
                                        {timeRange.start} ~ {timeRange.end}
                                    </div>
                                    <div className="text-lg">
                                        <span className="text-red-500">강사 휴식</span>
                                        <span className="text-gray-600 mx-2">|</span>
                                        <span className="text-gray-600">원예진 강사</span>
                                    </div>
                                </div>
                            </div>

                            {/* 오른쪽 섹션 - 버튼들 */}
                            <div className="flex gap-3">
                                {/* 스케줄 추가 버튼 */}
                                <button
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-bold transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    스케줄 추가하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}