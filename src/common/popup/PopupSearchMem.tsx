import imgSrc from '@/assets/icon/yellow/icon_mem.png';
import SearchCondition from '../components/searchBar/SearchCondition';
import InputText from '../components/inputArea/InputText';
import InputNumber from '../components/inputArea/InputNumber';
import BtnSearch from '../components/buttons/BtnSearch';
import { useState } from 'react';
import type { SCHEDULE_TYPE } from '@/constants/schedule';

interface IMemberData {
  memberId: string;
  memberName: string;
  contact: string;
  gender: string;
  isGroup: boolean;
  grpType: keyof typeof SCHEDULE_TYPE | null;
  groupMem: string;
}

const mockMemberData: IMemberData[] = [
  {
    memberId: '1',
    memberName: '김민수',
    contact: '010-1234-5678',
    gender: '남자',
    isGroup: false,
    grpType: null,
    groupMem: '',
  },
  {
    memberId: '2',
    memberName: '이영희',
    contact: '010-2345-6789',
    gender: '여자',
    isGroup: true,
    grpType: 'S',
    groupMem: '나은솔, 신민철, 김재우',
  },
  {
    memberId: '3',
    memberName: '박철수',
    contact: '010-3456-7890',
    gender: '남자',
    isGroup: false,
    grpType: null,
    groupMem: '',
  },
  {
    memberId: '4',
    memberName: '정수진',
    contact: '010-4567-8901',
    gender: '여자',
    isGroup: true,
    grpType: 'D',
    groupMem: '나은솔, 신민철',
  },
  {
    memberId: '5',
    memberName: '최동욱',
    contact: '010-5678-9012',
    gender: '남자',
    isGroup: false,
    grpType: null,
    groupMem: '',
  },
  {
    memberId: '6',
    memberName: '강미라',
    contact: '010-6789-0123',
    gender: '여자',
    isGroup: true,
    grpType: 'S',
    groupMem: '나은솔, 신민철, 김재우',
  },
  {
    memberId: '7',
    memberName: '윤서준',
    contact: '010-7890-1234',
    gender: '남자',
    isGroup: false,
    grpType: null,
    groupMem: '',
  },
  {
    memberId: '8',
    memberName: '한지영',
    contact: '010-8901-2345',
    gender: '여자',
    isGroup: false,
    grpType: null,
    groupMem: '',
  },
  {
    memberId: '9',
    memberName: '임태양',
    contact: '010-9012-3456',
    gender: '남자',
    isGroup: true,
    grpType: 'S',
    groupMem: '나은솔, 신민철, 김재우',
  },
  {
    memberId: '10',
    memberName: '송하늘',
    contact: '010-0123-4567',
    gender: '여자',
    isGroup: false,
    grpType: null,
    groupMem: '',
  },
  {
    memberId: '11',
    memberName: '오건우',
    contact: '010-1111-2222',
    gender: '남자',
    isGroup: true,
    grpType: 'D',
    groupMem: '나은솔, 신민철',
  },
  {
    memberId: '12',
    memberName: '장민지',
    contact: '010-2222-3333',
    gender: '여자',
    isGroup: false,
    grpType: null,
    groupMem: '',
  },
  {
    memberId: '13',
    memberName: '서준호',
    contact: '010-3333-4444',
    gender: '남자',
    isGroup: false,
    grpType: null,
    groupMem: '',
  },
  {
    memberId: '14',
    memberName: '배수정',
    contact: '010-4444-5555',
    gender: '여자',
    isGroup: true,
    grpType: 'S',
    groupMem: '나은솔, 신민철, 김재우',
  },
  {
    memberId: '15',
    memberName: '홍길동',
    contact: '010-5555-6666',
    gender: '남자',
    isGroup: false,
    grpType: null,
    groupMem: '',
  },
];

const columns: {
  key: keyof IMemberData;
  title: string;
  className?: string;
  render?: (value: any) => React.ReactNode;
}[] = [
  { key: 'memberName', title: '이름', className: 'w-120px' },
  { key: 'gender', title: '성별', className: 'w-90px' },
  { key: 'contact', title: '연락처', className: 'w-150px' },
  {
    key: 'isGroup',
    title: '그룹 여부',
    className: 'w-90px',
    render: (value) => <input type="checkbox" checked={value} disabled className="w-16px h-16px" />,
  },
  { key: 'groupMem', title: '그룹회원 구성원', className: 'w-200px' },
];

/**
 * 회원검색 팝업
 *
 * @onDoubleClick 더블클릭 이벤트. 유저정보를 받을 수 있는 함수
 */

export default function PopupSearchMem({
  onDoubleClick,
  initNameValue,
}: {
  onDoubleClick: (data: IMemberData) => void;
  initNameValue?: string;
}) {
  const [searchName, setSearchName] = useState(initNameValue || '');
  const [searchNumber, setSearchNumber] = useState('');
  const [curRow, setCurRow] = useState<string | null>(null);

  return (
    <div className="w-[1000px] bg-white px-10px py-30px flex flex-col gap-15px rounded-default drop-shadow-2xl">
      {/* 타이틀 영역 */}
      <div className="flex gap-10px items-center mx-20px">
        <img src={imgSrc} className="h-30px w-30px" />
        <p className="text-2xl font-bold leading-[35px] text-center">회원 검색</p>
      </div>

      {/* 검색바 */}
      <section className="grid grid-cols-[auto_30px] p-20px gap-30px font-medium text-xl text-black bg-ppLight rounded-default mt-10px mx-20px">
        <div className="flex gap-30px">
          <SearchCondition id="searchName" labelText="이름">
            <InputText
              id="searchName"
              className="w-[250px]"
              value={searchName}
              onChange={(value) => setSearchName(value)}
            />
          </SearchCondition>

          <SearchCondition id="searchNumber" labelText="연락처">
            <InputNumber
              id="searchNumber"
              className="w-[250px]"
              value={searchNumber}
              onChange={(value) => setSearchNumber(value)}
            />
          </SearchCondition>
        </div>
        <BtnSearch />
      </section>

      {/* 테이블 */}
      <div className="h-[400px] drop-shadow-sm flex flex-col">
        {/* 헤더 */}
        <div className="flex-shrink-0 h-30px px-10px mx-20px flex justify-between bg-ppGridHeader text-white font-medium text-base rounded-t-[5px]">
          {columns.map((col) => (
            <div key={col.key} className={`flex justify-center items-center ${col.className}`}>
              {col.title}
            </div>
          ))}
        </div>

        {/* 바디 */}
        <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar ml-20px">
          {mockMemberData.map((item) => (
            <div
              key={item.memberId}
              className={`h-40px flex justify-between text-gray text-base border-b-[1px] border-whiteGray last:border-b-0 cursor-pointer ${
                curRow === item.memberId ? 'bg-yellow' : 'bg-white hover:bg-grayWhite'
              } transition-colors`}
              onDoubleClick={() => onDoubleClick(item)}
              onClick={() => setCurRow(item.memberId)}
            >
              {columns.map((col) => (
                <div key={col.key} className={`flex justify-center items-center ${col.className}`}>
                  {col.render ? col.render(item[col.key]) : item[col.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
