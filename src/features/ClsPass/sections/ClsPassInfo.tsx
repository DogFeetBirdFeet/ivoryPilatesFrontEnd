import {useForm} from "react-hook-form";
import {useEffect, useState} from 'react';
import {useLayoutContext} from "@/hooks/useLayoutContext.ts";
import headerIcon from "@/assets/icon/yellow/icon_mem.png";
import BtnIconText from "@/common/components/buttons/BtnIconText.tsx";
import iconRefurnd from '@/assets/icon/white/icon_cls_refurn.png';
import iconSavePurple from '@/assets/icon/purple/icon_save.png';
import iconCancel from '@/assets/icon/purple/icon_cancel.png';
import iconSaveWhite from '@/assets/icon/white/icon_save.png';
import iconIvo from '@/assets/icon/purple/icon_ivo.png';
import iconClsPkg from '@/assets/icon/white/icon_cls_pkg.png';
import PopupSearchMem from '@/common/popup/PopupSearchMem';
import useOverlay from "@/hooks/useOverlay.ts";
import Textarea from "@/common/components/inputArea/Textarea.tsx";
import InputDate from "@/common/components/inputArea/InputDate.tsx";
import InputNumber from "@/common/components/inputArea/InputNumber";
import SelectBox from "@/common/components/inputArea/SelectBox";

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
    useYn: boolean;             // 만료 여부
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
    refundYn: boolean;          // 환불 여부

}

const mockDataYN = [
    {codeId: 12, dtlNm: '사용 중'},
    {codeId: 13, dtlNm: '만료'},
];

