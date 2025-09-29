import useOverlay from '@/hooks/useOverlay';
import {useNavigate} from 'react-router-dom';
import iconLogout from '@/assets/icon/yellow/icon_cls.png';
import iconSave from '@/assets/icon/white/icon_save.png';
import iconCancel from '@/assets/icon/purple/icon_cancel.png';
import InputDate from "@/common/components/inputArea/InputDate.tsx";
import PopupConfirm from "@/common/popup/PopupConfirm.tsx";
import {useForm} from "react-hook-form";
import {dateFormatToString} from "@/utils/date.ts";
import {useEffect} from "react";
import InputMoney from "@/common/components/inputArea/InputMoney.tsx";

interface ISearchForm {
    refundDate: string;
    refundAmount: string;
}

export default function PopupRefundCls() {

    const {watch, setValue} = useForm<ISearchForm>({
        defaultValues: {
            refundDate: dateFormatToString(new Date()),
            refundAmount: ''
        },
    });

    const formValues = watch();
    const overlay = useOverlay();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('📝 Form State:', {
            refundDate: formValues.refundDate,
            refundAmount: formValues.refundAmount
        });
    }, [formValues]);

    function handleConfirm() {
        overlay.closePopup();
        navigate(-1);
    }

    function handleBack() {
        overlay.closePopup();
    }

    return (
        <PopupConfirm
            imgSrc={iconLogout}
            titleText="환불하기"
            onClickConfirm={handleConfirm}
            onClickBack={handleBack}
            confirmText='저장하기'
            cancelText='취소하기'
            imgSrcConfirm={iconSave}
            imgSrcCancel={iconCancel}
        >
            <div>
                <div className="flex gap-20px h-30px items-center mb-10px">
                    <label htmlFor="refundDate">
                        환불 일자 <span className="text-red">*</span>
                    </label>
                    <InputDate
                        id="refundDate"
                        value={watch('refundDate')}
                        onChange={(value) => setValue('refundDate', value)}
                        className="required ml-auto"
                    />
                </div>
                <div className="flex gap-20px h-30px items-center">
                    <label htmlFor="refundAmount">
                        환불 금액 <span className="text-red">*</span>
                    </label>
                    <InputMoney
                        id="refundAmount"
                        value={watch('refundAmount')}
                        className="required ml-auto"
                        onChange={(value) => setValue('refundAmount', value)}
                    />
                </div>
            </div>
        </PopupConfirm>
    );
}
