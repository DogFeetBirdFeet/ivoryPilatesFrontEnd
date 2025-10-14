import type { ReactNode } from 'react';
import { create } from 'zustand';

export type OverlayType = 'popup' | 'sideSheet';

interface OverlayItem {
  id: string; // overlay id
  type: OverlayType; // overlay type
  component: ReactNode; // sideSheet 내부에 들어갈 컴포넌트
  props?: Record<string, any>; // 오버레이로 넘길 props
  options?: {
    closeOnDimClick?: boolean;
    closeOnEsc?: boolean;
    zIndex?: number;
  };
}

interface OverlayStore {
  overlays: OverlayItem[];
  open: (overlay: Omit<OverlayItem, 'id'>) => string;
  close: () => void;
  closePopupId: (id: string) => void;
  closeAll: () => void;
}

const useOverlayStore = create<OverlayStore>((set) => ({
  overlays: [],
  open: (overlay) => {
    const id = `overlay_${Date.now()}`;
    const newOverlay: OverlayItem = {
      ...overlay,
      id,
      type: overlay.type,
      options: {
        // 기본값 세팅
        closeOnDimClick: true,
        closeOnEsc: true,
        zIndex: 50,
        ...overlay.options, // 커스텀 값 세팅
      },
    };

    set((state) => ({
      overlays: [...state.overlays, newOverlay],
    }));
    return id;
  },
  close: () => {
    set((state) => ({
      overlays: state.overlays.slice(0, state.overlays.length - 2),
    }));
  },
  closePopupId: (id) => {
    set((state) => ({
      overlays: state.overlays.filter((overlay) => overlay.id !== id),
    }));
  },

  closeAll: () => {
    set({ overlays: [] });
  },
}));

export default useOverlayStore;
