import useOverlayStore from '@/common/Layout/store/overlayStore';
import type { ReactNode } from 'react';

export default function useOverlay() {
  const { open, close, closeAll } = useOverlayStore();

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

  return { showPopup };
}
