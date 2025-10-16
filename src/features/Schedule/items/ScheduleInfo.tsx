import BtnIconText from '@/common/components/buttons/BtnIconText';
import iconEdit from '@/assets/icon/purple/icon_save.png';
import iconDelete from '@/assets/icon/purple/icon_delete.png';
import useOverlay from '@/hooks/useOverlay';
import ScheduleInfoForm from './ScheduleInfoForm';
import { useEffect, useState } from 'react';
import type { ISchData } from '../type/types';
import StatusBadge from '@/common/components/schedule/StatusBadge';
import PopupScheDltConfirm from '@/common/popup/Schedule/PopupScheDltConfirm';

// 스케줄 조회 Item
export default function ScheduleInfo(data: ISchData) {
  const overlay = useOverlay();
  const [isEditing, setIsEditing] = useState(false);

  // data가 변경되면 편집 모드 해제
  useEffect(() => {
    setIsEditing(false);
  }, [data.schedId]); // schedId가 바뀌면 다른 스케줄

  // 스케줄 삭제 확인시 callback 함수
  function handleConfirm() {
    overlay.closeLastPopup();
  }

  // 스케줄 삭제 취소시 callback 함수
  function handleBack() {
    overlay.closeLastPopup();
  }

  // 수정버튼 클릭 이벤트
  function handleEdit() {
    setIsEditing(true);
  }

  // 수정 취소버튼 클릭 callback 함수
  function handleCancelEdit() {
    setIsEditing(false);
  }

  // 수정 후 저장버튼 클릭시 callback 함수
  function handleSave() {
    // 저장 로직 구현
    console.log('저장하기');
    setIsEditing(false);
  }

  return (
    <>
      {!isEditing ? (
        // 스케줄 조회
        <div className="w-full grid grid-cols-[150px_auto_90px] gap-10px align-middle bg-grayWhite rounded-default p-20px">
          {/* 스케줄 정보 헤더 */}
          <div className="grid grid-rows-4 gap-10px text-xl text-black font-bold">
            <p>회원명</p>
            <p>담당강사</p>
            <p>고정수업 여부</p>
            <p>수업 상태</p>
          </div>

          {/* 스케줄 정보 내용 */}
          <div className="min-w-[230px] max-w-[300px] grid grid-rows-4 gap-10px text-xl text-gray4A">
            <p>
              {data.cusNm} 회원님 {data.grpType === 'D' && '(2:1 그룹회원)'}
            </p>
            <p>{data.trainerNm}</p>
            <p>{data.fixYn}</p>
            <div>
              <StatusBadge status={data.clsStatus} type="B" />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex flex-col justify-center gap-10px">
            <BtnIconText type="B" icon={iconEdit} text="수정하기" onClick={handleEdit} />
            <BtnIconText
              type="B"
              icon={iconDelete}
              text="삭제하기"
              onClick={() => {
                overlay.showPopup(
                  <PopupScheDltConfirm
                    schedule={{ date: data.schedDate, member: data.cusNm, time: data.schedTime }}
                    onClickBack={handleBack}
                    onClickConfirm={handleConfirm}
                  />
                );
              }}
            />
          </div>
        </div>
      ) : (
        // 스케줄 수정
        <div>
          <ScheduleInfoForm data={data} onCancel={handleCancelEdit} onSave={handleSave} />
        </div>
      )}
    </>
  );
}
