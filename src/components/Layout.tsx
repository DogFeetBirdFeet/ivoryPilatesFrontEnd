import { Outlet, useLocation } from 'react-router-dom';
import MenuBar from './MenuBar';
import MiniBar from './MiniBar';
import { useState } from 'react';

import BtnIconText from './common/buttons/BtnIconText';
import iconRight from '@/assets/icon/chevron_right.png';
import iconLogout from '@/assets/icon/icon_logout.png';
import loginProfile from '@/assets/pilates_img.png';

export default function Layout() {
  const [menuFold, setMenuFold] = useState(false);
  const { pathname } = useLocation();
  const isSchedulePage = pathname.split('/')[1] === 'schedule';

  /**
   * 헤더 텍스트 및 아이콘 세팅
   * 각 화면에서 useEffect + OutletContext로 설정
   */
  const [headerTitle, setHeaderTitle] = useState('');
  const [headerIcon, setHeaderIcon] = useState('');

  return (
    <div className={`w-full grid grid-cols-1`}>
      {/* 메뉴바 */}
      <aside className={`fixed top-0 left-0 z-20 h-svh ${menuFold ? 'w-[80px]' : 'w-[250px]'}`}>
        {menuFold ? <MiniBar /> : <MenuBar path={pathname} />}
      </aside>

      <div
        className={`grid grid-rows-[auto_1fr] min-w-[1020px] px-[30px] 
          ${menuFold ? 'ml-[80px]' : 'ml-[250px]'} 
          ${isSchedulePage ? 'bg-white' : 'bg-ppbg '}`}
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
                setMenuFold((past) => !past);
              }}
            />
          </div>
        </div>

        <section className="overflow-x-auto overflow-y-auto">
          <Outlet context={{ setHeaderTitle, setHeaderIcon }} />
        </section>
      </div>
    </div>
  );
}
