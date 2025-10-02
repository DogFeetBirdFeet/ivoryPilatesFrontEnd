import {useForm} from "react-hook-form";
import {useEffect} from 'react';
import {useLayoutContext} from "@/hooks/useLayoutContext.ts";
import headerIcon from "@/assets/icon/yellow/icon_mem.png";
import SearchCondition from "@/common/components/searchBar/SearchCondition.tsx";
import BtnIconText from "@/common/components/buttons/BtnIconText.tsx";
import iconRefurn from '@/assets/icon/white/icon_cls_refurn.png';
import iconSavePurple from '@/assets/icon/purple/icon_save.png';
import iconCancel from '@/assets/icon/purple/icon_cancel.png';
import iconSaveWhite from '@/assets/icon/white/icon_save.png';
import iconIvo from '@/assets/icon/purple/icon_ivo.png';
import iconClsPkg from '@/assets/icon/white/icon_cls_pkg.png';

interface ISearchForm {
    cusId: string;
    cusName: string;
}

interface IPropsAuthority {
    title: string;
    userId: string;
    userNm: string;
    clsPassId: string;
    useAge: number;     // 1 : 조회 - 사용중, 2 :  조회 - 만료/환불, 3 : 수정 - 사용중, 4 : 수정 - 만료/환불, 5 : 등록
    authority: number;  // 1 : 강사, 2 : 관리자
    onCancel?: () => void;  // 취소 버튼 클릭 시 호출될 함수
}

interface IClsAndUserData {
    contact: string;            // 연락처
    birthDate: string;          // 생년월일
    gender: string;             // 성별
    userClass: string;          // 회원구분
    staDtm: string;             // 게시일자
    endDtm: string;             // 종료예정일자
    totalCnt: number;           // 총 회차
    remainCnt: number;          // 잔여 회차
    clsPkgNm: string;           // 상품명
    clsPassid: string;          // 결제수강권 ID
    price: number;              // 기본금액
    discountAmtPkg: number;     // 기본할인금액
    clsPkgCnt: number;          // 기본회차
    expRate: string;            // 최대 사용기간(일)
    paidAmt: number;            // 결제 금액
    discountAmtPass: number;    // 추가할인금액
    payDate: string;            // 결제 일자
    paymethod: string;          // 결제 수단
    instMm: number;             // 할부 개월수
    payUserNm: string;          // 결제자
    remark: string;             // 메모
    refundDtm: string;          // 환불 일자
    refundAmt: number;          // 환불 금액

}


