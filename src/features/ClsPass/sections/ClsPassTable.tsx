import * as React from "react";
import {useMemo, useState} from "react";

interface IClsPassData {
    clsPkgId: number;
    clsPassId: number;
    userId: number;
    userNm: string;
    clsPkgNm: string;
    clsType: string;
    price: number;
    paidAmt: number;
    discountAmt: number;
    discountAmt2: number;
    totalCnt: number;
    remainCnt: number;
    expRate: string;
    payMethod: string;  // 'CARD' | 'CASH'
    payDate: string;
    refundYn: string; // 'Y' | 'N'
    useYn: string;
}

interface ClsPassProps {
    data: IClsPassData[];
    isLoading: boolean;
    onDetailView?: (item: IClsPassData) => void;
}

const columns: {
    key: keyof IClsPassData;
    title: string;
    className?: string;
    render?: (value: unknown) => React.ReactNode;
}[] = [
    {key: 'clsPassId', title: '결제수강권ID', className: 'min-w-[100px]'},
    {key: 'userId', title: '회원ID', className: 'hidden'},
    {key: 'userNm', title: '회원명', className: 'min-w-[100px]'},
    {key: 'clsPkgNm', title: '상품명', className: 'min-w-[250px] max-w-[250px]'},
    {
        key: 'clsType',
        title: '상품타입',
        className: 'min-w-[100px]',
        render: (value) => value === 'IOI' ? '1 : 1 수업' : '2 : 1 수업',
    },
    {key: 'price', title: '기본금액', className: 'min-w-[120px] text-right'},
    {key: 'paidAmt', title: '결제 금액', className: 'min-w-[120px] text-right'},
    {key: 'discountAmt', title: '기본할인금액', className: 'min-w-[120px] text-right'},
    {key: 'discountAmt2', title: '추가할인금액', className: 'min-w-[120px] text-right'},
    {key: 'totalCnt', title: '총 회차', className: 'min-w-[100px] text-right'},
    {key: 'remainCnt', title: '잔여 회차', className: 'min-w-[100px] text-right'},
    {
        key: 'expRate', 
        title: '유효 기간', 
        className: 'min-w-[150px]',
        render: (value) => String(value).substring(0, 4) + '-' + String(value).substring(4, 6) + '-' + String(value).substring(6, 8),
    },
    {
        key: 'payMethod',
        title: '결제 수단',
        className: 'min-w-[100px]',
        render: (value) => value === 'CASH' ? '계좌이체' : '카드',

    },
    {
        key: 'payDate', 
        title: '결제일자', 
        className: 'min-w-[150px]',
        render: (value) => String(value).substring(0, 4) + '-' + String(value).substring(4, 6) + '-' + String(value).substring(6, 8),
    },
    {
        key: 'refundYn',
        title: '환불여부',
        className: 'min-w-[90px] text-center',
        render: (value) => <input type="checkbox" checked={value === 'Y'} disabled className="w-16px h-16px"/>,
    },
    {
        key: 'useYn',
        title: '사용여부',
        className: 'min-w-[90px] text-center',
        render: (value) => <input type="checkbox" checked={value === 'Y'} disabled className="w-16px h-16px"/>,
    },
];

const numericKeys: Array<keyof IClsPassData> = [
    'clsPassId', 'clsPkgId', 'userId', 'price', 'paidAmt', 'discountAmt', 'discountAmt2', 'totalCnt', 'remainCnt',
];

function toNumber(v: unknown) {
    const num = typeof v === 'number' ? v : Number(v ?? 0);
    return Number.isFinite(num) ? num : 0;
}

const formatNumber = (n: unknown) =>
    new Intl.NumberFormat('ko-KR', {maximumFractionDigits: 0}).format(toNumber(n));

