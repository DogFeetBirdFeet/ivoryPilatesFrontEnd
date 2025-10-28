import { useLayoutContext } from '@/hooks/useLayoutContext';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberDetailCos from '@/features/Member/sections/MemberDetailCos';
import type { IMember } from '@/features/Member/types';
import MemberDetailReg from '@/features/Member/sections/MemberDetailReg';
import MemberDetailRes from '@/features/Member/sections/MemberDetailRes';
import MemberDetailExp from '@/features/Member/sections/MemberDetailExp';

export default function MemberDetail() {
  const { memberId } = useParams();
  // TODO : MemberId로 Data 패칭
  // const { data: memberData, isLoading } = useMemberDetail(memberId!);

  const memberData: IMember = {
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

  const [memType, setMemType] = useState<'COS' | 'REG' | 'RES' | 'EXP' | null>('COS');

  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('회원 상세 조회');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  if (!memberData) return <div>회원 정보를 찾을 수 없습니다.</div>;

  const renderMemberDetail = () => {
    switch (memberData.memType) {
      case 'COS':
        return <MemberDetailCos memberData={memberData} />;
      case 'REG':
        return <MemberDetailReg memberData={memberData} />;
      case 'RES':
        return <MemberDetailRes memberData={memberData} />;
      case 'EXP':
        return <MemberDetailExp memberData={memberData} />;
      default:
        return null;
    }
  };

  return <div className="min-w-[1200px] flex justify-center">{renderMemberDetail()}</div>;
}
