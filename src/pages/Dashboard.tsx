import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import dashboardIcon from '@/assets/icon/yellow/icon_dashboard.png';

type HeaderContext = {
  setHeaderTitle: (title: string) => void;
  setHeaderIcon: (icon: string | null) => void;
};

export default function Dashboard() {
  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useOutletContext<HeaderContext>();

  useEffect(() => {
    setHeaderTitle('홈 대시보드');
    setHeaderIcon(dashboardIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  return (
    <div className="h-[1800px]">
      <h1 className="text-purplePoint text-xl">dashboard</h1>
    </div>
  );
}
