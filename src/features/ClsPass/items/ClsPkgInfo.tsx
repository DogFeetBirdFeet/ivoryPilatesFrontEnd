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
                <h3 className="text-3xl font-bold text-ppm py-5px my-5px">상품정보</h3>
                {currentUseAge === 5 && (
                    <BtnIconText type="A" icon={iconClsPkg} text="상품 검색하기" onClick={() => {
                    }}/>
                )}
            </div>
            <div className="p-20px bg-white rounded-md">
                <div className="flex items-center py-5px my-5px">
                    <span className="text-2xl font-bold text-ppm w-200px">상품명</span>
                    <span className="text-2xl ml-20px">{data.clsPkgNm}</span>
                </div>
                <div className="flex items-center py-5px my-5px">
                    <span className="text-2xl font-bold text-ppm w-200px">결제수강권 ID</span>
                    <span className="text-2xl ml-20px">{data.clsPassId}</span>
                </div>
                <div className="flex items-center py-5px my-5px">
                    <span className="text-2xl font-bold text-ppm w-200px">기본 금액</span>
                    <span className="text-2xl ml-20px">{data.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center py-5px my-5px">
                    <span className="text-2xl font-bold text-ppm w-200px">기본 할인 금액</span>
                    <span className="text-2xl ml-20px">{data.discountAmtPkg.toLocaleString()}</span>
                </div>
                <div className="flex items-center py-5px my-5px">
                    <span className="text-2xl font-bold text-ppm w-200px">기본 회차</span>
                    <span className="text-2xl ml-20px">{data.clsPkgCnt}회</span>
                </div>
                <div className="flex items-center py-5px my-5px">
                    <span className="text-2xl font-bold text-ppm w-200px">최대 사용기간</span>
                    <span className="text-2xl ml-20px">{data.expRate}일</span>
                </div>
            </div>
        </section>
    );
}
