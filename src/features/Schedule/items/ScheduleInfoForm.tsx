import { useEffect, useState } from 'react';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import iconCancel from '@/assets/icon/purple/icon_cancel.png';
import iconSave from '@/assets/icon/white/icon_save.png';
import type { ISchData } from '@/features/Schedule/type/types';
import InputDate from '@/common/components/inputArea/InputDate.tsx';
import { dateFormatToString, stringToDate } from '@/utils/date';
import type { SCHEDULE_STATUS, SCHEDULE_TYPE } from '@/constants/schedule';
import SelectBox from '@/common/components/inputArea/SelectBox';
import SearchInputCus from '@/common/components/inputArea/SearchInputCus';

interface IScheduleFormProps {
  data?: ISchData;
  onCancel: () => void;
  onSave: () => void;
  initDate?: string;
  initTime?: string;
}

interface IFormData {
  schedId?: string;
  cusId: string;
  cusNm: string;
  trainerId: string;
  trainerNm: string;
  schedDate: string;
  schedTime: string;
  fixYn?: string;
  grpType?: keyof typeof SCHEDULE_TYPE | null;
  clsStatus?: keyof typeof SCHEDULE_STATUS;
}

const mockDataAcctNm = [
  { codeId: '1', dtlNm: '원예진 강사' },
  { codeId: '2', dtlNm: '신화원 강사' },
  { codeId: '3', dtlNm: '김용진 강사' },
];

const mockDataTime = [
  { codeId: '9', dtlNm: '09:00 ~ 09:50' },
  { codeId: '10', dtlNm: '10:00 ~ 10:50' },
  { codeId: '11', dtlNm: '11:00 ~ 11:50' },
  { codeId: '12', dtlNm: '12:00 ~ 12:50' },
  { codeId: '13', dtlNm: '13:00 ~ 13:50' },
  { codeId: '14', dtlNm: '14:00 ~ 14:50' },
  { codeId: '15', dtlNm: '15:00 ~ 15:50' },
  { codeId: '16', dtlNm: '16:00 ~ 16:50' },
  { codeId: '17', dtlNm: '17:00 ~ 17:50' },
  { codeId: '18', dtlNm: '18:00 ~ 18:50' },
  { codeId: '19', dtlNm: '19:00 ~ 19:50' },
  { codeId: '20', dtlNm: '20:00 ~ 20:50' },
  { codeId: '21', dtlNm: '21:00 ~ 21:50' },
];

