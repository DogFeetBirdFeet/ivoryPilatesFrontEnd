import { useLayoutContext } from '@/hooks/useLayoutContext';
import memIcon from '@/assets/icon/yellow/icon_mem.png';
import { useEffect } from 'react';

export default function Member() {
  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('회원 조회');
    setHeaderIcon(memIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  return (
    <div className="h-full">
      <h1 className="text-purplePoint text-xl">Member</h1>
    </div>
  );
}
