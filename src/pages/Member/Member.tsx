import { useLayoutContext } from '@/hooks/useLayoutContext';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import InputText from '@/common/components/inputArea/InputText';
import BtnSearch from '@/common/components/buttons/BtnSearch';
import InputDate from '@/common/components/inputArea/InputDate';
import SearchCondition from '@/common/components/searchBar/searchCondition';
import InputNumber from '@/common/components/inputArea/InputNumber';
import { useForm } from 'react-hook-form';
import { dateFormatToString } from '@/utils/date';

interface ISearchForm {
  searchName: string;
  searchNumber: string;
  searchCnt: string;
  searchDateFrom: string;
  searchDateTo: string;
}

export default function Member() {
  const [curTab, setCurTab] = useState(1);

  // react-hook-form 검색조건
  const { register, watch, setValue, handleSubmit } = useForm<ISearchForm>({
    defaultValues: {
      searchName: '',
      searchNumber: '',
      searchCnt: '',
      searchDateFrom: dateFormatToString(new Date()),
      searchDateTo: dateFormatToString(new Date()),
    },
  });

  const formValues = watch();

  useEffect(() => {
    console.log('📝 Form State:', {
      searchName: formValues.searchName,
      searchNumber: formValues.searchNumber,
      searchCnt: formValues.searchCnt,
      searchDateFrom: formValues.searchDateFrom,
      searchDateTo: formValues.searchDateTo,
    });
  }, [formValues]);

  // 헤더정보 세팅
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();

  useEffect(() => {
    setHeaderTitle('회원 조회');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  const tabList = [
    { text: '전체', route: '/all' },
    { text: '등록 회원', route: '/active' },
    { text: '상담 회원', route: '/cons' },
    { text: '휴면 회원', route: '/inactive' },
    { text: '탈퇴 회원', route: '/quit' },
  ];

  // 검색 실행
  const onSubmit = (data: ISearchForm) => {
    console.log('검색 데이터:', data);
    // TODO: 실제 검색 API 호출
  };

  return (
    <div className="h-full">
      <h1 className="h-50px text-[25px] text-gray font-bold">등록회원 (50)</h1>
      <div className="flex h-40px">
        {tabList.map((item, idx) => (
          <div
            key={`tab_${idx}`}
            className={`w-120px text-xl text-lightGray font-bold flex justify-center items-center cursor-pointer border-b-2 ${
              curTab === idx ? 'border-yellow' : 'border-lightGray'
            }`}
            onClick={() => setCurTab(idx)}
          >
            {item.text}
          </div>
        ))}
        <div className="flex-1 border-b-2 border-lightGray" />
        <div>
          <Outlet />
        </div>
      </div>

      {/* 서치바 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="grid grid-cols-[auto_30px] p-20px gap-30px font-medium text-xl text-black bg-ppLight rounded-default mt-10px">
          <div className="grid grid-cols-[250px_250px_180px_400px] justify-between gap-30px">
            <SearchCondition id="searchName" labelText="이름">
              <InputText
                id="searchName"
                className="w-full"
                value={watch('searchName')}
                onChange={(value) => setValue('searchName', value)}
              />
            </SearchCondition>

            <SearchCondition id="searchNumber" labelText="연락처">
              <InputNumber
                id="searchNumber"
                className="w-full"
                value={watch('searchNumber')}
                onChange={(value) => setValue('searchNumber', value)}
              />
            </SearchCondition>

            <SearchCondition id="searchCnt" labelText="잔여회차">
              <InputNumber
                id="searchCnt"
                className="w-full text-right"
                value={watch('searchCnt')}
                onChange={(value) => setValue('searchCnt', value)}
              />
              <span className="flex-shrink-0 ml-5px">회 미만</span>
            </SearchCondition>

            <SearchCondition id="searchDateFrom" labelText="최근 수강일자">
              <InputDate
                id="searchDateFrom"
                className="w-full"
                value={watch('searchDateFrom')}
                onChange={(value) => setValue('searchDateFrom', value)}
              />
              <span className="mx-5px">~</span>
              <InputDate
                id="searchDateTo"
                className="w-full"
                sortRight={true}
                value={watch('searchDateTo')}
                onChange={(value) => setValue('searchDateTo', value)}
              />
            </SearchCondition>
          </div>

          <BtnSearch />
        </section>
      </form>
    </div>
  );
}
