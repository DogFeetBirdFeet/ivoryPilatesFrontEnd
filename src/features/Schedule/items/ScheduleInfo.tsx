import BtnIconText from '@/common/components/buttons/BtnIconText';
import {useNavigate} from 'react-router-dom';
import iconSave from '@/assets/icon/purple/icon_save.png';
import iconDelete from '@/assets/icon/purple/icon_delete.png';
import type {IInsDay} from '@/features/Schedule/type/types';
import PopupConfirm from '@/common/popup/PopupConfirm';
import useOverlay from '@/hooks/useOverlay';
import ScheduleDetailInfo from './ScheduleDetailInfo';
import {useState} from 'react';

export default function ScheduleInfo({data}: { data?: IInsDay }) {

    const overlay = useOverlay();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    function handleConfirm() {
        overlay.closePopup();
        navigate(-1);
    }

    function handleBack() {
        overlay.closePopup();
    }

    function handleEdit() {
        setIsEditing(true);
    }

    function handleCancelEdit() {
        setIsEditing(false);
    }

    function handleSave() {
        // 저장 로직 구현
        console.log('저장하기');
        setIsEditing(false);
    }

    return (
        <div className="w-full">
            {/* 기존 스케줄 정보 */}
            <div className="w-full bg-grayWhite rounded-lg p-6">
                <div className="flex justify-between items-start">
                    {/* 정보 섹션 */}
                    <div className="flex-1">
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <span className="text-xl text-black font-bold w-28">회원명</span>
                                <span className="text-base font-medium">{data?.cusNm} 회원님</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-xl text-black font-bold w-28">담당강사</span>
                                    <span className="text-base font-medium">{data?.trainerNm} 강사</span>
                                </div>
                                <BtnIconText
                                    type="B"
                                    icon={iconSave}
                                    text={data?.schedId ? "수정하기" : "추가하기"}
                                    onClick={handleEdit}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-xl text-black font-bold w-28">고정수업 여부</span>
                                    <span className="text-base font-medium">{data?.fixYn}</span>
                                </div>
                                {data?.schedId ? (
                                    <BtnIconText
                                        type="B"
                                        icon={iconDelete}
                                        text="삭제하기"
                                        onClick={() => {
                                            overlay.showPopup(<PopupConfirm onClickConfirm={handleConfirm}
                                                                            onClickBack={handleBack} confirmText="확인"
                                                                            cancelText="취소">
                                                <div>
                                                    <p>{data?.year}년 {data?.month}월 {data?.day}일({data?.korDate?.substring(0, 1)}) {data?.schedTime}:00
                                                        - {data?.schedTime}:50</p>
                                                    <p>{data?.cusNm} 회원님의 수업을 정말 삭제하시겠습니까?</p>
                                                </div>
                                            </PopupConfirm>);
                                        }}
                                    />
                                ) : (
                                    null
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xl text-black font-bold w-28">수업 상태</span>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${
                                    data?.clsStatus === 'COM' ? 'bg-[#0C8CE9]' :
                                        data?.clsStatus === 'SCH' ? 'bg-[#FF8000]' :
                                            data?.clsStatus === 'NOS' ? 'bg-[#DA4962]' :
                                                ''
                                }`}>
                                    {data?.clsStatus === 'COM' ? '완료' :
                                        data?.clsStatus === 'SCH' ? '예정' :
                                            data?.clsStatus === 'NOS' ? '노쇼' : data?.clsStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 편집 폼 (수정하기 버튼 클릭 시 표시) */}
            {isEditing && (
                <div className="mt-4">
                    <ScheduleDetailInfo
                        data={data}
                        onCancel={handleCancelEdit}
                        onSave={handleSave}
                    />
                </div>
            )}
        </div>
    );
}