export default function ClsPassInfo(props: IPropsAuthority) {

    const overlay = useOverlay();

    const {watch} = useForm<ISearchForm>({
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
    const [editable, setEditable] = useState(false);
    const [currentUseAge, setCurrentUseAge] = useState(props.useAge);

    useEffect(() => {
        setHeaderTitle(props.title);
        setHeaderIcon(headerIcon);
    }, [setHeaderTitle, setHeaderIcon, props.title, editable]);

    // Mock 데이터 (실제로는 props에서 받아와야 함)
    const [mockUserData, setMockUserData] = useState<IClsAndUserData>({
        contact: "010-0000-0000",
        birthDate: "9999.99.99",
        gender: "여자",
        userClass: "등록회원",
        staDtm: "2024.01.01",
        endDtm: "2024.12.31",
        totalCnt: 10,
        remainCnt: 5,
        useYn: true,
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
        refundDtm: "2025.10.03",
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
            <section className="flex justify-between items-center bg-ppLight py-15px px-20px">
                {/* 왼쪽: 유저 정보 */}
                {props.userNm !== '' && (
                    <div className="flex items-center gap-10px">
                        <div className="w-24px h-24px rounded-full bg-ppDark flex items-center justify-center">
                            <img src={iconIvo} className="w-16px h-16px" alt="User Icon"/>
                        </div>
                        <label className="text-2xl font-bold text-ppDark">{props.userNm} 회원님</label>
                    </div>
                )}
                {props.userNm === '' && (
                    <div className="flex items-center gap-10px">
                        <div className="w-24px h-24px rounded-full bg-ppDark flex items-center justify-center">
                            <img src={iconIvo} className="w-16px h-16px" alt="User Icon"/>

                        </div>
                        <PopupSearchMem
                            onDoubleClick={(data) => {
                                console.log(data);
                                overlay.closePopup();
                            }}
                        />
                    </div>
                )}

                {/* 오른쪽: 버튼들 */}
                <div className="flex gap-10px">
                    {/* 조회 - 사용중 */}
                    {currentUseAge === 1 && (
                        <>
                            <BtnIconText type="A" icon={iconRefurnd} text="환불하기" onClick={() => {
                            }}/>
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
            <section className="flex flex-wrap gap-15px  mb-20px">
                <div className="flex-1 min-w-[200px] bg-ppLight p-15px rounded-md">
                    <label className="text-xl font-medium text-gray mb-5px">연락처</label>
                    <p className="text-2xl font-bold text-gray">{mockUserData.contact}</p>
                </div>
                <div className="flex-1 min-w-[200px] bg-ppLight p-15px rounded-md">
                    <label className="text-xl font-medium text-gray-600 mb-5px">생년월일</label>
                    <p className="text-2xl font-bold text-gray">{mockUserData.birthDate}</p>
                </div>
                <div className="flex-1 min-w-[200px] bg-ppLight p-15px rounded-md">
                    <label className="text-xl font-medium text-gray-600 mb-5px">성별</label>
                    <p className="text-2xl font-bold text-gray">{mockUserData.gender}</p>
                </div>
                <div className="flex-1 min-w-[200px] bg-ppLight p-15px rounded-md">
                    <label className="text-xl font-medium text-gray-600 mb-5px">회원구분</label>
                    <p className="text-2xl font-bold text-gray">{mockUserData.userClass}</p>
                </div>
            </section>

            {/* 메인 콘텐츠 영역 - 2컬럼 레이아웃 */}
            <div className="flex gap-20px px-20px mb-15px">
                {/* 왼쪽 컬럼 - 수강권 정보 & 상품정보 */}
                <div className="flex-1">
                    {/* 수강권 정보 섹션 */}
                    <section className="mb-15px">
                        <div className="flex items-center gap-5px mb-10px">
                            <h3 className="text-3xl font-bold py-5px my-5px">수강권 정보</h3>
                            {!mockUserData.clsPassid && (
                                <BtnIconText type="A" icon={iconClsPkg} text="상품 검색하기" onClick={() => {
                                }}/>
                            )}
                            {mockUserData.clsPassid && mockUserData.remainCnt > 0 && !mockUserData.refundDtm && (
                                <span className="bg-blueBtn text-white text-center h-30px w-60px">사용중</span>
                            )}
                            {mockUserData.clsPassid && (mockUserData.remainCnt <= 0 || mockUserData.refundDtm) && (
                                <span className="bg-red text-white text-center h-30px w-60px">만료</span>
                            )}
                        </div>
                        <div className="p-20px bg-white rounded-default shadow-md">
                            <div className="flex justify-between py-5px">
                                <span className="text-2xl font-bold">개시 일자</span>
                                <span className="text-xl">{mockUserData.staDtm}</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">종료 예정 일자</span>
                                {editable && props.authority === 2 && !mockUserData.refundYn && (
                                    <InputDate
                                        id="remark"
                                        value={mockUserData.endDtm}
                                        onChange={(value) => setMockUserData({...mockUserData, endDtm: value})}
                                    />
                                )}
                                {mockUserData.refundYn && (
                                    <span className="text-xl">{mockUserData.endDtm}</span>
                                )}
                                {editable && props.authority === 1 && (
                                    <span className="text-xl">{mockUserData.endDtm}</span>
                                )}
                                {!editable && (
                                    <span className="text-xl">{mockUserData.endDtm}</span>
                                )}
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">총 회차</span>
                                {editable && props.authority === 2 && !mockUserData.refundYn && (
                                    <InputNumber
                                        id="remark"
                                        value={mockUserData.totalCnt}
                                        onChange={(value) => setMockUserData({
                                            ...mockUserData,
                                            totalCnt: Number(value)
                                        })}
                                        suffix="회"
                                    />
                                )}
                                {mockUserData.refundYn && (
                                    <span className="text-xl">{mockUserData.totalCnt} 회</span>
                                )}
                                {editable && props.authority === 1 && (
                                    <span className="text-xl">{mockUserData.totalCnt} 회</span>
                                )}
                                {!editable && (
                                    <span className="text-xl">{mockUserData.totalCnt} 회</span>
                                )}
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">잔여 회차</span>
                                <span className="text-xl">{mockUserData.remainCnt} 회</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">

                                {editable && props.authority === 2 && !mockUserData.refundYn && (
                                    <>
                                        <span className="text-2xl font-bold">만료 여부</span>
                                        <SelectBox
                                            id="remark"
                                            label=""
                                            options={mockDataYN}
                                            value={mockUserData.useYn ? 12 : 13}
                                            onChange={(value) => setMockUserData({
                                                ...mockUserData,
                                                useYn: value === 12
                                            })}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* 상품정보 섹션 */}
                    <section>
                        <h3 className="text-3xl font-bold mb-10px py-5px my-5px">상품정보</h3>
                        <div className="p-20px bg-white rounded-default shadow-md">
                            <div className="flex justify-between">
                                <span className="text-2xl font-bold">상품명</span>
                                <span className="text-xl">{mockUserData.clsPkgNm}</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">결제수강권 ID</span>
                                <span className="text-xl">{mockUserData.clsPassid}</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">기본 금액</span>
                                <span className="text-xl">{mockUserData.price.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">기본 할인 금액</span>
                                <span className="text-xl">{mockUserData.discountAmtPkg.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">기본 회차</span>
                                <span className="text-xl">{mockUserData.clsPkgCnt}회</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">최대 사용기간</span>
                                <span className="text-xl">{mockUserData.expRate}일</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 오른쪽 컬럼 - 결제정보 */}
                <div className="flex-1">
                    <section>
                        <h3 className="text-3xl font-bold mb-10px">결제정보</h3>
                        <div className="p-20px bg-whiteGray rounded-default shadow-md">
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">결제 금액</span>
                                <span className="text-xl">{mockUserData.paidAmt.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">추가 할인 금액</span>
                                <span className="text-xl">{mockUserData.discountAmtPass.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">결제 일자</span>
                                <span className="text-xl">{mockUserData.payDate}</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">결제 수단</span>
                                <span className="text-xl">{mockUserData.paymethod}</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">할부개월수</span>
                                <span className="text-xl">{mockUserData.instMm}개월</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">결제자</span>
                                <span className="text-xl">{mockUserData.payUserNm}</span>
                            </div>
                            <div className="flex justify-between py-5px my-5px">
                                <span className="text-2xl font-bold">메모</span>
                                {editable && (
                                    <Textarea
                                        id="remark"
                                        value={mockUserData.remark}
                                        onChange={(value) => setMockUserData({...mockUserData, remark: value})}
                                        className="text-xl p-150px"
                                    />
                                )}
                                {!editable && (
                                    <span className="text-xl">{mockUserData.remark}</span>
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
                                    <span className="text-xl text-white">{mockUserData.refundDtm}</span>
                                    <span className="text-2xl font-bold text-white">환불 금액</span>
                                    <span
                                        className="text-xl text-white">{mockUserData.refundAmt.toLocaleString()}원</span>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* 추가 콘텐츠 영역 */}
            <div className="flex-1 px-20px">
                {/* 여기에 추가 콘텐츠가 들어갈 수 있습니다 */}
            </div>
        </div>
    )

}