import { useLayoutContext } from '@/hooks/useLayoutContext.ts';
import { useEffect } from 'react';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import InputText from '@/common/components/inputArea/InputText.tsx';
import BtnSearch from '@/common/components/buttons/BtnSearch.tsx';
import InputDate from '@/common/components/inputArea/InputDate.tsx';
import ClsPassAll from '@/features/ClsPass/sections/ClsPassAll.tsx';
import iconPlus from '@/assets/icon/white/icon_cls_plus.png';
import BtnIconText from '@/common/components/buttons/BtnIconText.tsx';
import SelectBox from '@/common/components/inputArea/SelectBox.tsx';
import iconFilter from '@/assets/icon/white/icon_filter.png';

type CoddIdAndName = {
  codeId: number;
  dtlNm: string;
};

// 결제 수강권 Mock 데이터
const mockDataPAYMET: CoddIdAndName[] = [
  {
    codeId: 7,
    dtlNm: 'CARD',
  },
  {
    codeId: 8,
    dtlNm: 'CASH',
  },
];
const mockDataYN: CoddIdAndName[] = [
  {
    codeId: 12,
    dtlNm: 'Y',
  },
  {
    codeId: 13,
    dtlNm: 'N',
  },
];

export default function ClassPass() {
  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('결제 수강권');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  const payDateId = 'pay-date';
  const refundDateId = 'refund-date';
  const cusNm = 'cus-nm';
  const payNm = 'pay-nm';
  return (
    <div className="w-full h-full flex flex-col">
      {/* 버튼 */}
      <section className="flex justify-end py-5px">
        <BtnIconText type="A" icon={iconPlus} text="신규결제 등록하기" onClick={() => {}} />
      </section>
      {/* 서치 바 */}
      <section className="flex p-20px gap-30px font-medium text-xl text-black bg-ppLight rounded-default mt-10px flex-shrink-0">
        <div className="flex-1 flex justify-between">
          <div className="flex items-center gap-10px">
            <label htmlFor={payDateId} className="flex-shrink-0 whitespace-nowrap mr-10px">
              결제 일자
            </label>
            <InputDate id={payDateId} className="required ml-auto w-130px" />
            <span>~</span>
            <InputDate id={`${payDateId}-end`} className="required ml-auto w-130px" />
          </div>

          <div className="flex items-center gap-10px">
            <label htmlFor={refundDateId} className="flex-shrink-0 whitespace-nowrap mr-10px">
              환불 일자
            </label>
            <InputDate id={refundDateId} className="required ml-auto w-130px" />
            <span>~</span>
            <InputDate id={`${refundDateId}-end`} className="required ml-auto w-130px" />
          </div>

          <div className="flex items-center gap-10px">
            <label htmlFor={cusNm} className="flex-shrink-0 whitespace-nowrap mr-10px">
              회원명
            </label>
            <InputText id={cusNm} className="required ml-auto" />
          </div>

          <div className="flex items-center gap-10px mr-10px">
            <label htmlFor={payNm} className="flex-shrink-0 whitespace-nowrap">
              결제자
            </label>
            <InputText id={payNm} className="required ml-auto" />
          </div>
        </div>
        <BtnSearch />
      </section>
      {/* 필터 */}
      <section className="flex justify-end py-10px gap-10px font-medium text-xl text-black rounded-default mt-10px flex-shrink-0">
        <SelectBox id="use-yn" label="상품 사용 여부" options={mockDataYN} icon={iconFilter} className="w-180px" />
        <SelectBox id="refund-yn" label="환불 여부" options={mockDataYN} className="w-180px" />
        <SelectBox id="pay-method" label="결제 수단" options={mockDataPAYMET} className="w-180px" />
      </section>
      {/* 테이블 그리드 */}
      <ClsPassAll />
    </div>
  );
}
