import useOverlayStore from '@/common/Layout/store/overlayStore';
import type { ReactNode } from 'react';

export default function useOverlay() {
  const { open, close, closePopupId, closeLast, closeAll } = useOverlayStore();

  const showPopup = (component: ReactNode, popupType?: 'popup' | 'sideSheet') => {
    return open({
      type: popupType || 'popup',
      component,
      options: {
        closeOnDimClick: true,
        closeOnEsc: true,
      },
    });
  };

  const closePopup = (popupId?: string) => {
    if (popupId) {
      // 가장 최근에 열린 팝업 닫기
      const overlays = useOverlayStore.getState().overlays;
      const lastOverlay = overlays[overlays.length - 1];
      if (lastOverlay) {
        closePopupId(lastOverlay.id);
      }
    } else {
      close();
    }
  };

  const closeLastPopup = () => {
    closeLast();
  };

  const closeAllPopups = () => {
    closeAll();
  };

  return { showPopup, closePopup, closeLastPopup, closeAllPopups };
}
