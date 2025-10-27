import {useForm} from "react-hook-form";
import {useEffect, useState} from 'react';
import {useLayoutContext} from "@/hooks/useLayoutContext.ts";
import headerIcon from "@/assets/icon/yellow/icon_mem.png";
import BtnIconText from "@/common/components/buttons/BtnIconText.tsx";
import iconRefund from '@/assets/icon/white/icon_cls_refurn.png';
import iconSavePurple from '@/assets/icon/purple/icon_save.png';
import iconCancel from '@/assets/icon/purple/icon_cancel.png';
import iconSaveWhite from '@/assets/icon/white/icon_save.png';
import iconIvo from '@/assets/icon/purple/icon_ivo.png';
import ClsPassInfoItem from "@/features/ClsPass/items/ClsPassInfo";
import ClsPkgInfo from "@/features/ClsPass/items/ClsPkgInfo";
import ClsPayInfo from "@/features/ClsPass/items/ClsPayInfo";
import useOverlay from '@/hooks/useOverlay';
import PopupRefundCls from '@/common/popup/PopupRefundCls';
import SearchInputCus from "@/common/components/inputArea/SearchInputCus.tsx";

interface ISearchForm {
    cusId: number;
    cusName: string;
}

interface IPropsAuthority {
    title: string;
    userId: number;
    userNm: string;
    clsPassId: number;
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
    useYn: boolean;             // 만료 여부
    clsPkgNm: string;           // 상품명
    clsPassId: string;          // 결제수강권 ID
    price: number;              // 기본금액
    discountAmtPkg: number;     // 기본할인금액
    clsPkgCnt: number;          // 기본회차
    expRate: string;            // 최대 사용기간(일)
    paidAmt: number;            // 결제 금액
    discountAmtPass: number;    // 추가할인금액
    payDate: string;            // 결제 일자
    payMethod: string;          // 결제 수단
    instMm: number;             // 할부 개월수
    payUserNm: string;          // 결제자
    remark: string;             // 메모
    refundDtm: string;          // 환불 일자
    refundAmt: number;          // 환불 금액
    refundYn: boolean;          // 환불 여부

}


