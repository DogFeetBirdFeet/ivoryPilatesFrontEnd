import { useLayoutContext } from '@/hooks/useLayoutContext';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import { useEffect, useState } from 'react';
import InputText from '@/common/components/inputArea/InputText';
import BtnSearch from '@/common/components/buttons/BtnSearch';
import InputDate from '@/common/components/inputArea/InputDate';
import SearchCondition from '@/common/components/searchBar/SearchCondition';
import InputNumber from '@/common/components/inputArea/InputNumber';
import FilterSelectBox from '@/common/components/inputArea/FilterSelectBox';
import iconFilter from '@/assets/icon/white/icon_filter.png';
import MemberTable from '@/features/Member/sections/MemberTable';

interface ISearchForm {
  searchName: string;
  searchNumber: string;
  searchCnt: string;
  searchDateFrom: Date | null;
  searchDateTo: Date | null;
}

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

const MockDataIns = [
  { codeId: 1, dtlNm: '원예진' },
  { codeId: 2, dtlNm: '김용진' },
  { codeId: 3, dtlNm: '나큰솔' },
];

const mockDataYN = [
  { codeId: 12, dtlNm: 'Y' },
  { codeId: 13, dtlNm: 'N' },
];

// Mock 데이터 생성
const generateMockData = (count: number): IMemberData[] => {
  return Array.from({ length: count }, (_, i) => ({
    memberId: `COS_${i + 1}`,
    memberType: '등록',
    memberName: '원예진',
    contact: '010-0000-0000',
    gender: '여자',
    birthDate: '1999.99.99',
    remainingCnt: 99,
    instructor: '원예진', // 랜덤 강사
    lastClassDate: '2025.08.09',
    isGroup: Math.random() > 0.5, // 랜덤 그룹 여부
    isBlacklisted: Math.random() > 0.8, // 랜덤 블랙 여부
    registeredDate: '2025.08.09',
  }));
};

export default function Member() {
  const [curTab, setCurTab] = useState(1);
  const [searchForm, setSearchForm] = useState<ISearchForm>({
    searchName: '',
    searchNumber: '',
    searchCnt: '',
    searchDateFrom: null,
    searchDateTo: null,
  });
  const [selectedInstructor, setSelectedInstructor] = useState<number>(0);
  const [selectedBlacklist, setSelectedBlacklist] = useState<number>(0);
  const [memberData, setMemberData] = useState<IMemberData[]>(generateMockData(50));

  const tabList = [
    { text: '전체', type: 'all' },
    { text: '등록 회원', type: 'active' },
    { text: '상담 회원', type: 'cons' },
    { text: '휴면 회원', type: 'inactive' },
    { text: '탈퇴 회원', type: 'quit' },
  ];

  // 클라이언트 필터링 (강사, 블랙리스트)
  const filteredData = memberData.filter((item) => {
    // 강사 필터
    if (selectedInstructor !== 0) {
      const instructorName = MockDataIns.find((ins) => ins.codeId === selectedInstructor)?.dtlNm;
      if (item.instructor !== instructorName) return false;
    }

    // 블랙리스트 필터
    if (selectedBlacklist !== 0) {
      const isBlackYN = mockDataYN.find((yn) => yn.codeId === selectedBlacklist)?.dtlNm === 'Y';
      if (item.isBlacklisted !== isBlackYN) return false;
    }

    return true;
  });

  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('회원 조회');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  // 검색 실행
  const handleSubmit = () => {
    console.log('검색 데이터:', searchForm);
    // TODO: 실제로는 API 호출하여 데이터 받아오기
    // 퍼블리싱용 - 새로운 mock 데이터 생성
    setMemberData(generateMockData(50));
  };

  // 탭 변경 시
  const handleTabChange = (idx: number) => {
    setCurTab(idx);
    // TODO: 실제로는 API 호출
    // 퍼블리싱용 - 새로운 mock 데이터 생성
    setMemberData(generateMockData(50));
  };

  return (
    <div className="min-w-[1310px] flex flex-col pb-20px">
      <h1 className="h-50px text-[25px] text-gray font-bold mx-20px">
        {tabList[curTab].text} ({filteredData.length})
      </h1>

      {/* 탭 */}
      <div className="flex h-40px mx-20px">
        {tabList.map((item, idx) => (
          <div
            key={`tab_${idx}`}
            className={`w-120px text-xl font-bold flex justify-center items-center cursor-pointer border-b-2 transition-all duration-300 ${
              curTab === idx ? 'border-yellow text-gray' : 'border-lightGray text-lightGray'
            }`}
            onClick={() => handleTabChange(idx)}
          >
            {item.text}
          </div>
        ))}
        <div className="flex-1 border-b-2 border-lightGray" />
      </div>

      {/* 서치바 */}
      <form onSubmit={handleSubmit} className="flex-shrink-0 mx-20px" autoComplete="off">
        <section className="grid grid-cols-[auto_30px] p-20px gap-30px font-medium text-xl text-black bg-ppLight rounded-default mt-10px">
          <div className="grid grid-cols-[250px_250px_180px_400px] justify-between gap-30px">
            <SearchCondition id="searchName" labelText="이름">
              <InputText
                id="searchName"
                className="w-full"
                value={searchForm.searchName}
                onChange={(value) => setSearchForm((form) => ({ ...form, searchName: value }))}
              />
            </SearchCondition>

            <SearchCondition id="searchNumber" labelText="연락처">
              <InputNumber
                id="searchNumber"
                className="w-full"
                value={searchForm.searchNumber}
                onChange={(value) => setSearchForm((form) => ({ ...form, searchNumber: value }))}
              />
            </SearchCondition>

            <SearchCondition id="searchCnt" labelText="잔여회차">
              <InputNumber
                id="searchCnt"
                className="w-full text-right"
                value={searchForm.searchCnt}
                onChange={(value) => setSearchForm((form) => ({ ...form, searchCnt: value }))}
              />
              <span className="flex-shrink-0 ml-5px">회 미만</span>
            </SearchCondition>

            <SearchCondition id="searchDateFrom" labelText="최근 수강일자">
              <InputDate
                id="searchDateFrom"
                className="w-full"
                value={searchForm.searchDateFrom}
                onChange={(value) => setSearchForm((form) => ({ ...form, searchDateFrom: value }))}
              />
              <span className="mx-5px">~</span>
              <InputDate
                id="searchDateTo"
                className="w-full"
                sortRight={true}
                value={searchForm.searchDateTo}
                onChange={(value) => setSearchForm((form) => ({ ...form, searchDateTo: value }))}
              />
            </SearchCondition>
          </div>
          <BtnSearch />
        </section>
      </form>

      {/* 조회 데이터 */}
      <section className="flex-1 flex flex-col mt-10px overflow-hidden min-h-0">
        {/* 필터리스트 */}
        <div className="flex justify-end py-10px gap-10px mx-20px">
          <FilterSelectBox
            id="ins_list"
            label="담당 강사"
            options={MockDataIns}
            icon={iconFilter}
            className="w-180px"
            value={selectedInstructor}
            onChange={(value) => setSelectedInstructor(value)}
          />
          <FilterSelectBox
            id="black-yn"
            label="블랙리스트 여부"
            options={mockDataYN}
            className="w-180px"
            value={selectedBlacklist}
            onChange={(value) => setSelectedBlacklist(value)}
          />
        </div>

        {/* 조회 테이블 */}
        <MemberTable data={filteredData} isLoading={false} />
      </section>
    </div>
  );
}
