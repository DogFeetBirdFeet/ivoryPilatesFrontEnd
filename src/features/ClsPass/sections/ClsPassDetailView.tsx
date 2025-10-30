import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useLayoutContext } from '@/hooks/useLayoutContext.ts';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import BtnIconText from '@/common/components/buttons/BtnIconText.tsx';
import iconRefund from '@/assets/icon/white/icon_cls_refurn.png';
import iconSavePurple from '@/assets/icon/purple/icon_save.png';
import iconCancel from '@/assets/icon/purple/icon_cancel.png';
import iconSaveWhite from '@/assets/icon/white/icon_save.png';
import iconIvo from '@/assets/icon/purple/icon_ivo.png';
import ClsPassInfoItem from '@/features/ClsPass/items/ClsPassInfo';
import ClsPkgInfo from '@/features/ClsPass/items/ClsPkgInfo';
import ClsPayInfo from '@/features/ClsPass/items/ClsPayInfo';
import useOverlay from '@/hooks/useOverlay';
import PopupRefundCls from '@/common/popup/PopupRefundCls';
import SearchInputCus from '@/common/components/inputArea/SearchInputCus.tsx';
import type { IPropsAuthority } from '@/features/ClsPass/clsPassType';
import type { IClsAndUserData } from '@/features/ClsPass/clsPassType';
import { clsPassApi } from '@/services/Class/api';

interface ISearchForm {
  cusId: number;
  cusName: string;
}

