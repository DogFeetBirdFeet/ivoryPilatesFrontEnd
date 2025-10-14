import iconEdit from '@/assets/icon/purple/icon_save.png';
import iconBack from '@/assets/icon/purple/icon_cancel.png';
import iconSave from '@/assets/icon/white/icon_save.png';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import { useEffect, useState } from 'react';
import GroupMem from '../items/GroupMem';
import useOverlay from '@/hooks/useOverlay';
import PopupSearchMem from '@/common/popup/PopupSearchMem';

interface IGrpDetail {
  name: string;
  number: string;
  birth: string;
}

export default function GroupDetail({ groupId, memberName }: { groupId: string | null; memberName: string | null }) {
  const [grpDetail, setGrpDetail] = useState<IGrpDetail[]>();
  const [mode, setMode] = useState<'edit' | 'view' | 'add'>('view');
  const overlay = useOverlay();

  // TODO : groupID로 데이터 fetch할지, 그룹회원 조회시 Detail까지 받아와서 화면에서 보여주기만 할지?
  useEffect(() => {
    const nameList = memberName?.split(', ');
    if (nameList) {
      const newDetail = nameList.map((newName) => ({ name: newName, number: '01000000000', birth: '99999999' }));
      setGrpDetail(() => newDetail);
    }
  }, [memberName]);

  return (
    <section className="mr-20px">
      {/* TODO : 그룹타입 2:1은 수정버튼 안보임 */}
      <div className={`h-50px flex justify-between items-center mb-10px ${!groupId && 'invisible'}`}>
        {mode === 'view' && (
          <>
            <div>
              <span className="text-ppt font-bold text-xl mr-30px">그룹 ID</span>
              <span className="font-medium">{groupId}</span>
            </div>
            <BtnIconText
              type="B"
              icon={iconEdit}
              text="수정하기"
              onClick={() => {
                setMode('edit');
              }}
            />
          </>
        )}
        {(mode === 'edit' || mode === 'add') && (
          <>
            <div>
              {mode === 'edit' && (
                <>
                  <span className="text-ppt font-bold text-xl mr-30px">그룹 ID</span>
                  <span className="font-medium">{groupId}</span>
                </>
              )}
            </div>
            <div className="flex gap-10px">
              <BtnIconText
                type="B"
                icon={iconBack}
                text="취소하기"
                onClick={() => {
                  setMode('add');
                }}
              />
              <BtnIconText
                type="A"
                icon={iconSave}
                text="저장하기"
                onClick={() => {
                  setMode('view');
                }}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-20px">
        {mode === 'view' ? (
          Array.from({ length: 4 }).map((_, index) => {
            const member = grpDetail?.[index];
            return <GroupMem key={`grp_mem_${index}`} member={member} />;
          })
        ) : (
          <>
            {mode === 'add' && (
              <div className="flex">
                <span className="text-ppt font-bold text-xl mr-30px">그룹 타입</span>
                <div className="flex items-center">
                  <input type="radio" name="1:1" value="1:1" className="mr-5px" />
                  <span className="text-sm mr-20px">수강권 공유</span>
                  <input type="radio" name="2:1" value="2:1" className="mr-5px" />
                  <span className="text-sm">2:1 수업</span>
                </div>
              </div>
            )}
            {grpDetail?.map((member, index) => (
              <GroupMem key={`grp_mem_${index}`} member={member} isView={false} />
            ))}
            <button
              className="w-full h-50px flex items-center justify-center text-xl font-bold text-white bg-[#B6ACCF] rounded-default border-b-[1px] border-grayD9"
              onClick={() => {
                // TODO : 추가된 회원 화면에 아이템으로 추가, 리스트 4개 이상일때 버튼 안보이게
                overlay.showPopup(
                  <PopupSearchMem
                    onDoubleClick={(data) => {
                      console.log(data);
                      overlay.closePopup();
                    }}
                  />
                );
              }}
            >
              회원 추가하기
            </button>
          </>
        )}
      </div>
    </section>
  );
}
