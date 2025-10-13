import { useState } from 'react';
import InputDate from '@/common/components/inputArea/InputDate.tsx';
import InputNumber from '@/common/components/inputArea/InputNumber';
import FilterSelectBox from '@/common/components/inputArea/FilterSelectBox';

interface IClsPassInfoData {
  clsPassId: string;
  staDtm: string;
  endDtm: string;
  totalCnt: number;
  remainCnt: number;
  useYn: boolean;
  refundYn: boolean;
}

interface IClsPassInfoProps {
  data: IClsPassInfoData;
  editable: boolean;
  authority: number;
  currentUseAge: number;
  onDataChange: (data: IClsPassInfoData) => void;
}

const mockDataYN = [
  { codeId: 12, dtlNm: '사용 중' },
  { codeId: 13, dtlNm: '만료' },
];

export default function ClsPassInfo({ data, editable, authority, currentUseAge, onDataChange }: IClsPassInfoProps) {
  const [startDate, setStartDate] = useState(data.staDtm || new Date().toISOString().split('T')[0]);

  const handleDataChange = (field: keyof IClsPassInfoData, value: any) => {
    onDataChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <section className="mb-15px">
      <div className="flex items-center gap-5px mb-10px">
        <h3 className="text-3xl font-bold text-ppm py-5px my-5px">수강권 정보</h3>
        {currentUseAge !== 5 && data.clsPassId && data.remainCnt > 0 && !data.refundYn && (
          <span className="bg-blueBtn text-white text-center rounded-md h-19px w-50px">사용중</span>
        )}
        {currentUseAge !== 5 && data.clsPassId && (data.remainCnt <= 0 || data.refundYn) && (
          <span className="bg-red text-white text-center rounded-md h-19px w-50px">만료</span>
        )}
      </div>
      <div className="p-20px bg-white rounded-md">
        <div className="flex items-center py-5px my-5px">
          <span className="text-2xl font-bold text-ppm w-200px">개시 일자</span>
          {currentUseAge === 5 && (
            <InputDate
              id="staDtm"
              className="ml-20px flex-1"
              value={startDate}
              onChange={(value) => {
                setStartDate(value);
                handleDataChange('staDtm', value);
              }}
            />
          )}
          {currentUseAge !== 5 && <span className="text-2xl ml-20px">{data.staDtm}</span>}
        </div>
        <div className="flex items-center py-5px my-5px">
          {currentUseAge !== 5 && (
            <>
              <span className="text-2xl font-bold text-ppm w-200px">종료 예정 일자</span>
              {editable && authority === 2 && !data.refundYn && (
                <InputDate
                  id="endDtm"
                  className="text-2xl ml-20px"
                  value={data.endDtm}
                  onChange={(value) => handleDataChange('endDtm', value)}
                />
              )}
              {editable && authority === 2 && data.refundYn && <span className="text-2xl ml-20px">{data.endDtm}</span>}
              {editable && authority === 1 && <span className="text-2xl ml-20px">{data.endDtm}</span>}
              {!editable && <span className="text-2xl ml-20px">{data.endDtm}</span>}
            </>
          )}
        </div>
        <div className="flex items-center py-5px my-5px">
          <span className="text-2xl font-bold text-ppm w-200px">총 회차</span>
          {currentUseAge !== 5 && (
            <>
              {editable && authority === 2 && !data.refundYn && (
                <InputNumber
                  id="totalCnt"
                  value={data.totalCnt}
                  onChange={(value) => handleDataChange('totalCnt', Number(value))}
                  suffix="회"
                  className="text-xl ml-20px flex-1"
                />
              )}
              {editable && authority === 2 && data.refundYn && (
                <span className="text-2xl ml-20px">{data.totalCnt} 회</span>
              )}
              {editable && authority === 1 && <span className="text-2xl ml-20px">{data.totalCnt} 회</span>}
              {!editable && <span className="text-2xl ml-20px">{data.totalCnt} 회</span>}
            </>
          )}
          {currentUseAge === 5 && (
            <>
              <InputNumber
                id="totalCnt"
                className="text-2xl ml-20px flex-1 text-right"
                value={data.totalCnt}
                onChange={(value) => handleDataChange('totalCnt', Number(value))}
                suffix="회"
              />
            </>
          )}
        </div>
        <div className="flex items-center py-5px my-5px">
          {currentUseAge !== 5 && (
            <>
              <span className="text-2xl font-bold text-ppm w-200px">잔여 회차</span>
              <span className="text-2xl ml-20px">{data.remainCnt} 회</span>
            </>
          )}
        </div>
        <div className="flex items-center py-5px my-5px">
          {editable && authority === 2 && !data.refundYn && currentUseAge !== 5 && (
            <>
              <span className="text-2xl font-bold text-ppm w-200px">만료 여부</span>
              <FilterSelectBox
                id="useYn"
                label=""
                options={mockDataYN}
                value={data.useYn ? 12 : 13}
                className="text-2xl ml-20px"
                onChange={(value) => handleDataChange('useYn', value === 12)}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
