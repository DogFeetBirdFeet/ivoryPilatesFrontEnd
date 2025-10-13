import { useState } from 'react';

interface IMemberData {
  memberId: string;
  memberType: string;
  memberName: string;
  contact: string;
  gender: string;
  birthDate: string;
  remainingCnt: number;
  instructor: string;
  lastClassDate: string;
  isGroup: boolean;
  isBlacklisted: boolean;
  registeredDate: string;
}

interface MemberTableProps {
  data: IMemberData[];
  isLoading: boolean;
}

const columns: {
  key: keyof IMemberData;
  title: string;
  className?: string;
  render?: (value: any) => React.ReactNode;
}[] = [
  { key: 'memberId', title: '회원 마스터ID', className: 'w-120px' },
  { key: 'memberType', title: '회원 분류', className: 'w-90px' },
  { key: 'memberName', title: '회원명', className: 'w-130px' },
  { key: 'contact', title: '연락처', className: 'w-180px' },
  { key: 'gender', title: '성별', className: 'w-70px' },
  { key: 'birthDate', title: '생년월일', className: 'w-150px' },
  {
    key: 'remainingCnt',
    title: '잔여회차',
    className: 'w-100px',
    render: (value) => `${value}회`,
  },
  { key: 'instructor', title: '담당 강사', className: 'w-130px' },
  { key: 'lastClassDate', title: '최근 수강일자', className: 'w-150px' },
  {
    key: 'isGroup',
    title: '그룹 여부',
    className: 'w-90px',
    render: (value) => <input type="checkbox" checked={value} disabled className="w-16px h-16px" />,
  },
  {
    key: 'isBlacklisted',
    title: '블랙 여부',
    className: 'w-100px',
    render: (value) => <input type="checkbox" checked={value} disabled className="w-16px h-16px" />,
  },
  { key: 'registeredDate', title: '등록일자', className: 'w-150px' },
];

const commonStyle = 'flex justify-center items-center';

export default function MemberTable({ data, isLoading }: MemberTableProps) {
  const [curRow, setCurRow] = useState<string | null>(null);

  //   TODO
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (data.length === 0) {
    return (
      <div className="h-[350px] flex justify-center items-center font-medium text-gray">조회된 데이터가 없습니다</div>
    );
  }

  return (
    <div className="h-full max-h-[calc(100vh-340px)] flex flex-col overflow-hidden min-h-0">
      {/* 헤더 */}
      <div className="flex-shrink-0 h-40px flex justify-between bg-ppGridHeader text-white font-medium text-sm rounded-t-[5px] mx-20px">
        {columns.map((col) => (
          <div key={col.key} className={`flex justify-center items-center ${col.className}`}>
            {col.title}
          </div>
        ))}
      </div>

      {/* 바디 */}

      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar ml-20px">
        {data.map((item) => (
          <div
            key={item.memberId}
            className={`h-40px flex justify-between text-gray text-base border-b-[1px] border-grayD9 ${
              curRow === item.memberId ? 'bg-yellow' : 'bg-white'
            }`}
            onDoubleClick={() => setCurRow(item.memberId)}
          >
            {columns.map((col) => (
              <div key={col.key} className={`${commonStyle} ${col.className} cursor-pointer`}>
                {col.render ? col.render(item[col.key]) : item[col.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
