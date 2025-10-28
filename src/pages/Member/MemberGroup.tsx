import { useLayoutContext } from '@/hooks/useLayoutContext';
import { useEffect, useState } from 'react';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import SearchCondition from '@/common/components/searchBar/SearchCondition';
import InputText from '@/common/components/inputArea/InputText';
import InputNumber from '@/common/components/inputArea/InputNumber';
import BtnSearch from '@/common/components/buttons/BtnSearch';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import iconPlus from '@/assets/icon/white/icon_plus.png';
import iconDel from '@/assets/icon/purple/icon_delete.png';
import GroupDetail from '@/features/Member/sections/GroupDetail';

interface ISearchForm {
  searchName: string;
  searchNumber: string;
}

interface IGrpData {
  grpId: string;
  grpType: string;
  grpMemsName: string;
  grpMemsCnt: string;
  remainingCnt: string;
  regDate: string;
  editDate: string;
}

const mockData: IGrpData[] = [
  {
    grpId: 'GRP_COS_1',
    grpType: '1:1',
    grpMemsName: '김민수, 이지은, 박서준',
    grpMemsCnt: '3',
    remainingCnt: '12',
    regDate: '2025.08.11',
    editDate: '2025.08.11',
  },
  {
    grpId: 'GRP_COS_2',
    grpType: '1:1',
    grpMemsName: '최유진, 나은솔',
    grpMemsCnt: '2',
    remainingCnt: '8',
    regDate: '2025.07.15',
    editDate: '2025.08.10',
  },
  {
    grpId: 'GRP_COS_3',
    grpType: '2:1',
    grpMemsName: '정현우, 강지우',
    grpMemsCnt: '2',
    remainingCnt: '15',
    regDate: '2025.06.22',
    editDate: '2025.08.09',
  },
  {
    grpId: 'GRP_COS_4',
    grpType: '1:1',
    grpMemsName: '윤서아, 한예림, 조민재, 송태양',
    grpMemsCnt: '4',
    remainingCnt: '5',
    regDate: '2025.05.30',
    editDate: '2025.08.08',
  },
  {
    grpId: 'GRP_COS_5',
    grpType: '1:1',
    grpMemsName: '배수지, 이수은',
    grpMemsCnt: '2',
    remainingCnt: '20',
    regDate: '2025.08.01',
    editDate: '2025.08.07',
  },
  {
    grpId: 'GRP_COS_6',
    grpType: '2:1',
    grpMemsName: '신동혁, 오하늘',
    grpMemsCnt: '2',
    remainingCnt: '3',
    regDate: '2025.04.18',
    editDate: '2025.08.06',
  },
  {
    grpId: 'GRP_COS_7',
    grpType: '1:1',
    grpMemsName: '임채원, 전소연, 권도윤',
    grpMemsCnt: '3',
    remainingCnt: '18',
    regDate: '2025.07.20',
    editDate: '2025.08.05',
  },
  {
    grpId: 'GRP_COS_8',
    grpType: '1:1',
    grpMemsName: '홍지민, 이안',
    grpMemsCnt: '2',
    remainingCnt: '10',
    regDate: '2025.06.05',
    editDate: '2025.08.04',
  },
  {
    grpId: 'GRP_COS_9',
    grpType: '2:1',
    grpMemsName: '서준호, 안유진',
    grpMemsCnt: '2',
    remainingCnt: '7',
    regDate: '2025.05.12',
    editDate: '2025.08.03',
  },
  {
    grpId: 'GRP_COS_10',
    grpType: '1:1',
    grpMemsName: '류시우, 나예원, 문재현, 황서진',
    grpMemsCnt: '4',
    remainingCnt: '25',
    regDate: '2025.08.08',
    editDate: '2025.08.11',
  },
];

