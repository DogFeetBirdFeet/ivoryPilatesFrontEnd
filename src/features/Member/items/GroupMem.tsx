import { formatBirth } from '@/utils/date';
import { formatPhone } from '@/utils/number';
import iconExit from '@/assets/icon/icon_exit.png';

interface IGrpDetail {
  name: string;
  number: string;
  birth: string;
}

export default function GroupMem({ member, isView = true }: { member: IGrpDetail | undefined; isView?: boolean }) {
  return (
    <div className="h-120px bg-white border border-grayD9 rounded-default flex items-center justify-center">
      {member ? (
        <div className="relative w-full grid grid-cols-[120px_auto] gap-y-5px text-xl px-20px">
          {!isView && <img src={iconExit} className="absolute right-[20px] cursor-pointer" />}
          {/* 이름 */}
          <span className="text-lightGray font-bold">이름</span>
          <span className="text-black font-medium">{member.name}</span>

          {/* 연락처 */}
          <span className="text-lightGray font-bold">연락처</span>
          <span className="text-black font-medium">{formatPhone(member.number)}</span>

          {/* 생년월일 */}
          <span className="text-lightGray font-bold">생년월일</span>
          <span className="text-black font-medium">{formatBirth(member.birth)}</span>
        </div>
      ) : (
        <p className="text-lightGray text-sm">그룹회원 정보가 없습니다</p>
      )}
    </div>
  );
}
