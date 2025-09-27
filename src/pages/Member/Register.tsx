import { useLayoutContext } from '@/hooks/useLayoutContext';
import { useEffect } from 'react';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';

export default function Register() {
  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('회원 등록');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  return (
    <div className="m-auto">
      <section>
        <h2>기본정보</h2>
        <hr />
      </section>

      <section>
        <h2>상세정보</h2>
        <hr />
      </section>
    </div>
  );
}
