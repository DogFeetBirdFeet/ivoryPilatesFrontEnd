import {useState} from 'react';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import iconCancel from '@/assets/icon/purple/icon_cancel.png';
import iconSave from '@/assets/icon/white/icon_save.png';
import iconSearch from '@/assets/icon_search.png';
import iconChevronDown from '@/assets/icon/white/icon_plus.png';
import type {IInsDay} from '@/features/Schedule/type/types';
import InputDate from "@/common/components/inputArea/InputDate.tsx";
import SelectBox from "@/common/components/inputArea/SelectBox.tsx";
import InputText from "@/common/components/inputArea/InputText.tsx";

interface ScheduleDetailInfoProps {
    data?: IInsDay;
    onCancel: () => void;
    onSave: () => void;
}

const mockDataAcctNm = [
    {codeId: 1, dtlNm: '원예진'},
    {codeId: 2, dtlNm: '김강사'},
    {codeId: 3, dtlNm: '이강사'},
];

const mockDataTime = [
    {codeId: 1, dtlNm: '09:00 ~ 09:50'},
    {codeId: 2, dtlNm: '10:00 ~ 10:50'},
    {codeId: 3, dtlNm: '11:00 ~ 11:50'},
    {codeId: 4, dtlNm: '12:00 ~ 12:50'},
    {codeId: 5, dtlNm: '13:00 ~ 13:50'},
    {codeId: 6, dtlNm: '14:00 ~ 14:50'},
    {codeId: 7, dtlNm: '15:00 ~ 15:50'},
    {codeId: 8, dtlNm: '16:00 ~ 16:50'},
    {codeId: 9, dtlNm: '17:00 ~ 17:50'},
    {codeId: 10, dtlNm: '18:00 ~ 18:50'},
    {codeId: 11, dtlNm: '19:00 ~ 19:50'},
    {codeId: 12, dtlNm: '20:00 ~ 20:50'},
    {codeId: 13, dtlNm: '21:00 ~ 21:50'},
];

const mockDataFixedClass = [
    {codeId: 1, dtlNm: 'Y'},
    {codeId: 2, dtlNm: 'N'},
];

const mockDataClassStatus = [
    {codeId: 1, dtlNm: '완료'},
    {codeId: 2, dtlNm: '예정'},
    {codeId: 3, dtlNm: '노쇼'},
];

export default function ScheduleDetailInfo({data, onCancel, onSave}: ScheduleDetailInfoProps) {
    const [formData, setFormData] = useState({
        memberName: data?.cusNm || '',
        instructor: data?.trainerNm || '',
        date: `${data?.year}-${String(data?.month || 1).padStart(2, '0')}-${String(data?.day || 1).padStart(2, '0')}`,
        time: `${data?.schedTime}:00 ~ ${data?.schedTime}:50`,
        fixedClass: data?.fixYn === 'Y' ? 'Y' : 'N',
        classStatus: data?.clsStatus || 'SCH'
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="w-full bg-grayWhite rounded-lg p-6">
            <div className="space-y-4">
                {/* 회원명 */}
                <div className="flex items-center gap-4">
                    <span className="text-xl text-black font-bold w-28">회원명</span>
                    <div className="flex-1 relative">
                        <InputText
                            id="memberName"
                            value={formData.memberName}
                            onChange={(value) => handleInputChange('memberName', value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="회원명을 입력하세요"
                        />
                        <img
                            src={iconSearch}
                            alt="검색"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                        />
                    </div>
                </div>

                {/* 담당강사 */}
                <div className="flex items-center gap-4">
                    <span className="text-xl text-black font-bold w-28">담당강사</span>
                    <div className="flex-1 relative">

                        <SelectBox
                            id="acctNm"
                            label=""
                            options={mockDataAcctNm}
                            value={mockDataAcctNm.find(option => option.dtlNm === formData.instructor)?.codeId || 0}
                            onChange={(value) => handleInputChange('acctNm', mockDataAcctNm.find(option => option.codeId === value)?.dtlNm || '원예진')}
                            className="px-300px ml-20px flex-1 text-center"
                        />
                        <img
                            src={iconChevronDown}
                            alt="드롭다운"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                        />
                    </div>
                </div>

                {/* 날짜 */}
                <div className="flex items-center gap-4">
                    <span className="text-xl text-black font-bold w-28">날짜</span>
                    <div className="flex-1">
                        <InputDate
                            id="date"
                            value={formData.date}
                            onChange={(value) => handleInputChange('date', value)}
                            className="ml-20px flex-1"
                        />
                    </div>
                    <BtnIconText
                        type="B"
                        icon={iconCancel}
                        text="취소하기"
                        onClick={onCancel}
                    />
                </div>

                {/* 시간 */}
                <div className="flex items-center gap-4">
                    <span className="text-xl text-black font-bold w-28">시간</span>
                    <div className="flex-1 relative">
                        <SelectBox
                            id="time"
                            label=""
                            options={mockDataTime}
                            value={mockDataTime.find(option => option.dtlNm === formData.time)?.codeId || 0}
                            onChange={(value) => handleInputChange('time', mockDataTime.find(option => option.codeId === value)?.dtlNm || '09:00 ~ 09:50')}
                            className="px-300px ml-20px flex-1 text-center"
                        />
                    </div>
                    <BtnIconText
                        type="A"
                        icon={iconSave}
                        text="저장하기"
                        onClick={onSave}
                    />
                </div>

                {/* 고정수업 여부 */}
                <div className="flex items-center gap-4">
                    <span className="text-xl text-black font-bold w-28">고정수업 여부</span>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <SelectBox
                                id="fixedClass"
                                label=""
                                options={mockDataFixedClass}
                                value={mockDataFixedClass.find(option => option.dtlNm === formData.fixedClass)?.codeId || 0}
                                onChange={(value) => handleInputChange('fixedClass', mockDataFixedClass.find(option => option.codeId === value)?.dtlNm || 'Y')}
                            />
                        </label>
                    </div>
                </div>

                {/* 수업 상태 */}
                <div className="flex items-center gap-4">
                    <span className="text-xl text-black font-bold w-28">수업 상태</span>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <SelectBox
                                id="classStatus"
                                label=""
                                options={mockDataClassStatus}
                                value={mockDataClassStatus.find(option => option.dtlNm === formData.classStatus)?.codeId || 0}
                                onChange={(value) => handleInputChange('classStatus', mockDataClassStatus.find(option => option.codeId === value)?.dtlNm || 'SCH')}
                            />
                        </label>
                    </div>
                </div>

                {/* 버튼들 */}
                <div className="flex justify-end gap-3 mt-6">


                </div>
            </div>
        </div>
    );
}