export default function MemberGroup() {
  const [searchForm, setSearchForm] = useState<ISearchForm>({ searchName: '', searchNumber: '' });
  const [curRow, setCurRow] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('회원 등록');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  // 검색 실행
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO : 검색 처리로직
  };

  const handleSelectRow = (grpId: string, checked: boolean) => {
    if (checked) {
      // 체크된 경우 배열에 추가
      setSelectedIds((prev) => [...prev, grpId]);
    } else {
      // 체크 해제된 경우 배열에서 제거
      setSelectedIds((prev) => prev.filter((id) => id !== grpId));
    }
  };

  useEffect(() => {
    console.log(selectedIds);
  }, [selectedIds]);

  const columns: {
    key: keyof IGrpData | 'select';
    title: string;
    className?: string;
    render?: (value: any) => React.ReactNode;
  }[] = [
    {
      key: 'select',
      title: '선택',
      className: 'w-50px',
      render: (row) => <input type="checkbox" onChange={(e) => handleSelectRow(row.grpId, e.target.checked)} />,
    },
    { key: 'grpId', title: '그룹 ID', className: 'w-100px' },
    {
      key: 'grpType',
      title: '그룹 타입',
      className: 'w-100px',
      render: (row) => (row.grpType === '1:1' ? '수강권 공유' : row.grpType),
    },
    { key: 'grpMemsName', title: '회원명', className: 'w-[250px]' },
    { key: 'grpMemsCnt', title: '인원 수', className: 'w-60px' },
    { key: 'remainingCnt', title: '잔여 회차', className: 'w-60px' },
    { key: 'regDate', title: '등록일자', className: 'w-100px' },
    { key: 'editDate', title: '수정일자', className: 'w-100px' },
  ];

  return (
    <div className="min-w-[1310px] w-full pb-20px">
      {/* 서치바 */}
      <form onSubmit={handleSubmit} className="mb-30px" autoComplete="off">
        <section className="grid grid-cols-[auto_30px] p-20px font-medium text-xl text-black bg-ppLight rounded-default">
          <div className="grid grid-cols-[350px_350px] gap-50px">
            <SearchCondition id="searchName" labelText="이름">
              <InputText
                id="searchName"
                value={searchForm.searchName}
                onChange={(value) => setSearchForm((form) => ({ ...form, searchName: value }))}
              />
            </SearchCondition>

            <SearchCondition id="searchNumber" labelText="연락처">
              <InputNumber
                id="searchNumber"
                value={searchForm.searchNumber}
                onChange={(value) => setSearchForm((form) => ({ ...form, searchNumber: value }))}
              />
            </SearchCondition>
          </div>
          <BtnSearch />
        </section>
      </form>

      <div className="grid grid-cols-[minmax(770px,auto)_500px] gap-20px">
        {/* 그룹회원 리스트 */}
        <section>
          <div className="flex items-center justify-between mb-10px mr-15px">
            <h1 className="h-50px text-[25px] text-gray font-bold flex items-center">그룹회원 목록</h1>
            <div className="h-30px flex gap-10px ">
              <BtnIconText type="A" icon={iconPlus} text="추가하기" onClick={() => {}} />
              <BtnIconText type="B" icon={iconDel} text="삭제하기" onClick={() => {}} />
            </div>
          </div>

          {/* 그리드 */}
          <div className="h-[calc(100vh-290px)] flex flex-col overflow-hidden min-h-0">
            <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
              {/* 헤더 */}
              <div className="sticky top-0 z-10 h-40px flex justify-between bg-ppGridHeader text-white font-medium text-sm rounded-t-[5px] ">
                {columns.map((col) => (
                  <div key={col.key} className={`flex justify-center items-center ${col.className}`}>
                    {col.title}
                  </div>
                ))}
              </div>

              {/* 바디 */}
              <div className="min-h-0">
                {mockData.map((item) => (
                  <div
                    key={item.grpId}
                    className={`h-60px flex justify-between text-gray text-sm border-b-[1px] last:border-b-0 border-grayD9 ${
                      curRow === item.grpId ? 'bg-yellow' : 'bg-white hover:bg-grayWhite'
                    }`}
                    onClick={() => setCurRow(item.grpId)}
                  >
                    {columns.map((col) => (
                      <div key={col.key} className={`flex justify-center items-center ${col.className} cursor-pointer`}>
                        {col.render ? col.render(item) : item[col.key as keyof IGrpData]}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GroupDetail
          groupId={curRow}
          memberName={curRow && mockData.filter((data) => data.grpId === curRow)[0].grpMemsName}
        />
      </div>
    </div>
  );
}
