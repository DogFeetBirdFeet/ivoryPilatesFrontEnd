import {useLayoutContext} from '@/hooks/useLayoutContext.ts';
import {useEffect, useState} from 'react';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import InputText from '@/common/components/inputArea/InputText.tsx';
import BtnSearch from '@/common/components/buttons/BtnSearch.tsx';
import InputDate from '@/common/components/inputArea/InputDate.tsx';
import ClsPassTable from '@/features/ClsPass/sections/ClsPassTable.tsx';
import ClsPassDetailView from '@/features/ClsPass/sections/ClsPassDetailView.tsx';
import iconPlus from '@/assets/icon/white/icon_cls_plus.png';
import BtnIconText from '@/common/components/buttons/BtnIconText.tsx';
import FilterSelectBox from '@/common/components/inputArea/FilterSelectBox';
import iconFilter from '@/assets/icon/white/icon_filter.png';
import {useForm} from 'react-hook-form';
import {dateFormatToString} from '@/utils/date.ts';
import SearchCondition from '@/common/components/searchBar/SearchCondition';
import {clsPassApi, commonCodeApi} from '@/services/api';

interface IClsPassData {
    clsPkgId: number;
    clsPassId: number; // 결제 수강권 ID
    userId: number; // 회원 ID
    userNm: string; // 회원명
    clsPkgNm: string; // 상품명
    clsType: string; // 상품타입
    price: number; // 기본금액
    paidAmt: number; // 결제 금액
    discountAmt: number; // 기본할인금액
    discountAmt2: number; // 추가할인금액
    totalCnt: number; // 총 회차
    remainCnt: number; // 잔여 회차
    expRate: string; // 유효 기간
    payMethod: string; // 결제 수단
    payDate: string; // 결제 일자
    refundYn: string; // 환불 여부
    useYn: string; // 사용 여부
}

interface ISearchForm {
    payDateFrom: Date | null;
    payDateTo: Date | null;
    refundDateFrom: Date | null;
    refundDateTo: Date | null;
    searchPayName: string;
    searchName: string;
}

// 공통 코드 데이터 타입
interface ICommonCode {
    codeId: number;
    dtlNm: string;
}

