import useOverlay from '@/hooks/useOverlay';
import { useNavigate } from 'react-router-dom';
import iconLogout from '@/assets/icon/yellow/icon_cls.png';
import iconSave from '@/assets/icon/white/icon_save.png';
import iconCancel from '@/assets/icon/purple/icon_cancel.png';
import InputMoney from "@/common/components/inputArea/InputMoney.tsx";
import InputDate from "@/common/components/inputArea/InputDate.tsx";
import PopupConfirm from "@/common/popup/PopupConfirm.tsx";

export default function PopupRefundCls() {
    const overlay = useOverlay();
    const navigate = useNavigate();

    function handleConfirm() {
        overlay.closePopup();
        navigate(-1);
    }

    function handleBack() {
        overlay.closePopup();
    }

    const refundDateId = 'refund-date';
    const refundAmountId = 'refund-amount';

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
                    <label htmlFor={refundDateId}>
                        환불 일자 <span className="text-red">*</span>
                    </label>
                    <InputDate id={refundDateId} className="required ml-auto" />
                </div>
                <div className="flex gap-20px h-30px items-center">
                    <label htmlFor={refundAmountId}>
                        환불 금액 <span className="text-red">*</span>
                    </label>
                    <InputMoney id={refundAmountId} className="required ml-auto" />
                </div>
            </div>
        </PopupConfirm>
    );
}
