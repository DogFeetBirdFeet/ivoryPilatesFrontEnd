import * as React from "react";
import {useState} from "react";

type Row = {
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
    refundYn: string; // 'Y' | 'N'
};

// 결제 수강권 Mock 데이터
const mockData: Row[] = [
    {
        clsPassId: 'PAYCLS_1',
        cusNm: '김혜준',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 700000,
        discountAmt: 0,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CASH',
        payDate: '2025-08-01',
        refundYn: 'N',
    },
    {
        clsPassId: 'PAYCLS_2',
        cusNm: '원예진',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 680000,
        discountAmt: 20000,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CARD',
        payDate: '2025-08-01',
        refundYn: 'N'
    },
    {
        clsPassId: 'PAYCLS_1',
        cusNm: '김혜준',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 700000,
        discountAmt: 0,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CASH',
        payDate: '2025-08-01',
        refundYn: 'N',
    },
    {
        clsPassId: 'PAYCLS_2',
        cusNm: '원예진',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 680000,
        discountAmt: 20000,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CARD',
        payDate: '2025-08-01',
        refundYn: 'N'
    },
    {
        clsPassId: 'PAYCLS_1',
        cusNm: '김혜준',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 700000,
        discountAmt: 0,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CASH',
        payDate: '2025-08-01',
        refundYn: 'N',
    },
    {
        clsPassId: 'PAYCLS_2',
        cusNm: '원예진',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 680000,
        discountAmt: 20000,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CARD',
        payDate: '2025-08-01',
        refundYn: 'N'
    },
    {
        clsPassId: 'PAYCLS_1',
        cusNm: '김혜준',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 700000,
        discountAmt: 0,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CASH',
        payDate: '2025-08-01',
        refundYn: 'N',
    },
    {
        clsPassId: 'PAYCLS_2',
        cusNm: '원예진',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 680000,
        discountAmt: 20000,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CARD',
        payDate: '2025-08-01',
        refundYn: 'N'
    },
    {
        clsPassId: 'PAYCLS_1',
        cusNm: '김혜준',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 700000,
        discountAmt: 0,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CASH',
        payDate: '2025-08-01',
        refundYn: 'N',
    },
    {
        clsPassId: 'PAYCLS_2',
        cusNm: '원예진',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 680000,
        discountAmt: 20000,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CARD',
        payDate: '2025-08-01',
        refundYn: 'N'
    },
    {
        clsPassId: 'PAYCLS_1',
        cusNm: '김혜준',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 700000,
        discountAmt: 0,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CASH',
        payDate: '2025-08-01',
        refundYn: 'N',
    },
    {
        clsPassId: 'PAYCLS_2',
        cusNm: '원예진',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 680000,
        discountAmt: 20000,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CARD',
        payDate: '2025-08-01',
        refundYn: 'N'
    },
    {
        clsPassId: 'PAYCLS_1',
        cusNm: '김혜준',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 700000,
        discountAmt: 0,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CASH',
        payDate: '2025-08-01',
        refundYn: 'N',
    },
    {
        clsPassId: 'PAYCLS_2',
        cusNm: '원예진',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 680000,
        discountAmt: 20000,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CARD',
        payDate: '2025-08-01',
        refundYn: 'N',
    },
    {
        clsPassId: 'PAYCLS_1',
        cusNm: '김혜준',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 700000,
        discountAmt: 0,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CASH',
        payDate: '2025-08-01',
        refundYn: 'N',
    },
    {
        clsPassId: 'PAYCLS_2',
        cusNm: '원예진',
        clsPkgNm: '1:1 10회 기본',
        clsTyp: '1:1',
        price: 700000,
        paidAmt: 680000,
        discountAmt: 20000,
        discountAmt2: 0,
        totalCnt: 10,
        remainCnt: 5,
        expRate: '2025-10-30',
        payMethod: 'CARD',
        payDate: '2025-08-01',
        refundYn: 'N'
    },
    // ...원하는 만큼 추가
];

