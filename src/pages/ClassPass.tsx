import {useLayoutContext} from '@/hooks/useLayoutContext.ts';
import {useEffect, useState} from 'react';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import InputText from '@/common/components/inputArea/InputText.tsx';
import BtnSearch from '@/common/components/buttons/BtnSearch.tsx';
import InputDate from '@/common/components/inputArea/InputDate.tsx';
import ClsPassAll from '@/features/ClsPass/sections/ClsPassAll.tsx';
import iconPlus from '@/assets/icon/white/icon_cls_plus.png';
import BtnIconText from '@/common/components/buttons/BtnIconText.tsx';
import SelectBox from '@/common/components/inputArea/SelectBox.tsx';
import iconFilter from '@/assets/icon/white/icon_filter.png';
import {useForm} from "react-hook-form";
import {dateFormatToString} from "@/utils/date.ts";
import SearchCondition from '@/common/components/searchBar/SearchCondition';

interface IClsPassData {
    clsPassId: string;
    cusNm: string;
    clsPkgNm: string;
    clsTyp: string;
    price: number;
    paidAmt: number;
    discountAmt: number;
    discountAmt2: number;
    totalCnt: number;
    remainCnt: number;
    expRate: string;
    payMethod: string;  // 'CARD' | 'CASH'
    payDate: string;
    refundYn: boolean; // 'Y' | 'N'
    useYn: boolean; // 'Y' | 'N'
}

interface ISearchForm {
    payDateFrom: string;
    payDateTo: string;
    refundDateFrom: string;
    refundDateTo: string;
    searchPayName: string;
    searchName: string;
}

// 결제 수강권 공통 코드 Mock 데이터
const mockDataPAYMET = [
    {
        codeId: 7,
        dtlNm: 'CARD',
    },
    {
        codeId: 8,
        dtlNm: 'CASH',
    },
];
const mockDataYN = [
    {
        codeId: 12,
        dtlNm: 'Y',
    },
    {
        codeId: 13,
        dtlNm: 'N',
    },
];

const roundTo = (n: number, unit = 1) => Math.round(n / unit) * unit;

// Mock 데이터 생성
const generateMockData = (count: number): IClsPassData[] => {
    return Array.from({length: count}, (_, i) => ({
        clsPassId: `PAYCLS${i + 1}`,
        cusNm: '김혜준',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: roundTo(Math.random() * 1_000_000, 100),
        paidAmt: roundTo(Math.random() * 700_000, 100),
        discountAmt: roundTo(Math.random() * 200_000, 100),
        discountAmt2: roundTo(Math.random() * 100_000, 100),
        totalCnt: roundTo(Math.random() * 100, 10),
        remainCnt: roundTo(Math.random() * 5, 1),
        expRate: '2025-10-30',
        payMethod: Math.random() > 0.5 ? 'CASH' : 'CARD',
        payDate: '2025-08-01',
        refundYn: Math.random() > 0.5,
        useYn: Math.random() > 0.5
    }));
};