export default function ScheduleInfoForm({ data, onCancel, onSave, initDate, initTime }: IScheduleFormProps) {
  const isEdit = !!data;
  const [formData, setFormData] = useState<IFormData>(
    data || {
      cusId: '',
      cusNm: '',
      trainerId: '',
      trainerNm: '',
      schedDate: initDate as string,
      schedTime: initTime as string,
    }
  );

  useEffect(() => {
    if (data) {
      setFormData({ ...data, cusNm: data.cusNm + ' 회원님' });
    } else {
      setFormData({
        cusId: '',
        cusNm: '',
        trainerId: mockDataAcctNm[0].codeId,
        trainerNm: mockDataAcctNm[0].dtlNm,
        schedDate: initDate as string,
        schedTime: initTime as string,
      });
    }
  }, [data, initDate, initTime]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full grid grid-cols-[auto_90px] gap-20px align-middle bg-grayWhite rounded-default p-20px">
      <div className="flex">
        {/* 스케줄 정보 헤더 */}
        <div className="flex flex-col w-150px gap-10px justify-between text-xl text-black font-bold">
          <p>회원명</p>
          <p>담당강사</p>
          <p>날짜</p>
          <p>시간</p>
          {isEdit && (
            <>
              {data.fixYn === 'Y' && <p>고정수업 여부</p>}
              <p>수업 상태</p>
            </>
          )}
        </div>

        {/* 스케줄 정보 내용 */}
        <div className="flex-1 min-w-[230px] max-w-[400px] flex flex-col gap-10px justify-between">
          {/* 회원명 */}
          <SearchInputCus
            id="cusNm"
            value={formData.cusNm}
            onChange={(value) => {
              handleInputChange('cusNm', value);
            }}
            onSearch={(data) => {
              const cusNm = `${data.memberName} 회원님 ${data.grpType === 'D' ? '(2:1 그룹회원)' : ''}`;
              handleInputChange('cusNm', cusNm);
              handleInputChange('cusId', data.memberId);
            }}
          />

          {/* 강사 */}
          <SelectBox
            id="trainerNm"
            options={mockDataAcctNm}
            value={formData.trainerId}
            center={true}
            onChange={(value) => {
              handleInputChange('trainerNm', mockDataAcctNm.find((option) => option.codeId === value)?.dtlNm || '');
              handleInputChange('trainerId', value);
            }}
          />
          {/* 날짜 */}
          <InputDate
            id="schedDate"
            value={stringToDate(formData.schedDate)}
            onChange={(value) => handleInputChange('schedDate', dateFormatToString(value, false))}
          />
          {/* 시간 */}
          <SelectBox
            id="schedTime"
            options={mockDataTime}
            value={formData.schedTime || mockDataTime[0].codeId}
            center={true}
            onChange={(value) => {
              handleInputChange('schedTime', value);
            }}
          />

          {isEdit && (
            <>
              {/* 고정수업 여부 */}
              {data.fixYn === 'Y' && (
                <div className="h-30px flex items-center gap-20px">
                  <div className="flex items-center gap-5px">
                    <input
                      type="radio"
                      id="fixYn_Y"
                      value="Y"
                      checked={formData.fixYn === 'Y'}
                      onChange={() => handleInputChange('fixYn', 'Y')}
                    />
                    <label htmlFor="fixYn_Y" className="text-sm cursor-pointer">
                      Y
                    </label>
                  </div>
                  <div className="flex items-center gap-5px">
                    <input
                      type="radio"
                      id="fixYn_N"
                      value="N"
                      checked={formData.fixYn === 'N'}
                      onChange={() => handleInputChange('fixYn', 'N')}
                    />
                    <label htmlFor="fixYn_N" className="text-sm cursor-pointer">
                      N
                    </label>
                  </div>
                </div>
              )}

              {/* 수업 상태 */}
              <div className="h-30px flex items-center gap-20px">
                <div className="flex items-center gap-5px">
                  <input
                    type="radio"
                    id="clsStatus_SCH"
                    value="SCH"
                    checked={formData.clsStatus === 'SCH'}
                    onChange={() => handleInputChange('clsStatus', 'SCH')}
                  />
                  <label htmlFor="clsStatus_SCH" className="text-sm cursor-pointer">
                    예정
                  </label>
                </div>
                <div className="flex items-center gap-5px">
                  <input
                    type="radio"
                    id="clsStatus_COM"
                    value="COM"
                    checked={formData.clsStatus === 'COM'}
                    onChange={() => handleInputChange('clsStatus', 'COM')}
                  />
                  <label htmlFor="clsStatus_COM" className="text-sm cursor-pointer">
                    완료
                  </label>
                </div>
                <div className="flex items-center gap-5px">
                  <input
                    type="radio"
                    id="clsStatus_NOS"
                    value="NOS"
                    checked={formData.clsStatus === 'NOS'}
                    onChange={() => handleInputChange('clsStatus', 'NOS')}
                  />
                  <label htmlFor="clsStatus_NOS" className="text-sm cursor-pointer">
                    노쇼
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex flex-col justify-center gap-10px">
        <BtnIconText type="B" icon={iconCancel} text="취소하기" onClick={onCancel} />
        <BtnIconText type="A" icon={iconSave} text="저장하기" onClick={onSave} />
      </div>
    </div>
  );
}
