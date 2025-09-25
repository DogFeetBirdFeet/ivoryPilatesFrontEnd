interface IDayOff {
  type: 'A' | 'B';
  dayOffInfo: {
    day: string;
    content: string;
  };
}

/**
 * 휴일정보에 보여질 각 휴일 아이템
 *
 * A : 공휴일
 * B : 강사 휴무
 *
 * @param type 휴일 타입
 * @param dayOffInfo.day 날짜
 * @param dayOffInfo.content 휴일 내용
 * @returns 휴일 아이템
 */
export default function DayOff({ type, dayOffInfo }: IDayOff) {
  const bgColorClass = type === 'A' ? 'bg-red' : 'bg-blue';

  return (
    <div className={`h-[50px] w-full rounded-default drop-shadow-sm flex`}>
      {/* 휴일 타입 */}
      <div className={`h-full w-20px ${bgColorClass} rounded-l-default`} content=""></div>

      {/* 휴일 상세정보 */}
      <div className="h-full flex-1 flex gap-10px  px-20px rounded-r-default bg-white ">
        <p className="flex items-center text-black font-medium">{dayOffInfo.day}</p>
        <p className="flex-1 flex items-center text-gray font-medium">{dayOffInfo.content}</p>
      </div>
    </div>
  );
}