export default function ClassPass() {
    const [selectedUseYn, setSelectedUseYn] = useState<number>(0);
    const [selectedRefundYn, setSelectedRefundYn] = useState<number>(0);
    const [selectedPayMethod, setSelectedPayMethod] = useState<number>(0);
    const [data, setData] = useState<IClsPassData[]>([]);
    const [PAYMENT, setPAYMENT] = useState<ICommonCode[]>();
    const [YN, setYN] = useState<ICommonCode[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState<'list' | 'register' | 'detail'>('list');
    const [selectedItem, setSelectedItem] = useState<IClsPassData | null>(null);

    // react-hook-form 검색조건
    const {watch, setValue, handleSubmit} = useForm<ISearchForm>({
        defaultValues: {
            payDateFrom: new Date(new Date().getFullYear(), 0, 1),
            payDateTo: new Date(),
            refundDateFrom: null,
            refundDateTo: null,
            searchPayName: '',
            searchName: '',
        },
    });

    // 클라이언트 필터링 (강사, 블랙리스트)
    const filteredData = data.filter((item) => {
        // 사용여부 필터
        if (selectedUseYn !== 0) {
            const useYn = YN?.find((yn) => yn.codeId === selectedUseYn)?.dtlNm;
            if (item.useYn !== useYn) return false;
        }

        // 환불 필터
        if (selectedRefundYn !== 0) {
            const isRefundYN = YN?.find((yn) => yn.codeId === selectedRefundYn)?.dtlNm;
            if (item.refundYn !== isRefundYN) return false;
        }

        // 결제 방법 필터
        if (selectedPayMethod !== 0) {
            // 백엔드 데이터 값으로 매핑
            const payMethodMapping: { [key: string]: string } = {
                카드: 'CARD',
                계좌이체: 'CASH',
            };
            const selectedPayMethodName = PAYMENT?.find((payMethod) => payMethod.codeId === selectedPayMethod)?.dtlNm;
            const backendPayMethod = selectedPayMethodName ? payMethodMapping[selectedPayMethodName] : undefined;

            if (item.payMethod !== backendPayMethod) return false;
        }

        return true;
    });

    const formValues = watch();

    // 공통 코드 로드 함수
    const loadCommonCode = async () => {
        try {
            const response = await commonCodeApi.getCommonCodeList(3);
            setPAYMENT(response.data);

            const response2 = await commonCodeApi.getCommonCodeList(5);
            setYN(response2.data);
        } catch (error) {
            console.error('공통 코드 로드 실패:', error);
            // 에러 시 기본값 유지
        }
    };

    // 데이터 로드 함수
    const loadClsPassData = async (searchParams?: ISearchForm) => {
        setIsLoading(true);
        try {
            if (!searchParams) return;

            const params = {
                searchName: searchParams?.searchName,
                searchPayName: searchParams?.searchPayName,
                payMethod: selectedPayMethod ? PAYMENT?.find((pay) => pay.codeId === selectedPayMethod)?.dtlNm : undefined,
                useYn: selectedUseYn ? YN?.find((yn) => yn.codeId === selectedUseYn)?.dtlNm : undefined,
                refundYn: selectedRefundYn ? YN?.find((yn) => yn.codeId === selectedRefundYn)?.dtlNm : undefined,
                payDateFrom: dateFormatToString(searchParams?.payDateFrom),
                payDateTo: dateFormatToString(searchParams?.payDateTo),
                refundDateFrom: dateFormatToString(searchParams?.refundDateFrom),
                refundDateTo: dateFormatToString(searchParams?.refundDateTo),
            };

            const response = await clsPassApi.getClsPassList(params);
            setData(response.data);
        } catch (error) {
            console.error('데이터 로드 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // 컴포넌트 마운트 시 초기 데이터 로드
    useEffect(() => {
        const initializeData = async () => {
            await loadCommonCode(); // 공통 코드 먼저 로드
            // 초기 폼 값으로 데이터 로드
            const initialFormValues = {
                payDateFrom: new Date(new Date().getFullYear(), 0, 1),
                payDateTo: new Date(),
                refundDateFrom: null,
                refundDateTo: null,
                searchPayName: '',
                searchName: '',
            };
            await loadClsPassData(initialFormValues);
        };
        initializeData().then(r => r);
    }, [watch]);

    // 조회 조건 변경 시 자동 데이터 조회
    useEffect(() => {
        // 초기 로드가 완료된 후에만 실행
        if (PAYMENT && YN) {
            loadClsPassData(formValues);
        }
    }, [
        formValues.payDateFrom,
        formValues.payDateTo,
        formValues.refundDateFrom,
        formValues.refundDateTo,
        formValues.searchName,
        formValues.searchPayName,
    ]);

    // 헤더 정보 세팅
    const {setHeaderTitle, setHeaderIcon} = useLayoutContext();

    useEffect(() => {
        setHeaderTitle('결제 수강권');
        setHeaderIcon(headerIcon);
    }, [setHeaderTitle, setHeaderIcon]);

    // 검색 실행
    const onSubmit = (data: ISearchForm) => {
        loadClsPassData(data).then(r => r);
    };

    // 신규결제 등록하기 버튼 클릭 핸들러
    const handleRegisterClick = () => {
        setCurrentView('register');
    };

    // 상세 페이지로 이동 핸들러
    const handleDetailView = (item: IClsPassData) => {
        setSelectedItem(item);
        setCurrentView('detail');
        // useNavigate 사용으로 페이지 이동
    };

    // 목록으로 돌아가기 핸들러
    const handleBackToList = () => {
        setCurrentView('list');
    };

    // 등록 페이지 렌더링
    if (currentView === 'register') {
        return (
            <ClsPassDetailView
                title="결제수강권 등록"
                userId={selectedItem?.userId || 0}
                userNm={selectedItem?.userNm || ''}
                clsPassId={selectedItem?.clsPassId || 0}
                useAge={5}
                authority={1}
                onCancel={handleBackToList}
            />
        );
    }

    // 상세 페이지 렌더링
    if (currentView === 'detail' && selectedItem) {
        return (
            <ClsPassDetailView
                title="결제 수강권 상세"
                userId={selectedItem.userId}
                userNm={selectedItem.userNm}
                clsPassId={selectedItem.clsPassId}
                useAge={selectedItem.refundYn ? 1 : 2} // 환불 여부에 따라 useAge 설정
                authority={2}
                onCancel={handleBackToList}
            />
        );
    }

    return (
        <div className="w-full h-full flex flex-col">
            {/* 버튼 */}
            <section className="flex justify-end py-5px mx-20px">
                <BtnIconText type="A" icon={iconPlus} text="신규결제 등록하기" onClick={handleRegisterClick}/>
            </section>
            {/* 서치 바 */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <section
                    className="flex p-20px gap-30px font-medium bg-ppLight rounded-md mt-10px flex-shrink-0 mx-20px">
                    <div className="flex-1 flex justify-between">
                        <div className="flex items-center gap-10px">
                            <SearchCondition id="payDateFrom" labelText="결제 일자" className="text-2xl">
                                <InputDate
                                    id="payDateFrom"
                                    value={watch('payDateFrom')}
                                    onChange={(value) => setValue('payDateFrom', value)}
                                    className="required ml-auto w-130px text-xl"
                                />
                                <span className="mx-5px">~</span>
                                <InputDate
                                    id="payDateTo"
                                    value={watch('payDateTo')}
                                    onChange={(value) => setValue('payDateTo', value)}
                                    className="required ml-auto w-130px text-xl"
                                />
                            </SearchCondition>
                        </div>

                        <div className="flex items-center gap-10px">
                            <SearchCondition id="refundDateFrom" labelText="환불 일자" className="text-2xl">
                                <InputDate
                                    id="refundDateFrom"
                                    value={watch('refundDateFrom')}
                                    onChange={(value) => setValue('refundDateFrom', value)}
                                    className="required ml-auto w-130px text-xl"
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
                            <SearchCondition id="searchName" labelText="회원명" className="text-2xl">
                                <InputText
                                    id="searchName"
                                    className="w-full required ml-auto"
                                    value={watch('searchName')}
                                    onChange={(value) => setValue('searchName', value)}
                                />
                            </SearchCondition>
                        </div>

                        <div className="flex items-center gap-10px mr-10px">
                            <SearchCondition id="searchPayName" labelText="결제자" className="text-2xl">
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
                <FilterSelectBox
                    id="use_yn"
                    label="상품 사용 여부"
                    options={YN ?? []}
                    icon={iconFilter}
                    className="w-180px"
                    value={selectedUseYn}
                    onChange={(value) => setSelectedUseYn(value)}
                />
                <FilterSelectBox
                    id="refund_yn"
                    label="환불 여부"
                    options={YN ?? []}
                    className="w-180px"
                    value={selectedRefundYn}
                    onChange={(value) => setSelectedRefundYn(value)}
                />
                <FilterSelectBox
                    id="pay_method"
                    label="결제 수단"
                    options={PAYMENT ?? []}
                    className="w-180px"
                    value={selectedPayMethod}
                    onChange={(value) => setSelectedPayMethod(value)}
                />
            </section>
            {/* 테이블 그리드 */}
            <ClsPassTable data={filteredData} isLoading={isLoading} onDetailView={handleDetailView}/>
        </div>
    );
}
