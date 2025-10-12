import {useState} from 'react';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import iconCancel from '@/assets/icon/purple/icon_cancel.png';
import iconSave from '@/assets/icon/white/icon_save.png';
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
    {codeId: 1, dtlNm: 'SCH'},
    {codeId: 2, dtlNm: 'COM'},
    {codeId: 3, dtlNm: 'NOS'},
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
                <div className="flex items-center flex-1">
                    <label className="text-xl text-black font-bold w-28">회원명</label>
                    <div className="flex-1 relative">
                        <InputText
                            id="memberName"
                            value={formData.memberName}
                            onChange={(value) => handleInputChange('memberName', value)}
                            className="w-full ml-20px text-center min-w-500px"
                            placeholder="회원명을 입력하세요"
                        />
                    </div>
                </div>

                {/* 담당강사 */}
                <div className="flex items-center flex-1">
                    <label className="text-xl text-black font-bold w-28">담당강사</label>
                    <div className="flex-1 relative">
                        <SelectBox
                            id="acctNm"
                            label=""
                            options={mockDataAcctNm}
                            value={mockDataAcctNm.find(option => option.dtlNm === formData.instructor)?.codeId || 0}
                            onChange={(value) => handleInputChange('acctNm', mockDataAcctNm.find(option => option.codeId === value)?.dtlNm || '원예진')}
                            className="w-full ml-20px text-center"
                            style={{minWidth: '300px'}}
                        />
                    </div>
                </div>

                {/* 날짜 */}
                <div className="flex items-center flex-1">
                    <label className="text-xl text-black font-bold w-28">날짜</label>
                    <div className="flex-1 relative ">
                        <InputDate
                            id="date"
                            value={formData.date}
                            onChange={(value) => handleInputChange('date', value)}
                            className="ml-20px flex-1 w-400px"
                        />
                    </div>
                    <div className="ml-20px">
                        <BtnIconText
                            type="B"
                            icon={iconCancel}
                            text="취소하기"
                            onClick={onCancel}
                        />
                    </div>
                </div>

                {/* 시간 */}
                <div className="flex items-center flex-1">
                    <label className="text-xl text-black font-bold w-28">
                        시간
                    </label>
                    <div className="flex-1 relative">
                        <SelectBox
                            id="time"
                            label=""
                            options={mockDataTime}
                            value={mockDataTime.find(option => option.dtlNm === formData.time)?.codeId || 0}
                            onChange={(value) => handleInputChange('time', mockDataTime.find(option => option.codeId === value)?.dtlNm || '09:00 ~ 09:50')}
                            className="ml-20px text-center"
                            style={{minWidth: '300px'}}
                        />
                    </div>
                    <div className="ml-20px">
                        <BtnIconText
                            type="A"
                            icon={iconSave}
                            text="저장하기"
                            onClick={onSave}
                        />
                    </div>
                </div>

                {/* 고정수업 여부 */}
                <div className="flex items-center flex-1">
                    <label className="text-xl text-black font-bold w-28">
                        고정수업 여부
                    </label>
                    <div className="flex-1 flex items-center gap-20px ml-20px">
                        <label className="flex items-center gap-5px cursor-pointer">
                            <input
                                type="radio"
                                name="fixedClass"
                                value="Y"
                                checked={formData.fixedClass === 'Y'}
                                onChange={(e) => handleInputChange('fixedClass', mockDataFixedClass.find(option => option.dtlNm === e.target.value)?.dtlNm || 'Y')}
                            />
                            <span className="text-sm">Y</span>
                        </label>
                        <label className="flex items-center gap-5px cursor-pointer">
                            <input
                                type="radio"
                                name="fixedClass"
                                value="N"
                                checked={formData.fixedClass === 'N'}
                                onChange={(e) => handleInputChange('fixedClass', mockDataFixedClass.find(option => option.dtlNm === e.target.value)?.dtlNm || 'N')}
                            />
                            <span className="text-sm">N</span>
                        </label>
                    </div>
                </div>
                {/* 수업 상태 */}
                <div className="flex items-center flex-1">
                    <label className="text-xl text-black font-bold w-28">
                        수업 상태
                    </label>
                    <div className="flex-1 flex items-center gap-20px ml-20px">
                        <label className="flex items-center gap-5px cursor-pointer">
                            <input
                                type="radio"
                                name="classStatus"
                                value="SCH"
                                checked={formData.classStatus === 'SCH'}
                                onChange={(e) => handleInputChange('classStatus', mockDataClassStatus.find(option => option.dtlNm === e.target.value)?.dtlNm || 'SCH')}
                            />
                            <span className="text-sm">완료</span>
                        </label>
                        <label className="flex items-center gap-5px cursor-pointer">
                            <input
                                type="radio"
                                name="classStatus"
                                value="COM"
                                checked={formData.classStatus === 'COM'}
                                onChange={(e) => handleInputChange('classStatus', mockDataClassStatus.find(option => option.dtlNm === e.target.value)?.dtlNm || 'COM')}
                            />
                            <span className="text-sm">예정</span>
                        </label>
                        <label className="flex items-center gap-5px cursor-pointer">
                            <input
                                type="radio"
                                name="classStatus"
                                value="NOS"
                                checked={formData.classStatus === 'NOS'}
                                onChange={(e) => handleInputChange('classStatus', mockDataClassStatus.find(option => option.dtlNm === e.target.value)?.dtlNm || 'NOS')}
                            />
                            <span className="text-sm">노쇼</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
