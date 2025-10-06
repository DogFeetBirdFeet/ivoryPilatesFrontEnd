import {useEffect, useState} from 'react';
import {useLayoutContext} from '@/hooks/useLayoutContext';
import WeeklyCalender from '@/features/Schedule/items/WeeklyCalender';
import CenterAndAcctInfo from '@/features/Schedule/items/CenterAndAcctInfo';
import IconSchedule from '@/assets/icon/yellow/icon_sche.png';
import SectionDailySchedule from '@/features/Schedule/sections/SectionDailySchedule';
import iconClock from '@/assets/icon_clock.png';
import iconPlus from '@/assets/icon/white/icon_plus.png';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import ScheduleInfo from '@/features/Schedule/items/ScheduleInfo';
import {scheduleApi} from '@/services/api';
import type {IInsDay} from '@/features/Schedule/type/types';

export default function InsDay() {

    const [today] = useState(() => new Date());
    const [currentWeek, setCurrentWeek] = useState<Date>(() => new Date());
    const [curDate, setCurDate] = useState<number>(today.getDate());
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<number>(today.getDay());
    const [data, setData] = useState<IInsDay[]>([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState<string | null>(`slot-${new Date().getHours()}`);
    const [, setIsLoading] = useState<boolean>(false);

    const loadScheduleData = async (param: { schDate: string }) => {
        setIsLoading(true);
        try {
            const response = await scheduleApi.getScheduleList(param);
            setData(response?.data || []);

            console.log(response?.data);
        } catch (error) {
            console.error('데이터 로드 실패:', error);
        } finally {
            setIsLoading(false);
        }
    }

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
        // 현재 선택된 날짜를 YYYYMMDD 형식으로 변환
        const selectedDate = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), curDate);
        const schDate = selectedDate.getFullYear().toString() +
            (selectedDate.getMonth() + 1).toString().padStart(2, '0') +
            selectedDate.getDate().toString().padStart(2, '0');

        const initialFormValues = {schDate: schDate};
        loadScheduleData(initialFormValues);

    }, [curDate, currentWeek]);

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
                        <CenterAndAcctInfo data={data}/>
                        <div className="flex-1 flex items-center justify-center bg-white py-20px">
                            <SectionDailySchedule
                                selectedRowIndex={selectedRowIndex}
                                data={data}
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
                                        {data?.find(item =>
                                            item.schedTime === parseInt(selectedRowIndex?.replace('slot-', '') || '0').toString()
                                        )?.acctOffYn === 'Y' && <span className="text-red">강사 휴식 | </span>}
                                        <span className="text-gray-600">
                                            {data?.find(item =>
                                                item.schedTime === parseInt(selectedRowIndex?.replace('slot-', '') || '0').toString()
                                            )?.trainerNm || '원예진'} 강사
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 오른쪽 섹션 - 버튼들 */}
                            <div className="flex gap-3">
                                {/* 스케줄 추가 버튼 */}
                                <BtnIconText
                                    type="A"
                                    icon={iconPlus}
                                    text="스케줄 추가하기"
                                    onClick={() => {
                                        console.log('스케줄 추가');
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-20px">
                            <ScheduleInfo
                                data={data?.find(item =>
                                    item.schedTime === parseInt(selectedRowIndex?.replace('slot-', '') || '0').toString()
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}