const footerSummary = {
    totalPayCnt: 999,
    totalPayAmt: 9999999,
    totalDisAmt: 9999999,
    totalRefCnt: 999,
    totalCardCnt: 999,
    totalCashCnt: 999,
};

function formatNumber(n: number) {
    return n.toLocaleString();
}

export default function ClsPassAll() {
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

    const columns: { key: keyof Row; title: string; className?: string }[] = [
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
        {key: 'payMethod', title: '결제 수단', className: 'min-w-[100px]'},
        {key: 'payDate', title: '결제일자', className: 'min-w-[120px]'},
        {key: 'refundYn', title: '환불여부', className: 'min-w-[90px] text-center'},
    ];


    return (
        <section className="flex-1 flex flex-col min-h-0">
            {/* 테이블 헤더 */}
            <div className="px-10px mr-20px bg-ppGridHeader py-10px rounded-default flex-shrink-0">
                <div
                    className="grid items-center gap-10px"
                    style={{
                        gridTemplateColumns:
                            "10fr 10fr 25fr 10fr 12fr 12fr 12fr 12fr 10fr 10fr 15fr 10fr 15fr 9fr"
                    }}
                >
                    {columns.map(col => (
                        <div
                            key={col.key as string}
                            className={`text-white text-center ${col.className || ''}`}
                        >
                            {col.title}
                        </div>
                    ))}
                </div>
            </div>

            {/* 테이블 바디 */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="px-10px mr-20px py-10px rounded-default flex-shrink-0">
                    {mockData.map((row, idx) => (
                        <div
                            key={idx}
                            className={`flex-1 py-10px  border-b border-whiteGray cursor-pointer hover ${
                                selectedRowIndex === idx ? 'bg-yellow' : idx % 2 === 1 ? 'bg-white' : 'bg-white'
                            }`}
                            onClick={() => setSelectedRowIndex(selectedRowIndex === idx ? null : idx)}
                        >
                            <div
                                className="grid items-center gap-10px"
                                style={{
                                    gridTemplateColumns:
                                        "10fr 10fr 25fr 10fr 12fr 12fr 12fr 12fr 10fr 10fr 15fr 10fr 15fr 9fr"
                                }}
                            >
                                {columns.map(col => {
                                    const v = row[col.key];
                                    const isNum =
                                        typeof v === 'number' &&
                                        ['price', 'paidAmt', 'discountAmt', 'discountAmt2', 'totalCnt', 'remainCnt'].includes(
                                            col.key as string
                                        );
                                    return (
                                        <div
                                            key={col.key as string}
                                            className={`px-3 py-2 ${
                                                col.className?.includes('text-right') ? 'text-right' :
                                                    col.className?.includes('text-center') ? 'text-center' : 'text-left'
                                            }`}
                                        >
                                            {isNum ? formatNumber(v as number) : (v as React.ReactNode)}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 하단 합계 바 */}
            <div className="px-10px mr-20px py-10px rounded-default flex-shrink-0">
                <div className="grid grid-cols-6 items-center">
                    <div className="col-span-6 bg-lightGray text-white grid grid-cols-6">
                        <div className="px-3 py-2 border-r border-gray">총 결제건수 <span
                            className="float-right">{formatNumber(footerSummary.totalPayCnt)}</span></div>
                        <div className="px-3 py-2 border-r border-gray">총 결제금액 <span
                            className="float-right">{formatNumber(footerSummary.totalPayAmt)}</span></div>
                        <div className="px-3 py-2 border-r border-gray">총 할인금액 <span
                            className="float-right">{formatNumber(footerSummary.totalDisAmt)}</span></div>
                        <div className="px-3 py-2 border-r border-gray">총 환불건수 <span
                            className="float-right">{formatNumber(footerSummary.totalRefCnt)}</span></div>
                        <div className="px-3 py-2 border-r border-gray">카드 결제건수 <span
                            className="float-right">{formatNumber(footerSummary.totalCardCnt)}</span></div>
                        <div className="px-3 py-2 border-r border-gray">계좌 결제건수 <span
                            className="float-right">{formatNumber(footerSummary.totalCashCnt)}</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
}