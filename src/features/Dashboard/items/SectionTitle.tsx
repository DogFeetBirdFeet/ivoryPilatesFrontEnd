interface SectionTitleProps {
  icon: string;
  title: string;
  className?: string; // 필요시 추가 스타일링
}

/**
 * 섹션 소제목 컴포넌트
 *
 * @param icon 아이콘 파일위치
 * @param title 소제목 이름
 * @param className 추가 스타일링 div에 세팅
 * @returns 소제목 컴포넌트
 */
export default function SectionTitle({ icon, title, className = '' }: SectionTitleProps) {
  return (
    <div className={`flex items-center gap-10px mb-20px ${className}`}>
      <img src={icon} className="w-[32px] h-[32px]" alt="" />
      <h2 className="text-2xl font-bold text-ppt">{title}</h2>
    </div>
  );
}
