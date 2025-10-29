import Textarea from '@/common/components/inputArea/Textarea.tsx';
import InputNumber from '@/common/components/inputArea/InputNumber';
import InputDate from '@/common/components/inputArea/InputDate.tsx';
import SelectBox from '@/common/components/inputArea/SelectBox';
import { dateFormatToString, stringToDate } from '@/utils/date';

interface IClsPayInfoData {
  paidAmt: number;
  discountAmtPass: number;
  payDate: string;
  payMethod: string;
  instMm: number;
  payUserNm: string;
  remark: string;
  refundDtm: string;
  refundAmt: number;
}

interface IClsPayInfoProps {
  data: IClsPayInfoData;
  editable: boolean;
  authority: number;
  currentUseAge: number;
  onDataChange: (data: Partial<IClsPayInfoData>) => void;
}

const mockDataPAYMET = [
  { codeId: '7', dtlNm: 'CARD' },
  { codeId: '8', dtlNm: 'CASH' },
];

export default function ClsPayInfo({ data, editable, authority, currentUseAge, onDataChange }: IClsPayInfoProps) {
  const handleDataChange = (field: keyof IClsPayInfoData, value: any) => {
    onDataChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div>
      <section className="mb-[15px]">
        <div className="flex items-center gap-[5px] mb-[10px]">
          <h3 className="text-2xl font-bold text-ppm py-[5px] my-[5px]">결제정보</h3>
        </div>
        <div className="p-[20px] bg-ppLight rounded-md">
          <div className="flex items-center py-[5px] my-[5px]">
            <span className="text-xl font-bold text-ppm w-[200px]">결제 금액</span>
            <span className="text-xl ml-[20px] w-full">{data.paidAmt.toLocaleString()}</span>
          </div>
          {}
          <div className="flex items-center py-[5px] my-[5px]">
            {currentUseAge === 5 && authority === 2 && (
              <>
                <span className="text-xl font-bold text-ppm w-[200px]">추가 할인 금액</span>
                <InputNumber
                  id="discountAmtPass"
                  value={data.discountAmtPass}
                  onChange={(value) => handleDataChange('discountAmtPass', Number(value))}
                  className="w-full"
                  suffix="원"
                />
              </>
            )}
            {currentUseAge !== 5 && (
              <>
                <span className="text-xl font-bold text-ppm w-[200px]">추가 할인 금액</span>
                <span className="text-xl ml-[20px]">{data.discountAmtPass.toLocaleString()}</span>
              </>
            )}
          </div>
          <div className="flex items-center py-[5px] my-[5px]">
            <span className="text-xl font-bold text-ppm w-[200px]">결제 일자</span>
            {currentUseAge === 5 && (
              <>
                <InputDate
                  id="payDate"
                  value={stringToDate(
                    data.payDate?.length === 8 ? data.payDate : dateFormatToString(new Date(), false)
                  )}
                  onChange={(value) => handleDataChange('payDate', value)}
                  className="w-full"
                />
              </>
            )}
            {currentUseAge !== 5 && <span className="text-xl ml-[20px]">{data.payDate}</span>}
          </div>
          <div className="flex items-center py-[5px] my-[5px]">
            <span className="text-xl font-bold text-ppm w-[200px]">결제 수단</span>
            {currentUseAge === 5 && (
              <>
                <SelectBox
                  id="payMethod"
                  options={mockDataPAYMET}
                  value={mockDataPAYMET.find((option) => option.dtlNm === data.payMethod)?.codeId || '0'}
                  onChange={(value) =>
                    handleDataChange(
                      'payMethod',
                      mockDataPAYMET.find((option) => option.codeId === value)?.dtlNm || 'CARD'
                    )
                  }
                  className="w-full"
                />
              </>
            )}
            {currentUseAge !== 5 && <span className="text-xl ml-[20px]">{data.payMethod}</span>}
          </div>
          <div className="flex items-center py-[5px] my-[5px]">
            <span className="text-xl font-bold text-ppm w-[200px]">할부개월수</span>
            {currentUseAge === 5 && (
              <>
                <InputNumber
                  id="instMm"
                  value={data.instMm}
                  onChange={(value) => handleDataChange('instMm', Number(value))}
                  className="w-full"
                  suffix="개월"
                />
              </>
            )}
            {currentUseAge !== 5 && <span className="text-xl ml-[20px]">{data.instMm}개월</span>}
          </div>
          <div className="flex items-center py-[5px] my-[5px]">
            {currentUseAge !== 5 && (
              <>
                <span className="text-xl font-bold text-ppm w-[200px]">결제자</span>
                <span className="text-xl ml-[20px]">{data.payUserNm}</span>
              </>
            )}
          </div>
          <div className="flex items-center py-[5px] my-[5px]">
            <span className="text-xl font-bold text-ppm w-[200px] ">메모</span>
            {currentUseAge === 5 && (
              <Textarea
                id="remark"
                value={data.remark}
                onChange={(value) => onDataChange({ remark: value })}
                className="w-full"
              />
            )}
            {editable && (
              <Textarea
                id="remark"
                value={data.remark}
                onChange={(value) => onDataChange({ remark: value })}
                className="w-full"
              />
            )}
            {!editable && <span className="text-xl ml-[20px]">{data.remark}</span>}
          </div>
        </div>
      </section>
      {/* 만료 + 환불 O */}
      {currentUseAge === 2 && (
        <section>
          <div className="p-[20px] bg-red2 rounded-md mb-[10px] py-[5px] my-[50px]">
            <div className="flex items-center py-[5px] my-[5px]">
              <span className="text-xl font-bold text-white w-[200px]">환불 일자</span>
              <span className="text-xl text-white ml-[20px] w-[200px]">{data.refundDtm}</span>
              <span className="text-xl font-bold text-white w-[200px]">환불 금액</span>
              <span className="text-xl text-white ml-[20px]">{data.refundAmt.toLocaleString()}</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
