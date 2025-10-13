/**
 * 아이콘 + 텍스트 형태의 버튼
 * 아이콘과 텍스트를 나란히 배치한 버튼으로 3개의 스타일을 가짐
 *
 * A : 배경보라색 + 텍스트흰색 버튼(default)
 * B : 텍스트보라색 버튼
 * C : 텍스트회색 버튼
 *
 * @param type 버튼 스타일 종류 ('A' | 'B' | 'C')
 * @param icon 아이콘 import한 리소스
 * @param text 버튼에 표시할 텍스트
 * @returns 아이콘과 텍스트를 포함한 버튼 컴포넌트
 */
export default function BtnIconText({
  type = 'A',
  icon,
  text,
  onClick,
}: {
  type?: 'A' | 'B' | 'C';
  icon: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  const buttonStyle = () => {
    switch (type) {
      case 'A':
        return 'bg-ppp text-white';
      case 'B':
        return 'bg-white border-ppp text-ppp';
      case 'C':
        return 'bg-white border-lightGray text-lightGray';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`h-30px flex items-center gap-[7px] py-[5px] px-10px border-[1px] rounded-[7px] cursor-pointer text-base font-medium ${buttonStyle()}`}
    >
      <img src={icon} className="w-[16px] h-[16px]" draggable="false" />
      <span className="text-base">{text}</span>
    </div>
  );
}
