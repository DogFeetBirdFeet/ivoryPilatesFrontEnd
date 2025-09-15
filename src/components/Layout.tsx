import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      {/* 메뉴바 */}
      <div></div>

      <div>
        <header>헤더</header>
        <Outlet />
      </div>
    </>
  );
}
