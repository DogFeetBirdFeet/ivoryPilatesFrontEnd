import { useLayoutContext } from '@/hooks/useLayoutContext';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import { useEffect } from 'react';
import MemberDetailCos from '@/features/Member/sections/MemberDetailCos';
import type { IMember } from '@/features/Member/types';
import MemberDetailReg from '@/features/Member/sections/MemberDetailReg';
import MemberDetailRes from '@/features/Member/sections/MemberDetailRes';
import MemberDetailExp from '@/features/Member/sections/MemberDetailExp';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMemberDetail } from '@/services/member';

export default function MemberDetail() {
  const { memberId } = useParams() as { memberId: string };
  // TODO : MemberId로 Data 패칭
  const { data } = useQuery<IMember>({
    queryKey: ['member', memberId],
    queryFn: () => getMemberDetail(memberId),
    enabled: !!memberId,
  });

  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('회원 상세 조회');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  if (!data) return <div>회원 정보를 찾을 수 없습니다.</div>;

  data.memType = 'COS';

  const renderMemberDetail = () => {
    switch (data.memType) {
      case 'COS':
        return <MemberDetailCos memberData={data} />;
      case 'REG':
        return <MemberDetailReg memberData={data} />;
      case 'RES':
        return <MemberDetailRes memberData={data} />;
      case 'EXP':
        return <MemberDetailExp memberData={data} />;
      default:
        return null;
    }
  };

  return <div className="min-w-[1200px] flex justify-center">{renderMemberDetail()}</div>;
}
