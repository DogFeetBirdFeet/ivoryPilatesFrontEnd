interface IBtn {
  type: 'A';
  icon: string;
}

/**
 * 아이콘만 있는 형태의 버튼
 *
 * A : 배경보라색 + 아이콘흰색 버튼(default)
 *
 * @param type 버튼 스타일 종류 ('A')
 * @param icon 아이콘 import한 리소스
 * @returns 아이콘만 들어간 버튼 컴포넌트
 */

export default function BtnIcon({ type, icon }: IBtn) {
  return (
    <>
      {type === 'A' && (
        <button className="flex justify-center items-center w-30px h-30px rounded-default bg-ppp">
          <img src={icon} className="w-20px h-20px" />
        </button>
      )}
    </>
  );
}