export default function ClassPass() {

    const [selectedUseYn, setSelectedUseYn] = useState<number>(0);
    const [selectedRefundYn, setSelectedRefundYn] = useState<number>(0);
    const [selectedPayMethod, setSelectedPayMethod] = useState<number>(0);
    const [mockData, setMockData] = useState<IClsPassData[]>(generateMockData(50));

    // react-hook-form 검색조건
    const {watch, setValue, handleSubmit} = useForm<ISearchForm>({
        defaultValues: {
            payDateFrom: dateFormatToString(new Date()),
            payDateTo: dateFormatToString(new Date()),
            refundDateFrom: dateFormatToString(new Date()),
            refundDateTo: dateFormatToString(new Date()),
            searchPayName: '',
            searchName: '',
        },
    });

    // 클라이언트 필터링 (강사, 블랙리스트)
    const filteredData = mockData.filter((item) => {

        // 사용여부 필터
        if (selectedUseYn !== 0) {
            const useYn = mockDataYN.find((yn) => yn.codeId === selectedUseYn)?.dtlNm === 'Y';
            if (item.useYn !== useYn) return false;
        }

        // 블랙리스트 필터
        if (selectedRefundYn !== 0) {
            const isRefundYN = mockDataYN.find((yn) => yn.codeId === selectedRefundYn)?.dtlNm === 'Y';
            if (item.refundYn !== isRefundYN) return false;
        }

        // 결제 방법 필터
        if (selectedPayMethod !== 0) {
            const payMethod = mockDataPAYMET.find((payMethod) => payMethod.codeId === selectedPayMethod)?.dtlNm;
            if (item.payMethod !== payMethod) return false;
        }

        return true;
    });

    const formValues = watch();

    useEffect(() => {
        console.log('📝 Form State:', {
            payDateFrom: formValues.payDateFrom,
            payDateTo: formValues.payDateTo,
            refundDateFrom: formValues.refundDateFrom,
            refundDateTo: formValues.refundDateTo,
            searchPayName: formValues.searchPayName,
            searchName: formValues.searchName,
        });
    }, [formValues]);

    // 헤더 정보 세팅
    const {setHeaderTitle, setHeaderIcon} = useLayoutContext();

    useEffect(() => {
        setHeaderTitle('결제 수강권');
        setHeaderIcon(headerIcon);
    }, [setHeaderTitle, setHeaderIcon]);

    // 검색 실행
    const onSubmit = (data: ISearchForm) => {
        console.log('검색 데이터:', data);
        // TODO: 실제 검색 API 호출
        // 퍼블리싱용 - 새로운 mock 데이터 생성
        setMockData(generateMockData(50));
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* 버튼 */}
            <section className="flex justify-end py-5px mx-20px">
                <BtnIconText type="A" icon={iconPlus} text="신규결제 등록하기" onClick={() => {
                }}/>
            </section>
            {/* 서치 바 */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <section
                    className="flex p-20px gap-30px font-medium text-xl text-black bg-ppLight rounded-default mt-10px flex-shrink-0 mx-20px">
                    <div className="flex-1 flex justify-between">
                        <div className="flex items-center gap-10px">
                            <SearchCondition id="payDateFrom" labelText="결제 일자">
                                <InputDate
                                    id="payDateFrom"
                                    value={watch('payDateFrom')}
                                    onChange={(value) => setValue('payDateFrom', value)}
                                    className="required ml-auto w-130px"
                                />
                                <span className="mx-5px">~</span>
                                <InputDate
                                    id="payDateTo"
                                    value={watch('payDateTo')}
                                    onChange={(value) => setValue('payDateTo', value)}
                                    className="required ml-auto w-130px"
                                />
                            </SearchCondition>
                        </div>

                        <div className="flex items-center gap-10px">

                            <SearchCondition id="refundDateFrom" labelText="환불 일자">
                                <InputDate
                                    id="refundDateFrom"
                                    value={watch('refundDateFrom')}
                                    onChange={(value) => setValue('refundDateFrom', value)}
                                    className="required ml-auto w-130px"
                                />
                                <span className="mx-5px">~</span>
                                <InputDate
                                    id="refundDateTo"
                                    value={watch('refundDateTo')}
                                    onChange={(value) => setValue('refundDateTo', value)}
                                    className="required ml-auto w-130px"
                                />
                            </SearchCondition>
                        </div>

                        <div className="flex items-center gap-10px">
                            <SearchCondition id="searchName" labelText="회원명">
                                <InputText
                                    id="searchName"
                                    className="w-full required ml-auto"
                                    value={watch('searchName')}
                                    onChange={(value) => setValue('searchName', value)}
                                />
                            </SearchCondition>
                        </div>

                        <div className="flex items-center gap-10px mr-10px">
                            <SearchCondition id="searchPayName" labelText="결제자">
                                <InputText
                                    id="searchPayName"
                                    className="w-full required ml-auto"
                                    value={watch('searchPayName')}
                                    onChange={(value) => setValue('searchPayName', value)}
                                />
                            </SearchCondition>
                        </div>
                    </div>
                    <BtnSearch/>
                </section>
            </form>
            {/* 필터 */}
            <section
                className="flex justify-end py-10px gap-10px font-medium text-xl text-black rounded-default mt-10px flex-shrink-0 mx-20px">
                <SelectBox
                    id="use_yn"
                    label="상품 사용 여부"
                    options={mockDataPAYMET}
                    icon={iconFilter}
                    className="w-180px"
                    value={selectedUseYn}
                    onChange={(value) => setSelectedUseYn(value)}
                />
                <SelectBox
                    id="refund_yn"
                    label="환불 여부"
                    options={mockDataYN}
                    className="w-180px"
                    value={selectedRefundYn}
                    onChange={(value) => setSelectedRefundYn(value)}
                />
                <SelectBox
                    id="pay_method"
                    label="결제 수단"
                    options={mockDataPAYMET}
                    className="w-180px"
                    value={selectedPayMethod}
                    onChange={(value) => setSelectedPayMethod(value)}
                />
            </section>
            {/* 테이블 그리드 */}
            <ClsPassAll data={filteredData} isLoading={false}/>
        </div>
    );
}
