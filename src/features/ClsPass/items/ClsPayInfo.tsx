import Textarea from "@/common/components/inputArea/Textarea.tsx";
import InputNumber from "@/common/components/inputArea/InputNumber";
import InputDate from "@/common/components/inputArea/InputDate.tsx";
import SelectBox from "@/common/components/inputArea/SelectBox.tsx";
import InputText from "@/common/components/inputArea/InputText.tsx";

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
    currentUseAge: number;
    onDataChange: (data: Partial<IClsPayInfoData>) => void;
}

const mockDataPAYMET = [
    {codeId: 7, dtlNm: 'CARD'},
    {codeId: 8, dtlNm: 'CASH'},
];

export default function ClsPayInfo({data, editable, currentUseAge, onDataChange}: IClsPayInfoProps) {

    const handleDataChange = (field: keyof IClsPayInfoData, value: any) => {
        onDataChange({
            ...data,
            [field]: value
        });
    };

    return (
        <div className="flex-1">
            <section>
                <h3 className="text-3xl font-bold mb-10px">결제정보</h3>
                <div className="p-20px bg-whiteGray rounded-default shadow-md">
                    <div className="flex justify-between py-5px my-5px">
                        <span className="text-2xl font-bold">결제 금액</span>
                        <span className="text-xl">{data.paidAmt.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between py-5px my-5px">
                        <span className="text-2xl font-bold">추가 할인 금액</span>
                        {currentUseAge === 5 && (
                            <>
                                <InputNumber
                                    id="discountAmtPass"
                                    value={data.discountAmtPass}
                                    onChange={(value) => handleDataChange('discountAmtPass', Number(value))}
                                    suffix="회"
                                />
                            </>
                        )}
                        {currentUseAge !== 5 && (
                            <>
                                <span className="text-xl">{data.discountAmtPass.toLocaleString()}원</span>
                            </>
                        )}
                    </div>
                    <div className="flex justify-between py-5px my-5px">
                        <span className="text-2xl font-bold">결제 일자</span>
                        {currentUseAge === 5 && (
                            <>
                                <InputDate
                                    id="payDate"
                                    value={data.payDate}
                                    onChange={(value) => handleDataChange('payDate', value)}
                                />
                            </>
                        )}
                        {currentUseAge !== 5 && (
                            <span className="text-xl">{data.payDate}</span>
                        )}
                    </div>
                    <div className="flex justify-between py-5px my-5px">
                        <span className="text-2xl font-bold">결제 수단</span>
                        {currentUseAge === 5 && (
                            <>
                                <SelectBox
                                    id="payMethod"
                                    label=""
                                    options={mockDataPAYMET}
                                    value={mockDataPAYMET.find(option => option.dtlNm === data.payMethod)?.codeId || 0}
                                    onChange={(value) => handleDataChange('payMethod', mockDataPAYMET.find(option => option.codeId === value)?.dtlNm || 'CARD')}
                                />
                            </>
                        )}
                        {currentUseAge !== 5 && (
                            <span className="text-xl">{data.payMethod}</span>
                        )}
                    </div>
                    <div className="flex justify-between py-5px my-5px">
                        <span className="text-2xl font-bold">할부개월수</span>
                        {currentUseAge === 5 && (
                            <>
                                <InputNumber
                                    id="instMm"
                                    value={data.instMm}
                                    onChange={(value) => handleDataChange('instMm', Number(value))}
                                />
                            </>
                        )}
                        {currentUseAge !== 5 && (
                            <span className="text-xl">{data.instMm}개월</span>
                        )}
                    </div>
                    <div className="flex justify-between py-5px my-5px">
                        <span className="text-2xl font-bold">결제자</span>
                        {currentUseAge === 5 && (
                            <>
                                <InputText
                                    id="payUserNm"
                                    value={data.payUserNm}
                                    className="text-xl p-3px w-150px"
                                    onChange={(value) => onDataChange({'payUserNm': value})}
                                />
                            </>
                        )}
                        {currentUseAge !== 5 && (
                            <span className="text-xl">{data.payUserNm}</span>
                        )}
                    </div>
                    <div className="flex justify-between py-5px my-5px">
                        <span className="text-2xl font-bold">메모</span>
                        {currentUseAge === 5 && (
                            <Textarea
                                id="remark"
                                value={data.remark}
                                onChange={(value) => onDataChange({remark: value})}
                                className="text-xl p-150px"
                            />
                        )}
                        {editable && (
                            <Textarea
                                id="remark"
                                value={data.remark}
                                onChange={(value) => onDataChange({remark: value})}
                                className="text-xl p-150px"
                            />
                        )}
                        {!editable && (
                            <span className="text-xl">{data.remark}</span>
                        )}
                    </div>
                </div>
            </section>
            {/* 만료 + 환불 O */}
            {currentUseAge === 2 && (
                <section>
                    <div className="p-20px bg-red rounded-default shadow-md mb-10px py-5px my-50px">
                        <div className="flex justify-between py-5px my-5px">
                            <span className="text-2xl font-bold text-white">환불 일자</span>
                            <span className="text-xl text-white">{data.refundDtm}</span>
                            <span className="text-2xl font-bold text-white">환불 금액</span>
                            <span className="text-xl text-white">{data.refundAmt.toLocaleString()}원</span>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
