import BtnIconText from '@/common/components/buttons/BtnIconText.tsx';
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

export default function ClsPkgInfo({ data, currentUseAge }: IClsPkgInfoProps) {
  return (
    <section>
      <div className="h-70px flex items-center gap-[5px]">
        <h3 className="text-[26px] leading-[26px] font-bold text-ppm">상품정보</h3>
        {currentUseAge === 5 && <BtnIconText type="A" icon={iconClsPkg} text="상품 검색하기" onClick={() => {}} />}
      </div>

      <div className="flex flex-col gap-20px p-20px bg-white rounded-default">
        <div className="flex items-center">
          <span className="text-xl font-bold text-ppm w-[200px]">상품명</span>
          <span className="text-xl">{data.clsPkgNm}</span>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold text-ppm w-[200px]">결제수강권 ID</span>
          <span className="text-xl">{data.clsPassId}</span>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold text-ppm w-[200px]">기본 금액</span>
          <span className="text-xl">{data.price.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold text-ppm w-[200px]">기본 할인 금액</span>
          <span className="text-xl">{data.discountAmtPkg.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold text-ppm w-[200px]">기본 회차</span>
          <span className="text-xl">{data.clsPkgCnt}회</span>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold text-ppm w-[200px]">최대 사용기간</span>
          <span className="text-xl">{data.expRate}일</span>
        </div>
      </div>
    </section>
  );
}
