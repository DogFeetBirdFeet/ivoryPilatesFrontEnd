import {useLayoutContext} from "@/hooks/useLayoutContext.ts";
import {useEffect} from "react";
import headerIcon from "@/assets/icon/yellow/icon_mem.png";
import InputText from "@/common/components/inputArea/InputText.tsx";
import BtnSearch from "@/common/components/buttons/BtnSearch.tsx";
import InputDate from "@/common/components/inputArea/InputDate.tsx";
import ClsPassAll from "@/features/ClsPass/sections/ClsPassAll.tsx"

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

        <div className="h-full flex flex-col">

            {/* 서치 바 */}
            <section className="flex p-20px gap-30px font-medium text-xl text-black bg-ppLight rounded-default mt-10px flex-shrink-0">
                <div className="flex-1 flex gap-30px">
                    <div className="flex items-center gap-10px">
                        <label htmlFor={payDateId} className="flex-shrink-0 whitespace-nowrap">
                            결제 일자
                        </label>
                        <InputDate id={payDateId} className="required ml-auto" />
                        <span>~</span>
                        <InputDate id={`${payDateId}-end`} className="required ml-auto" />
                    </div>

                    <div className="flex items-center gap-10px">
                        <label htmlFor={refundDateId} className="flex-shrink-0 whitespace-nowrap">
                            환불 일자
                        </label>
                        <InputDate id={refundDateId} className="required ml-auto" />
                        <span>~</span>
                        <InputDate id={`${refundDateId}-end`} className="required ml-auto" />
                    </div>

                    <div className="flex items-center gap-10px">
                        <label htmlFor={cusNm} className="flex-shrink-0 whitespace-nowrap">
                            회원명
                        </label>
                        <InputText id={cusNm} className="required ml-auto" />
                    </div>

                    <div className="flex items-center gap-10px">
                        <label htmlFor={payNm} className="flex-shrink-0 whitespace-nowrap">
                            결제자
                        </label>
                        <InputText id={payNm} className="required ml-auto" />
                    </div>
                </div>

                <BtnSearch />
            </section>

            <ClsPassAll />
        </div>
    )

}