import * as React from "react";
import {useMemo, useState} from "react";

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
    useYn: boolean;
}

interface ClsPassProps {
    data: IClsPassData[];
    isLoading: boolean;
}

const columns: {
    key: keyof IClsPassData;
    title: string;
    className?: string;
    render?: (value: any) => React.ReactNode;
}[] = [
    {key: 'clsPassId', title: '결제수강권ID', className: 'min-w-[140px]'},
    {key: 'cusNm', title: '회원명', className: 'min-w-[90px]'},
    {key: 'clsPkgNm', title: '상품명', className: 'min-w-[160px]'},
    {key: 'clsTyp', title: '상품타입', className: 'min-w-[80px]'},
    {key: 'price', title: '기본금액', className: 'min-w-[110px] text-right'},
    {key: 'paidAmt', title: '결제 금액', className: 'min-w-[110px] text-right'},
    {key: 'discountAmt', title: '기본할인금액', className: 'min-w-[120px] text-right'},
    {key: 'discountAmt2', title: '추가할인금액', className: 'min-w-[120px] text-right'},
    {key: 'totalCnt', title: '총 회차', className: 'min-w-[80px] text-right'},
    {key: 'remainCnt', title: '잔여 회차', className: 'min-w-[90px] text-right'},
    {key: 'expRate', title: '유효 기간', className: 'min-w-[120px]'},
    {
        key: 'payMethod',
        title: '결제 수단',
        className: 'min-w-[100px]',
        render: (value) => value === 'CASH' ? '현금' : '카드',

    },
    {key: 'payDate', title: '결제일자', className: 'min-w-[120px]'},
    {
        key: 'refundYn',
        title: '환불여부',
        className: 'min-w-[90px] text-center',
        render: (value) => <input type="checkbox" checked={value} disabled className="w-16px h-16px"/>,
    },
    {
        key: 'useYn',
        title: '사용여부',
        className: 'min-w-[90px] text-center',
        render: (value) => <input type="checkbox" checked={value} disabled className="w-16px h-16px"/>,
    },
];

const numericKeys: Array<keyof IClsPassData> = [
    'price', 'paidAmt', 'discountAmt', 'discountAmt2', 'totalCnt', 'remainCnt',
];

function toNumber(v: unknown) {
    const num = typeof v === 'number' ? v : Number(v ?? 0);
    return Number.isFinite(num) ? num : 0;
}

const formatNumber = (n: unknown) =>
    new Intl.NumberFormat('ko-KR', {maximumFractionDigits: 0}).format(toNumber(n));

const commonStyle = 'flex justify-center items-center';

export default function ClsPassTable({data, isLoading}: ClsPassProps) {
    const [selectedRowIndex, setSelectedRowIndex] = useState<string | null>(null);

    const summary = useMemo(() => {
        return data.reduce(
            (acc, cur) => {
                acc.totalPayCnt += 1;
                acc.totalPayAmt += toNumber(cur.paidAmt);
                // 기본 + 추가 할인 합산이 맞다면 이렇게
                acc.totalDisAmt += toNumber(cur.discountAmt) + toNumber(cur.discountAmt2);
                acc.totalRefCnt += cur.refundYn ? 1 : 0;
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

    return (
        <div className="h-full w-full max-h-[calc(100vh-340px)] flex flex-col overflow-hidden min-h-0">
            {/* 테이블 헤더 */}
            <div
                className="flex-shrink-0 h-40px flex justify-between bg-ppGridHeader text-white font-medium text-sm rounded-t-[5px] mx-20px">
                {columns.map((col) => (
                    <div key={col.key} className={`flex justify-center items-center ${col.className}`}>
                        {col.title}
                    </div>
                ))}
            </div>

            {/* 테이블 바디 */}
            <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar mx-20px">
                {data.map((item) => (
                    <div
                        key={item.clsPassId}
                        className={`h-40px flex justify-between text-gray text-base border-b-[1px]  ${
                            selectedRowIndex === item.clsPassId ? 'bg-yellow' : 'bg-white'
                        }`}
                        onDoubleClick={() => setSelectedRowIndex(item.clsPassId)}
                    >
                        {columns.map((col) => {
                            const raw = item[col.key];
                            const content = col.render
                                ? col.render(raw)
                                : (numericKeys.includes(col.key) ? formatNumber(raw) : (raw as any));
                            return (
                                <div key={col.key} className={`${commonStyle} ${col.className} cursor-pointer`}>
                                    {content}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* 하단 합계 바 */}
            {/*<div className="px-10px mr-20px py-10px rounded-default flex-shrink-0 mx-20px">*/}
                <div className="flex-shrink-0 overflow-y-auto mr-20px min-h-0 mx-20px">
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