export default function ClsPassDetailView(props: IPropsAuthority) {

    // react-hook-form 검색조건
    const {watch, setValue} = useForm<ISearchForm>({
        defaultValues: {
            cusId: 0,
            cusName: ''
        },
    });

    const formValues = watch();
    const overlay = useOverlay();

    useEffect(() => {
        console.log('📝 Form State:', {
            cusId: formValues.cusId,
            cusName: formValues.cusName
        });
    }, [formValues]);

    const {setHeaderTitle, setHeaderIcon} = useLayoutContext();
    const [editable, setEditable] = useState(false);
    const [currentUseAge, setCurrentUseAge] = useState(props.useAge);

    useEffect(() => {
        setHeaderTitle(props.title);
        setHeaderIcon(headerIcon);
    }, [setHeaderTitle, setHeaderIcon, props.title, editable]);

    // Mock 데이터 (실제로는 props에서 받아와야 함)
    const [mockUserData, setMockUserData] = useState<IClsAndUserData>({
        contact: "010-0000-0000",
        birthDate: "9999-99-99",
        gender: "여자",
        userClass: "등록회원",
        staDtm: "2024-01-01",
        endDtm: "2024-12-31",
        totalCnt: 10,
        remainCnt: 5,
        useYn: true,
        clsPkgNm: "1:1 10회 기본",
        clsPassId: 'TEST_001',
        price: 500000,
        discountAmtPkg: 50000,
        clsPkgCnt: 10,
        expRate: "365",
        paidAmt: 450000,
        discountAmtPass: 0,
        payDate: "2024-01-01",
        payMethod: "CARD",
        instMm: 0,
        payUserNm: "원예진",
        remark: "",
        refundDtm: "2025-10-03",
        refundAmt: 222220,
        refundYn: true,
    });

    const handleEdit = () => {

        console.log('🔍 currentUseAge:', currentUseAge);
        setCurrentUseAge(currentUseAge === 1 ? 3 : 4);
        setEditable(true);
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* 헤더 섹션 - 유저 정보와 버튼 */}
            <section className="flex justify-between items-center py-15px px-20px">
                {/* 왼쪽: 유저 정보 */}
                {props.userNm !== '' && (
                    <div className="flex items-center gap-10px">
                        <div className="w-24px h-24px rounded-full bg-ppDark flex items-center justify-center">
                            <img src={iconIvo} className="w-16px h-16px" alt="User Icon"/>
                        </div>
                        <label className="text-[40px] font-bold text-ppm">{props.userNm} 회원님</label>
                    </div>
                )}
                {props.userNm === '' && (
                    <div className="flex items-center gap-10px">
                        <div className="w-24px h-24px rounded-full bg-ppDark flex items-center justify-center">
                            <img src={iconIvo} className="w-16px h-16px" alt="User Icon"/>
                        </div>
                        <SearchInputCus
                            id="searchName"
                            value={watch('cusName')}
                            onChange={(value) => setValue('cusName', value)}
                            onSearch={(data) => {
                                const cusNm = `${data.memberName} 회원님 ${data.grpType === 'D' ? '(2:1 그룹회원)' : ''}`;
                                setValue('cusName', cusNm);
                            }}
                        />
                    </div>
                )}

                {/* 오른쪽: 버튼들 */}
                <div className="flex gap-10px">
                    {/* 조회 - 사용중 */}
                    {currentUseAge === 1 && (
                        <>
                            <BtnIconText
                                type="A"
                                icon={iconRefund}
                                text="환불하기"
                                onClick={() => {
                                    overlay.showPopup(<PopupRefundCls/>);
                                }}
                            />
                            <BtnIconText type="B" icon={iconSavePurple} text="결제정보 수정하기" onClick={handleEdit}/>
                        </>
                    )}
                    {/* 조회 - 만료/환불 */}
                    {currentUseAge === 2 && (
                        <BtnIconText type="B" icon={iconSavePurple} text="결제정보 수정하기" onClick={handleEdit}/>
                    )}
                    {/* 수정 - 사용중 */}
                    {currentUseAge === 3 && (
                        <>
                            <BtnIconText type="B" icon={iconCancel} text="취소하기" onClick={props.onCancel || (() => {
                            })}/>
                            <BtnIconText type="A" icon={iconSaveWhite} text="저장하기" onClick={() => {
                            }}/>
                        </>
                    )}
                    {/* 수정 - 만료/환불 */}
                    {currentUseAge === 4 && (
                        <>
                            <BtnIconText type="B" icon={iconCancel} text="취소하기" onClick={props.onCancel || (() => {
                            })}/>
                            <BtnIconText type="A" icon={iconSaveWhite} text="저장하기" onClick={() => {
                            }}/>
                        </>
                    )}
                    {/* 등록 */}
                    {currentUseAge === 5 && (
                        <>
                            <BtnIconText type="B" icon={iconCancel} text="취소하기" onClick={props.onCancel || (() => {
                            })}/>
                            <BtnIconText type="A" icon={iconSaveWhite} text="저장하기" onClick={() => {
                            }}/>
                        </>
                    )}
                </div>
            </section>

            {/* 구분선 */}
            <div className="w-full h-9px bg-gray my-10px"></div>

            {/* 사용자 데이터 필드들 */}
            <section className="flex flex-wrap gap-15px mb-20px">
                <div className="flex-1 w-[200px] bg-purpleLight2 p-15px rounded-md">
                    <label className="text-xl font-bold text-ppt mb-5px">연락처</label>
                    <p className="text-2xl font-bold text-black">{mockUserData.contact}</p>
                </div>
                <div className="flex-1 w-[200px] bg-purpleLight2 p-15px rounded-md">
                    <label className="text-xl font-bold text-ppt mb-5px">생년월일</label>
                    <p className="text-2xl font-bold text-black">{mockUserData.birthDate}</p>
                </div>
                <div className="flex-1 w-[200px] bg-purpleLight2 p-15px rounded-md">
                    <label className="text-xl font-bold text-ppt mb-5px">성별</label>
                    <p className="text-2xl font-bold text-black">{mockUserData.gender}</p>
                </div>
                <div className="flex-1 w-[200px] bg-purpleLight2 p-15px rounded-md">
                    <label className="text-xl font-bold text-ppt mb-5px">회원구분</label>
                    <p className="text-2xl font-bold text-black">{mockUserData.userClass}</p>
                </div>
            </section>

            {/* 메인 콘텐츠 영역 - 2컬럼 레이아웃 */}
            <div className="flex flex-wrap gap-15px mb-20px">
                {/* 왼쪽 컬럼 - 수강권 정보 & 상품정보 */}
                <div className="flex-1">
                    {currentUseAge === 5 && (
                        <>
                            {/* 상품정보 섹션 */}
                            <ClsPkgInfo
                                data={{
                                    clsPkgNm: mockUserData.clsPkgNm,
                                    clsPassId: mockUserData.clsPassId,
                                    price: mockUserData.price,
                                    discountAmtPkg: mockUserData.discountAmtPkg,
                                    clsPkgCnt: mockUserData.clsPkgCnt,
                                    expRate: mockUserData.expRate
                                }}
                                currentUseAge={currentUseAge}
                            />
                            {/* 수강권 정보 섹션 */}
                            <ClsPassInfoItem
                                data={{
                                    clsPassId: mockUserData.clsPassId,
                                    staDtm: mockUserData.staDtm,
                                    endDtm: mockUserData.endDtm,
                                    totalCnt: mockUserData.totalCnt,
                                    remainCnt: mockUserData.remainCnt,
                                    useYn: mockUserData.useYn,
                                    refundYn: mockUserData.refundYn
                                }}
                                editable={editable}
                                authority={props.authority}
                                currentUseAge={currentUseAge}
                                onDataChange={(newData) => {
                                    setMockUserData({
                                        ...mockUserData,
                                        ...newData
                                    });
                                }}
                            />
                        </>
                    )}
                    {currentUseAge !== 5 && (
                        <>
                            {/* 수강권 정보 섹션 */}
                            <ClsPassInfoItem
                                data={{
                                    clsPassId: mockUserData.clsPassId,
                                    staDtm: mockUserData.staDtm,
                                    endDtm: mockUserData.endDtm,
                                    totalCnt: mockUserData.totalCnt,
                                    remainCnt: mockUserData.remainCnt,
                                    useYn: mockUserData.useYn,
                                    refundYn: mockUserData.refundYn
                                }}
                                editable={editable}
                                authority={props.authority}
                                currentUseAge={currentUseAge}
                                onDataChange={(newData) => {
                                    setMockUserData({
                                        ...mockUserData,
                                        ...newData
                                    });
                                }}
                            />

                            {/* 상품정보 섹션 */}
                            <ClsPkgInfo
                                data={{
                                    clsPkgNm: mockUserData.clsPkgNm,
                                    clsPassId: mockUserData.clsPassId,
                                    price: mockUserData.price,
                                    discountAmtPkg: mockUserData.discountAmtPkg,
                                    clsPkgCnt: mockUserData.clsPkgCnt,
                                    expRate: mockUserData.expRate
                                }}
                                currentUseAge={currentUseAge}
                            />
                        </>
                    )}
                </div>
                <div className="flex-1">
                    {/* 오른쪽 컬럼 - 결제정보 */}
                    <ClsPayInfo
                        data={{
                            paidAmt: mockUserData.paidAmt,
                            discountAmtPass: mockUserData.discountAmtPass,
                            payDate: mockUserData.payDate,
                            payMethod: mockUserData.payMethod,
                            instMm: mockUserData.instMm,
                            payUserNm: mockUserData.payUserNm,
                            remark: mockUserData.remark,
                            refundDtm: mockUserData.refundDtm,
                            refundAmt: mockUserData.refundAmt
                        }}
                        editable={editable}
                        authority={props.authority}
                        currentUseAge={currentUseAge}
                        onDataChange={(newData) => {
                            setMockUserData({
                                ...mockUserData,
                                ...newData
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    )

}