import BtnIconText from '@/common/components/buttons/BtnIconText';
import iconSave from '@/assets/icon/purple/icon_save.png';
import iconDelete from '@/assets/icon/purple/icon_delete.png';
import type {IInsDay} from '@/features/Schedule/type/types';


export default function ScheduleInfo({data}: { data?: IInsDay }) {
    return (
        <div className="w-full bg-grayWhite rounded-lg">
            <div className="flex justify-between items-start">
                {/* 정보 섹션 */}
                <div className="flex-1 pl-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <span className="text-xl text-black font-bold w-28">회원명</span>
                            <span className="text-lg font-medium">{data?.cusNm} 회원님</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-xl text-black font-bold w-28">담당강사</span>
                                <span className="text-lg font-medium">{data?.trainerNm} 강사</span>
                            </div>
                            <BtnIconText
                                type="B"
                                icon={iconSave}
                                text="수정하기"
                                onClick={() => {
                                    console.log('수정하기');
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-xl text-black font-bold w-28">고정수업 여부</span>
                                <span className="text-lg font-medium">{data?.fixYn}</span>
                            </div>
                            <BtnIconText
                                type="B"
                                icon={iconDelete}
                                text="삭제하기"
                                onClick={() => {
                                    console.log('삭제하기');
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xl text-black font-bold w-28">수업 상태</span>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                data?.clsStatus === 'COM' ? 'bg-orange-100 text-orange-800' :
                                    data?.clsStatus === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                            }`}>
                                {data?.clsStatus === 'COM' ? '예정' :
                                    data?.clsStatus === 'SCHEDULED' ? '예정' : data?.clsStatus}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}