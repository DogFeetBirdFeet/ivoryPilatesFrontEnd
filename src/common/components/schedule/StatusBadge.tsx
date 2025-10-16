import type { SCHEDULE_STATUS } from '@/constants/schedule';

const colorList = {
  SCH: 'bg-[#FF8000]',
  COM: 'bg-[#0C8CE9]',
  NOS: 'bg-[#DA4962]',
};

const textList = {
  SCH: '예정',
  COM: '완료',
  NOS: '노쇼',
};

/**
 * 스케줄의 상태를 보여주는 벳지 (완료/예정/노쇼)
 *
 *
 * @param status
 * @returns 아이콘과 텍스트를 포함한 버튼 컴포넌트
 */
export default function StatusBadge({
  status,
  type = 'A',
}: {
  status: keyof typeof SCHEDULE_STATUS;
  type?: 'A' | 'B';
}) {
  const color = colorList[status];
  const text = textList[status];

  return (
    <>
      {type === 'A' && (
        <div className="flex gap-10px items-center">
          <div className={`w-20px h-20px rounded-full ${color}`}></div>
          <div className="text-xl font-medium text-gray55">{text}</div>
        </div>
      )}
      {type === 'B' && (
        <div className={`w-50px flex justify-center px-10px py-[3px] rounded-[5px] ${color}`}>
          <span className="text-base font-medium text-white">{text}</span>
        </div>
      )}
    </>
  );
}