export default function ClsPassInfo(props: IPropsAuthority) {

    const {watch,  handleSubmit} = useForm<ISearchForm>({
        defaultValues: {
            cusId: '',
            cusName: '',
        },
    });

    const formValues = watch();

    useEffect(() => {
        console.log('📝 Form State:', {
            cusId: formValues.cusId,
            cusName: formValues.cusName
        });
    }, [formValues]);

    const {setHeaderTitle, setHeaderIcon} = useLayoutContext();

    useEffect(() => {
        setHeaderTitle(props.title);
        setHeaderIcon(headerIcon);
    }, [setHeaderTitle, setHeaderIcon, props.title]);

    // 검색 실행
    const onSubmit = (data: ISearchForm) => {
        console.log('검색 데이터:', data);
        // TODO: 실제 검색 API 호출
        // 퍼블리싱용 - 새로운 mock 데이터 생성
    };

    // Mock 데이터 (실제로는 props에서 받아와야 함)
    const mockUserData: IClsAndUserData = {
        contact: "010-0000-0000",
        birthDate: "9999.99.99",
        gender: "여자",
        userClass: "등록회원",
        staDtm: "2024.01.01",
        endDtm: "2024.12.31",
        totalCnt: 10,
        remainCnt: 5,
        clsPkgNm: "1:1 10회 기본",
        clsPassid: 'TEST_001',
        price: 500000,
        discountAmtPkg: 50000,
        clsPkgCnt: 10,
        expRate: "365",
        paidAmt: 450000,
        discountAmtPass: 0,
        payDate: "2024.01.01",
        paymethod: "CARD",
        instMm: 0,
        payUserNm: "원예진",
        remark: "",
        refundDtm: "",
        refundAmt: 0
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* 헤더 섹션 - 유저 정보와 버튼 */}
            <section className="flex justify-between items-center bg-ppLight py-15px px-20px">
                {/* 왼쪽: 유저 정보 */}
                {props.userNm !== '' && (
                    <div className="flex items-center gap-10px">
                        <div className="w-24px h-24px rounded-full bg-ppDark flex items-center justify-center">
                            <img src={iconIvo} className="w-16px h-16px" alt="User Icon" />
                        </div>
                        <label className="text-2xl font-bold text-ppDark">{props.userNm} 회원님</label>
                    </div>
                )}
                {props.userNm === '' && (
                    <div className="flex items-center gap-10px">
                        <div className="w-24px h-24px rounded-full bg-ppDark flex items-center justify-center">
                            <img src={iconIvo} className="w-16px h-16px" alt="User Icon" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <SearchCondition id="cusId" labelText="">
                            </SearchCondition>
                        </form>
                    </div>
                )}
                
                {/* 오른쪽: 버튼들 */}
                <div className="flex gap-10px">
                    {/* 조회 - 사용중 */}
                    {props.useAge === 1 && (
                        <>
                            <BtnIconText type="A" icon={iconRefurn} text="환불하기" onClick={() => {}}/>
                            <BtnIconText type="B" icon={iconSavePurple} text="결제정보 수정하기" onClick={() => {}}/>
                        </>
                    )}
                    {/* 조회 - 만료/환불 */}
                    {props.useAge === 2 && (
                        <BtnIconText type="B" icon={iconSavePurple} text="결제정보 수정하기" onClick={() => {}}/>
                    )}
                    {/* 수정 - 사용중 */}
                    {props.useAge === 3 && (
                        <>
                            <BtnIconText type="B" icon={iconCancel} text="취소하기" onClick={props.onCancel || (() => {})}/>
                            <BtnIconText type="A" icon={iconSaveWhite} text="저장하기" onClick={() => {}}/>
                        </>
                    )}
                    {/* 수정 - 만료/환불 */}
                    {props.useAge === 4 && (
                        <>
                            <BtnIconText type="B" icon={iconCancel} text="취소하기" onClick={props.onCancel || (() => {})}/>
                            <BtnIconText type="A" icon={iconSaveWhite} text="저장하기" onClick={() => {}}/>
                        </>
                    )}
                    {/* 등록 */}
                    {props.useAge === 5 && (
                        <>
                            <BtnIconText type="B" icon={iconCancel} text="취소하기" onClick={props.onCancel || (() => {})}/>
                            <BtnIconText type="A" icon={iconSaveWhite} text="저장하기" onClick={() => {}}/>
                        </>
                    )}
                </div>
            </section>

            {/* 구분선 */}
            <div className="w-full h-9px bg-gray my-10px"></div>

            {/* 사용자 데이터 필드들 */}
            <section className="flex flex-wrap gap-15px  mb-20px">
                <div className="flex-1 min-w-[200px] bg-ppLight p-15px rounded-md">
                    <label className="block text-sm font-medium text-gray mb-5px">연락처</label>
                    <p className="text-1g font-bold text-gray">{mockUserData.contact}</p>
                </div>
                <div className="flex-1 min-w-[200px] bg-ppLight p-15px rounded-md">
                    <label className="block text-sm font-medium text-gray-600 mb-5px">생년월일</label>
                    <p className="text-lg font-bold text-gray">{mockUserData.birthDate}</p>
                </div>
                <div className="flex-1 min-w-[200px] bg-ppLight p-15px rounded-md">
                    <label className="block text-sm font-medium text-gray-600 mb-5px">성별</label>
                    <p className="text-lg font-bold text-gray">{mockUserData.gender}</p>
                </div>
                <div className="flex-1 min-w-[200px] bg-ppLight p-15px rounded-md">
                    <label className="block text-sm font-medium text-gray-600 mb-5px">회원구분</label>
                    <p className="text-lg font-bold text-gray">{mockUserData.userClass}</p>
                </div>
            </section>

            {/* 수강권 정보 섹션 */}
            <section className="px-20px mb-15px">
                <div className="flex items-center gap-5px mb-10px">
                    <h3 className="text-2xl font-bold text-ppDark">수강권 정보</h3>
                    {!mockUserData.clsPassid && (
                         <BtnIconText type="A" icon={iconClsPkg} text="상품 검색하기" onClick={() => {}}/>
                    )}
                    {mockUserData.clsPassid && mockUserData.remainCnt > 0 && (
                        <span className="bg-blueBtn text-white text-center h-30px w-60px">사용중</span>
                    )}
                    {mockUserData.clsPassid && mockUserData.remainCnt <= 0 && (
                        <span className="bg-red text-white text-center h-30px w-60px">만료</span>
                    )}
                </div>
                <div className="p-20px bg-white rounded-default shadow-md">
                    <div className="flex justify-between py-5px">
                        <span className="text-ppDark">개시 일자</span>
                        <span className="text-ppDark">{mockUserData.staDtm}</span>
                    </div>
                    <div className="flex justify-between py-5px">
                        <span className="text-ppDark">종료 예정 일자</span>
                        <span className="text-ppDark">{mockUserData.endDtm}</span>
                    </div>
                    <div className="flex justify-between py-5px">
                        <span className="text-ppDark">총 회차</span>
                        <span className="text-ppDark">{mockUserData.totalCnt}</span>
                    </div>
                    <div className="flex justify-between py-5px">
                        <span className="text-ppDark">잔여 회차</span>
                        <span className="text-ppDark">{mockUserData.remainCnt} 회</span>
                    </div>
                </div>
            </section>

            {/* 결제정보 섹션 */}
            <section className="px-20px mb-15px">
                <h3 className="text-2xl font-bold text-ppDark">결제정보</h3>
                <div className="p-20px bg-white rounded-default shadow-md">
                    <div className="flex justify-between py-5px">
                        <span className="text-ppDark">상품명</span>
                        <span className="text-ppDark">{mockUserData.clsPkgNm}</span>
                    </div>
                    <div className="flex justify-between py-5px">
                        <span className="text-ppDark">결제수강권 ID</span>
                        <span className="text-ppDark">{mockUserData.clsPassid}</span>
                    </div>
                    <div className="flex justify-between py-5px">
                        <span className="text-ppDark">기본 금액</span>
                        <span className="text-ppDark">{mockUserData.price}</span>
                    </div>
                    <div className="flex justify-between py-5px">
                        <span className="text-ppDark">기본 할인 금액</span>
                        <span className="text-ppDark">{mockUserData.discountAmtPkg}</span>
                    </div>
                    <div className="flex justify-between py-5px">
                        <span className="text-ppDark">기본 회차</span>
                        <span className="text-ppDark">{mockUserData.clsPkgCnt} 회</span>
                    </div>
                    <div className="flex justify-between py-5px">
                        <span className="text-ppDark">최대 사용기간</span>
                        <span className="text-ppDark">{mockUserData.expRate} 일</span>
                    </div>
                </div>
            </section>

            {/* 추가 콘텐츠 영역 */}
            <div className="flex-1 px-20px">
                {/* 여기에 추가 콘텐츠가 들어갈 수 있습니다 */}
            </div>
        </div>
    )

}