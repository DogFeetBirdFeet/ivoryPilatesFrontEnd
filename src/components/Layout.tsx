import { Outlet, useLocation } from 'react-router-dom';
import MenuBar from './common/MenuBar';
import { useState } from 'react';

import BtnIconText from './common/buttons/BtnIconText';
import iconRight from '@/assets/icon/chevron_right.png';
import iconLogout from '@/assets/icon/icon_logout.png';
import loginProfile from '@/assets/pilates_img.png';

import iconDashboard from '@/assets/icon/icon_dashboard.png';

const iconMap: Record<string, string> = {
  '/dashboard': iconDashboard,
};

export default function Layout() {
  const [menuFold, setMenuFold] = useState(false);
  const { pathname } = useLocation();

  const getHeaderTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return '홈 대시보드';
      default:
        return '';
    }
  };

  return (
    <div className="flex min-h-svh">
      {/* 메뉴바 */}
      {menuFold ? <></> : <MenuBar />}

      <div
        className={`w-svw px-[30px] ${
          pathname === '/schedule' ? 'bg-white' : 'bg-ppbg '
        }`}
      >
        {/* 헤더 */}
        <div
          className={`sticky top-0 w-full py-[10px] flex justify-between ${
            pathname === '/schedule' ? 'bg-white' : 'bg-ppbg '
          }`}
        >
          {/* 화면명 */}
          <div className="flex items-center">
            <img
              src={iconMap[pathname]}
              className="w-[30px] h-[30px]"
              draggable="false"
            />
            <img src={iconRight} className="w-[30px] h-[30px]" />
            <span className="flex-1 text-2xl font-bold text-gray">
              {getHeaderTitle()}
            </span>
          </div>

          {/* 로그인데이터 */}
          <div className="flex gap-[10px] items-center">
            <div className="w-[40px] h-[40px] rounded-full bg-ppp grid place-items-center border-[1px] border-yellow">
              <img
                src={loginProfile}
                className="w-[25px] h-[25px]"
                draggable="false"
              />
            </div>

            <div className="w-[100px] flex flex-col">
              <p className="font-bold text-gray text-xl">원예진 강사님</p>
              <p className="text-base text-lightGray ">오늘도 화이팅!</p>
            </div>

            <BtnIconText
              type="C"
              icon={iconLogout}
              text="로그아웃"
              onClick={() => {}}
            />
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
