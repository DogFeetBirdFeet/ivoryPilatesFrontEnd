import useOverlay from '@/hooks/useOverlay';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';

export default function PopupCancel() {
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
        <p>변경된 정보는 저장되지 않습니다.</p>
        <p>정말 취소하시겠습니까?</p>
      </div>
    </Popup>
  );
}
