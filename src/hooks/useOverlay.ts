import useOverlayStore from '@/common/Layout/store/overlayStore';
import type { ReactNode } from 'react';

export default function useOverlay() {
  const { overlays, open, close, closeAll } = useOverlayStore();

  const showPopup = (component: ReactNode) => {
    return open({
      type: 'popup',
      component,
      options: {
        closeOnDimClick: true,
        closeOnEsc: true,
      },
    });
  };

  const closePopup = (popupId?: string) => {
    if (popupId) {
      close(popupId);
    } else {
      // 가장 최근에 열린 팝업 닫기
      const lastOverlay = overlays[overlays.length - 1];
      if (lastOverlay) {
        close(lastOverlay.id);
      }
    }
  };

  const closeAllPopups = () => {
    closeAll();
  };

  return { showPopup, closePopup, closeAllPopups };
}
