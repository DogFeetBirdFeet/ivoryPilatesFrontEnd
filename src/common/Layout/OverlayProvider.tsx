import { useEffect } from 'react';
import useOverlayStore from './store/overlayStore';
import { AnimatePresence, motion, type HTMLMotionDivProps } from 'framer-motion';

const MotionDiv = motion('div') as React.FC<HTMLMotionDivProps>;

export default function OverlayProvider() {
  const { overlays, closePopupId, closeAll } = useOverlayStore();

  // ESC 키와 body 스크롤 관리
  useEffect(() => {
    // 가장 위에 있는 overlay ESC 버튼 입력 이벤트
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && overlays.length > 0) {
        const topOverlay = overlays[overlays.length - 1];
        if (topOverlay.options?.closeOnEsc) {
          closePopupId(topOverlay.id);
        }
      }
    };

    // overlay가 있을 때만 처리
    if (overlays.length > 0) {
      // 기존 값 저장 (한 번만)
      const originalOverflow = window.getComputedStyle(document.body).overflow;

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // 원래 값으로 복원 (또는 빈 문자열)
        document.body.style.overflow = originalOverflow === 'hidden' ? 'hidden' : originalOverflow;
      };
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [overlays, close]);

  // DIM 클릭 처리 -> sideSheet나 모달인 상세페이지에서만 쓸것!!!!!!
  const handleDimClick = () => {
    console.log(overlays);
    if (overlays.length === 1 && overlays[0].options?.closeOnDimClick) {
      closeAll();
    }
  };

  return (
    <AnimatePresence>
      {overlays.length > 0 && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-40"
          style={{
            zIndex: 50,
          }}
          onClick={() => {
            handleDimClick();
          }}
        >
          {overlays.map((overlay, index) => {
            return (
              <MotionDiv
                key={overlay.id}
                className="h-full w-full flex items-center justify-center"
                style={{
                  pointerEvents: 'none',
                  position: 'absolute',
                  zIndex: index,
                }}
              >
                <div style={{ pointerEvents: 'auto' }} onClick={(e) => e.stopPropagation()}>
                  {overlay.component}
                </div>
              </MotionDiv>
            );
          })}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
