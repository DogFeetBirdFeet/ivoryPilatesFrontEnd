import {useLayoutContext} from '@/hooks/useLayoutContext.ts';
import {useEffect} from 'react';
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
import SearchCondition from '@/common/components/searchBar/searchCondition.tsx';

type CodeIdAndName = {
    codeId: number;
    dtlNm: string;
};

interface ISearchForm {
    payDateFrom: string;
    payDateTo: string;
    refundDateFrom: string;
    refundDateTo: string;
    searchPayName: string;
    searchName: string;
}

// 결제 수강권 Mock 데이터
const mockDataPAYMET: CodeIdAndName[] = [
    {
        codeId: 7,
        dtlNm: 'CARD',
    },
    {
        codeId: 8,
        dtlNm: 'CASH',
    },
];
const mockDataYN: CodeIdAndName[] = [
    {
        codeId: 12,
        dtlNm: 'Y',
    },
    {
        codeId: 13,
        dtlNm: 'N',
    },
];


export default function ClassPass() {

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
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* 버튼 */}
            <section className="flex justify-end py-5px">
                <BtnIconText type="A" icon={iconPlus} text="신규결제 등록하기" onClick={() => {
                }}/>
            </section>
            {/* 서치 바 */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <section
                    className="flex p-20px gap-30px font-medium text-xl text-black bg-ppLight rounded-default mt-10px flex-shrink-0">
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
                className="flex justify-end py-10px gap-10px font-medium text-xl text-black rounded-default mt-10px flex-shrink-0">
                <SelectBox id="use-yn" label="상품 사용 여부" options={mockDataYN} icon={iconFilter} className="w-180px"/>
                <SelectBox id="refund-yn" label="환불 여부" options={mockDataYN} className="w-180px"/>
                <SelectBox id="pay-method" label="결제 수단" options={mockDataPAYMET} className="w-180px"/>
            </section>
            {/* 테이블 그리드 */}
            <ClsPassAll/>
        </div>
    );
}
