import { useLayoutContext } from '@/hooks/useLayoutContext';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import iconIvo from '@/assets/icon/purple/icon_ivo.png';
import iconConvert from '@/assets/icon/purple/icon_convert.png';
import iconEdit from '@/assets/icon/purple/icon_save.png';
import { useEffect, useState } from 'react';
import BtnIconText from '@/common/components/buttons/BtnIconText';

type memType = 'C' | 'A' | 'R' | 'E';

export default function MemberDetail() {
  const [memType, setMemType] = useState<memType | null>(null);

  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('회원 상세 조회');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  return (
    <div className="min-w-[1200px] w-full flex justify-center">
      {/* 좌측 */}
      <div className="min-w-[1200px] flex flex-col">
        {/* 기본정보 */}
        <section>
          {/* 이름 & 버튼 */}
          <div className="flex items-center mb-20px">
            <img src={iconIvo} className="w-60px h-60px mr-20px" alt="User Icon" />
            <span className="flex-1 text-3xl text-ppt font-bold">원예진 회원님</span>
            <div className="w-280px flex gap-10px">
              <BtnIconText type="B" icon={iconConvert} text="등록회원으로 전환하기" onClick={() => {}} />
              <BtnIconText type="B" icon={iconEdit} text="회원정보 수정하기" onClick={() => {}} />
            </div>
          </div>

          {/* 연락처/생년월일/성별/타입 */}
          <div className="grid grid-cols-4 h-80px gap-50px">
            <div className="bg-white h-full flex flex-col px-20px py-10px rounded-default">
              <p className="text-ppt text-sm font-bold">연락처</p>
              <div className="flex-1 flex items-center text-black text-xl font-medium">010-0000-0000</div>
            </div>
            <div className="bg-white h-full flex flex-col px-20px py-10px rounded-default">
              <p className="text-ppt text-sm font-bold">생년월일</p>
              <div className="flex-1 flex items-center text-black text-xl font-medium">9999.99.99</div>
            </div>
            <div className="bg-white h-full flex flex-col px-20px py-10px rounded-default">
              <p className="text-ppt text-sm font-bold">성별</p>
              <div className="flex-1 flex items-center text-black text-xl font-medium">여자</div>
            </div>
            <div className="bg-white h-full flex flex-col px-20px py-10px rounded-default">
              <p className="text-ppt text-sm font-bold">회원구분</p>
              <div className="flex-1 flex items-center text-black text-xl font-medium">상담회원</div>
            </div>
          </div>
        </section>
      </div>

      {/* 우측 */}
      <div></div>
    </div>
  );
}
