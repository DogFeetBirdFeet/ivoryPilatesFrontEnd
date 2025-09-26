import { Outlet, useLocation } from 'react-router-dom';
import MenuBar from './MenuBar';
import MiniBar from './MiniBar';
import { useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type HTMLMotionAsideProps,
  type HTMLMotionDivProps,
} from 'framer-motion';

import BtnIconText from '../components/buttons/BtnIconText';
import iconRight from '@/assets/icon/chevron_right.png';
import iconFoldRight from '@/assets/chevrons_right.png';
import iconFoldLeft from '@/assets/chevrons_left.png';
import iconLogout from '@/assets/icon/icon_logout.png';
import loginProfile from '@/assets/pilates_img.png';
import type { LayoutContextType } from '@/hooks/useLayoutContext';
import OverlayProvider from './OverlayProvider';
import useOverlay from '@/hooks/useOverlay';

// Framer Motion ClassName 타입에러 방지용 컴포넌트
export const MotionAside = motion('aside') as React.FC<HTMLMotionAsideProps>;
export const MotionDiv = motion('div') as React.FC<HTMLMotionDivProps>;

export default function Layout() {
  //Test용
  const overlay = useOverlay();

  const [menuFold, setMenuFold] = useState(false);
  const { pathname } = useLocation();
  const isSchedulePage = pathname.split('/')[1] === 'schedule';

  /**
   * 헤더 텍스트 및 아이콘 세팅
   * 각 화면에서 useEffect + OutletContext로 설정
   */
  const [headerTitle, setHeaderTitle] = useState('');
  const [headerIcon, setHeaderIcon] = useState('');

  const outletContext: LayoutContextType = {
    setHeaderTitle,
    setHeaderIcon,
  };

  return (
    <div className={`w-full h-screen grid grid-cols-1`}>
      {/* 메뉴바 */}
      <LayoutGroup>
        <MotionAside
          className={`fixed top-0 left-0 z-20 h-svh bg-ppm`}
          animate={{ width: menuFold ? 80 : 250 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ willChange: 'width' }}
        >
          {/* 내부 메뉴 */}
          <AnimatePresence mode="wait">
            {menuFold ? (
              <motion.div
                key="mini"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MiniBar path={pathname} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MenuBar path={pathname} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 토글 버튼 */}
          <div
            className="w-[30px] h-[30px] absolute top-[120px] right-[-15px] z-20 rounded-full bg-white/70 border border-ppp cursor-pointer flex items-center justify-center"
            onClick={() => setMenuFold((past) => !past)}
          >
            <img key={menuFold ? 'foldRight' : 'foldLeft'} src={menuFold ? iconFoldRight : iconFoldLeft} />
          </div>
        </MotionAside>
      </LayoutGroup>

      <MotionDiv
        className={`h-full grid grid-rows-[auto_1fr] min-w-[1280px] px-30px pb-20px ${
          isSchedulePage ? 'bg-white' : 'bg-ppbg '
        }`}
        animate={{ marginLeft: menuFold ? 80 : 250 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* 헤더 */}
        <div
          className={`sticky top-0 z-10 w-full py-[10px] flex justify-between ${
            isSchedulePage ? 'bg-white' : 'bg-ppbg '
          }`}
        >
          {/* 화면명 */}
          <div className="flex items-center">
            <img src={headerIcon} className="w-[30px] h-[30px]" draggable="false" />
            <img src={iconRight} className="w-[30px] h-[30px]" />
            <span className="min-w-[250px] flex-1 text-2xl font-bold text-gray">{headerTitle}</span>
          </div>

          {/* 로그인데이터 */}
          <div className="grid grid-cols-[auto_auto_auto] gap-[10px] items-center">
            <div className="w-[40px] h-[40px] rounded-full bg-ppp grid place-items-center border-[1px] border-yellow">
              <img src={loginProfile} className="w-[25px] h-[25px]" draggable="false" />
            </div>

            <div className="w-[100px] flex flex-col">
              <p className="font-bold text-gray text-xl">원예진 강사님</p>
              <p className="text-base text-lightGray ">오늘도 화이팅!</p>
            </div>

            <BtnIconText
              type="C"
              icon={iconLogout}
              text="로그아웃"
              onClick={() => {
                overlay.showPopup(
                  <div className="bg-blue w-[200px] h-[200px]">
                    <div className="text-bold">팝업</div>
                    <button
                      onClick={() => overlay.showPopup(<div className="bg-yellow w-[400px] h-[400px]">추가 팝업</div>)}
                    >
                      추가
                    </button>
                  </div>
                );
              }}
            />
          </div>
        </div>

        <section className="h-full min-h-0 w-full m-auto overflow-x-auto overflow-y-auto">
          <Outlet context={outletContext} />
        </section>
      </MotionDiv>

      <OverlayProvider />
    </div>
  );
}