export default function ClsPassDetailView(props: IPropsAuthority) {
  const [data, setData] = useState<Partial<IClsAndUserData> | null>(null);
  // react-hook-form 검색조건
  const { watch, setValue } = useForm<ISearchForm>({
    defaultValues: {
      cusId: 0,
      cusName: '',
    },
  });

  const formValues = watch();
  const overlay = useOverlay();

  useEffect(() => {
    console.log('📝 Form State:', {
      cusId: formValues.cusId,
      cusName: formValues.cusName,
    });
  }, [formValues]);

  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();
  const [editable, setEditable] = useState(false);
  const [currentUseAge, setCurrentUseAge] = useState(props.useAge);

  const loadClsPassData = async (clsPassId: number) => {
    try {
      const response = await clsPassApi.getClsPassData(clsPassId);
      setData(response.data[0]);
      console.log(response);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  };
  useEffect(() => {
    setHeaderTitle(props.title);
    setHeaderIcon(headerIcon);

    const initializeData = async () => {
      await loadClsPassData(props.clsPassId);
    };
    initializeData().then((r) => r);
  }, [setHeaderTitle, setHeaderIcon, props.title, editable, props.clsPassId]);

  // Mock 데이터 (실제로는 props에서 받아와야 함)
  const handleEdit = () => {
    console.log('🔍 currentUseAge:', currentUseAge);
    setCurrentUseAge(currentUseAge === 1 ? 3 : 4);
    setEditable(true);
  };

  return (
    <div className="min-w-[1200px] flex justify-center">
      <div className="w-[1500px] h-full flex flex-col">
        {/* 헤더 섹션 - 유저 정보와 버튼 */}
        <section className="flex justify-between items-center py-15px border-grayD9 border-b-[1.5px] mb-15px">
          <div className="flex items-center">
            <img src={iconIvo} className="w-[60px] h-[60px] mr-20px" alt="User Icon" />
            {props.userNm === '' ? (
              <SearchInputCus
                id="searchName"
                value={watch('cusName')}
                className="w-[400px]"
                onChange={(value) => setValue('cusName', value)}
                onSearch={(data) => {
                  const cusNm = `${data.memberName} 회원님 ${data.grpType === 'D' ? '(2:1 그룹회원)' : ''}`;
                  setValue('cusName', cusNm);
                }}
              />
            ) : (
              <label className="text-3xl font-bold text-ppm">{props.userNm} 회원님</label>
            )}
          </div>

          {/* 오른쪽: 버튼들 */}
          <div className="flex gap-10px">
            {/* 조회 - 사용중 */}
            {currentUseAge === 1 && (
              <>
                <BtnIconText
                  type="A"
                  icon={iconRefund}
                  text="환불하기"
                  onClick={() => {
                    overlay.showPopup(<PopupRefundCls />);
                  }}
                />
                <BtnIconText type="B" icon={iconSavePurple} text="결제정보 수정하기" onClick={handleEdit} />
              </>
            )}
            {/* 조회 - 만료/환불 */}
            {currentUseAge === 2 && (
              <BtnIconText type="B" icon={iconSavePurple} text="결제정보 수정하기" onClick={handleEdit} />
            )}
            {/* 수정 - 사용중 */}
            {currentUseAge === 3 && (
              <>
                <BtnIconText type="B" icon={iconCancel} text="취소하기" onClick={props.onCancel || (() => {})} />
                <BtnIconText type="A" icon={iconSaveWhite} text="저장하기" onClick={() => {}} />
              </>
            )}
            {/* 수정 - 만료/환불 */}
            {currentUseAge === 4 && (
              <>
                <BtnIconText type="B" icon={iconCancel} text="취소하기" onClick={props.onCancel || (() => {})} />
                <BtnIconText type="A" icon={iconSaveWhite} text="저장하기" onClick={() => {}} />
              </>
            )}
            {/* 등록 */}
            {currentUseAge === 5 && (
              <>
                <BtnIconText type="B" icon={iconCancel} text="취소하기" onClick={props.onCancel || (() => {})} />
                <BtnIconText type="A" icon={iconSaveWhite} text="저장하기" onClick={() => {}} />
              </>
            )}
          </div>
        </section>

        {/* 사용자 데이터 필드들 */}
        <section className="grid grid-cols-4 gap-50px h-[80px]">
          <div className="flex flex-col justify-between bg-purpleLight2 px-20px py-10px rounded-default">
            <label className="text-sm font-bold text-ppt">연락처</label>
            <p className="text-[18px] font-bold text-black">{data?.contact}</p>
          </div>
          <div className="flex flex-col justify-between bg-purpleLight2 px-20px py-10px rounded-default">
            <label className="text-sm font-bold text-ppt">생년월일</label>
            <p className="text-[18px]  font-bold text-black">{data?.birthDate}</p>
          </div>
          <div className="flex flex-col justify-between bg-purpleLight2 px-20px py-10px rounded-default">
            <label className="text-sm font-bold text-ppt">성별</label>
            <p className="text-[18px]  font-bold text-black">{data?.gender}</p>
          </div>
          <div className="flex flex-col justify-between bg-purpleLight2 px-20px py-10px rounded-default">
            <label className="text-sm font-bold text-ppt">회원구분</label>
            <p className="text-[18px]  font-bold text-black">{data?.cusType}</p>
          </div>
        </section>

        {/* 메인 콘텐츠 영역 - 2컬럼 레이아웃 */}
        <div className="flex flex-wrap gap-[90px] mb-[20px]">
          {/* 왼쪽 컬럼 - 수강권 정보 & 상품정보 */}
          <div className="flex-1">
            {currentUseAge === 5 && (
              <>
                {/* 상품정보 섹션 */}
                <ClsPkgInfo data={data as IClsAndUserData} currentUseAge={currentUseAge} />
                {/* 수강권 정보 섹션 */}
                <ClsPassInfoItem
                  data={data as IClsAndUserData}
                  editable={editable}
                  authority={props.authority}
                  currentUseAge={currentUseAge}
                  onDataChange={(newData) => {
                    setData({
                      ...(data || null),
                      ...(newData || null),
                    });
                  }}
                />
              </>
            )}
            {currentUseAge !== 5 && (
              <>
                {/* 수강권 정보 섹션 */}
                <ClsPassInfoItem
                  data={data as IClsAndUserData}
                  editable={editable}
                  authority={props.authority}
                  currentUseAge={currentUseAge}
                  onDataChange={(newData) => {
                    setData({
                      ...(data || null),
                      ...(newData || null),
                    });
                  }}
                />

                {/* 상품정보 섹션 */}
                <ClsPkgInfo data={data as IClsAndUserData} currentUseAge={currentUseAge} />
              </>
            )}
          </div>
          <div className="flex-1">
            {/* 오른쪽 컬럼 - 결제정보 */}
            <ClsPayInfo
              data={data as IClsAndUserData}
              editable={editable}
              authority={props.authority}
              currentUseAge={currentUseAge}
              onDataChange={(newData) => {
                setData({
                  ...(data || null),
                  ...(newData || null),
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
