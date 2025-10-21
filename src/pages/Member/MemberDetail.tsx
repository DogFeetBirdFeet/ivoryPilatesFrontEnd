import { useLayoutContext } from '@/hooks/useLayoutContext';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import { useEffect, useState } from 'react';
import MemberDetailInfo from '@/features/Member/items/MemberDetailInfo';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import iconIvo from '@/assets/icon/purple/icon_ivo.png';
import iconConvert from '@/assets/icon/purple/icon_convert.png';
import iconEdit from '@/assets/icon/purple/icon_save.png';
import type { IMember } from '@/features/Member/types';

export default function MemberDetail() {
  const [memType, setMemType] = useState<'COS' | 'REG' | 'RES' | 'EXP' | null>('COS');
  const [editMode, setEditMode] = useState(false); //수정모드
  const [activeMode, setActiveMode] = useState(false); // 등록전환모드

  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('회원 상세 조회');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  const mockData: IMember = {
    id: 'cos_1',
    name: '원예진',
    number: '01000000000',
    birth: '19980228',
    gender: 'W',
    memType: 'COS',
    height: 0,
    weight: 0,
    surHist:
      '메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모',
    disease:
      '메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모',
    memo: '',
    bodyImg: '',
    lastClsDate: '20251021',
  };

  return (
    <div className="min-w-[1200px] flex justify-center">
      <div className="flex flex-col">
        {/* 이름 & 버튼 - 상단 영역 */}
        <div className="flex items-center mb-20px">
          <img src={iconIvo} className="w-60px h-60px mr-20px" alt="User Icon" />
          <span className="text-3xl text-ppt font-bold whitespace-nowrap">원예진 회원님</span>
          <div className="ml-auto flex gap-10px">
            <BtnIconText type="B" icon={iconConvert} text="등록회원으로 전환하기" onClick={() => {}} />
            <BtnIconText type="B" icon={iconEdit} text="회원정보 수정하기" onClick={() => {}} />
          </div>
        </div>

        {/* 좌우 분리 영역 */}
        <div className="flex">
          {/* 좌측 */}
          <div className="flex flex-col">
            <MemberDetailInfo editMode={editMode} data={mockData} />
          </div>

          {/* 우측 */}
          <div className="">{/* 우측 콘텐츠 */}</div>
        </div>
      </div>
    </div>
  );
}
