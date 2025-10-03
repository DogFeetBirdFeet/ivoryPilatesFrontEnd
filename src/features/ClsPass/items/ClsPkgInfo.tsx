import BtnIconText from "@/common/components/buttons/BtnIconText.tsx";
import iconClsPkg from '@/assets/icon/white/icon_cls_pkg.png';

interface IClsPkgInfoData {
    clsPkgNm: string;
    clsPassId: string;
    price: number;
    discountAmtPkg: number;
    clsPkgCnt: number;
    expRate: string;
}

interface IClsPkgInfoProps {
    data: IClsPkgInfoData;
    currentUseAge: number;
}

export default function ClsPkgInfo({data, currentUseAge}: IClsPkgInfoProps) {
    return (
        <section>
            <div className="flex items-center gap-5px mb-10px">
                <h3 className="text-3xl font-bold py-5px my-5px">상품정보</h3>
                {currentUseAge === 5 && (
                    <BtnIconText type="A" icon={iconClsPkg} text="상품 검색하기" onClick={() => {
                    }}/>
                )}
            </div>
            <div className="p-20px bg-white rounded-default shadow-md">
                <div className="flex justify-between">
                    <span className="text-2xl font-bold">상품명</span>
                    <span className="text-xl">{data.clsPkgNm}</span>
                </div>
                <div className="flex justify-between py-5px my-5px">
                    <span className="text-2xl font-bold">결제수강권 ID</span>
                    <span className="text-xl">{data.clsPassId}</span>
                </div>
                <div className="flex justify-between py-5px my-5px">
                    <span className="text-2xl font-bold">기본 금액</span>
                    <span className="text-xl">{data.price.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between py-5px my-5px">
                    <span className="text-2xl font-bold">기본 할인 금액</span>
                    <span className="text-xl">{data.discountAmtPkg.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between py-5px my-5px">
                    <span className="text-2xl font-bold">기본 회차</span>
                    <span className="text-xl">{data.clsPkgCnt}회</span>
                </div>
                <div className="flex justify-between py-5px my-5px">
                    <span className="text-2xl font-bold">최대 사용기간</span>
                    <span className="text-xl">{data.expRate}일</span>
                </div>
            </div>
        </section>
    );
}