export default function ClsPassTable({data, isLoading, onDetailView}: ClsPassProps) {

    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

    const summary = useMemo(() => {
        return data.reduce(
            (acc, cur) => {
                acc.totalPayCnt += 1;
                acc.totalPayAmt += toNumber(cur.paidAmt);
                // 기본 + 추가 할인 합산이 맞다면 이렇게
                acc.totalDisAmt += toNumber(cur.discountAmt) + toNumber(cur.discountAmt2);
                acc.totalRefCnt += cur.refundYn === 'Y' ? 1 : 0;
                acc.totalCardCnt += cur.payMethod === 'CARD' ? 1 : 0;
                acc.totalCashCnt += cur.payMethod === 'CASH' ? 1 : 0;
                return acc;
            },
            {
                totalPayCnt: 0,
                totalPayAmt: 0,
                totalDisAmt: 0,
                totalRefCnt: 0,
                totalCardCnt: 0,
                totalCashCnt: 0,
            }
        );
    }, [data]);

    //   TODO
    if (isLoading) {
        return <div>로딩중</div>;
    }
    if (data.length === 0) {
        return (
            <div className="h-full w-full flex justify-center items-center font-medium text-gray">조회된 데이터가 없습니다</div>
        );
    }

    const handleRegisterClick = (item: IClsPassData) => {
        console.log('더블클릭된 아이템:', item);
        // 부모 컴포넌트에 상세 페이지 진입 알림 (선택된 아이템 전달)
        if (onDetailView) {
            onDetailView(item);
        }
    };

    return (
        <div className="h-full w-full max-h-[calc(100vh-340px)] flex flex-col overflow-hidden min-h-0">
            {/* 테이블 헤더 */}
            <div
                className="flex-shrink-0 h-40px flex justify-between bg-ppGridHeader text-xl text-white font-bold text-sm rounded-t-[5px] mx-20px">
                {columns.map((col) => (
                    <div key={col.key} className={`flex justify-center items-center ${col.className} ${
                        col.className?.includes('text-center') ? 'flex justify-center items-center' :
                        col.className?.includes('text-right') ? 'flex justify-end items-center' :
                        'flex justify-start items-center'
                    }`}>
                        {col.title}
                    </div>
                ))}
            </div>

            {/* 테이블 바디 */}
            <div className="flex-shrink-0 flex-1 min-h-0 overflow-y-scroll mx-20px">
                {data.map((item) => (
                    <div
                        key={item.clsPassId}
                        className={`h-40px flex justify-between text-black text-[14px] border-b-[1px]  ${
                            selectedRowIndex === item.userId ? 'bg-yellow' : 'bg-white'
                        }`}
                        onClick={() => setSelectedRowIndex(item.userId)}
                        onDoubleClick={() => handleRegisterClick(item)}
                    >
                        {columns.map((col) => {
                            const raw = item[col.key];
                            const content = col.render
                                ? col.render(raw)
                                : (numericKeys.includes(col.key) ? formatNumber(raw) : String(raw));
                            return (
                                <div key={col.key} className={`flex justify-center items-center ${col.className} cursor-pointer ${
                                    col.key === 'clsPkgNm' ? 'truncate' : ''
                                } ${
                                    col.className?.includes('text-center') ? 'flex justify-center items-center' :
                                    col.className?.includes('text-right') ? 'flex justify-end items-center' :
                                    'flex justify-start items-center'
                                }`}>
                                    {content}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* 하단 합계 바 */}
            {/*<div className="px-10px mr-20px py-10px rounded-default flex-shrink-0 mx-20px">*/}
            <div className="flex-shrink-0 overflow-y-auto mr-20px min-h-0 mx-20px mt-30px">
                <div className="grid grid-cols-6 items-center">
                    <div className="col-span-6 bg-lightGray text-white grid grid-cols-6">
                        <div className="px-3 py-2 border-r border-gray">총 결제건수 <span
                            className="float-right">{formatNumber(summary.totalPayCnt)}</span></div>
                        <div className="px-3 py-2 border-r border-gray">총 결제금액 <span
                            className="float-right">{formatNumber(summary.totalPayAmt)}</span></div>
                        <div className="px-3 py-2 border-r border-gray">총 할인금액 <span
                            className="float-right">{formatNumber(summary.totalDisAmt)}</span></div>
                        <div className="px-3 py-2 border-r border-gray">총 환불건수 <span
                            className="float-right">{formatNumber(summary.totalRefCnt)}</span></div>
                        <div className="px-3 py-2 border-r border-gray">카드 결제건수 <span
                            className="float-right">{formatNumber(summary.totalCardCnt)}</span></div>
                        <div className="px-3 py-2 border-r border-gray">계좌 결제건수 <span
                            className="float-right">{formatNumber(summary.totalCashCnt)}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}