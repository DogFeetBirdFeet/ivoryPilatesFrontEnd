import useOverlay from '@/hooks/useOverlay';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';
import InputAreaBasicText from "@/common/components/inputArea/InputAreaBasicText.tsx";

export default function PopupClsCancel() {
  const overlay = useOverlay();
  const navigate = useNavigate();

  function handleConfirm() {
    overlay.closePopup();
    navigate(-1);
  }
  function handleBack() {
    overlay.closePopup();
  }

  return (
    <Popup onClickConfirm={handleConfirm} onClickBack={handleBack}>
      <div>
          <div className="flex gap-20px h-30px items-center mb-10px">
            <span className="flex-1">환불 일자 </span>
            <InputAreaBasicText id={"1"} required={true} placeholder={"asd"} />
          </div>
          <div className="flex gap-20px h-30px items-center">
              <span className="flex-1">환불 금액</span>
              <InputAreaBasicText id={"1"} required={true} placeholder={"asd"} />
          </div>

      </div>
    </Popup>
  );
}
