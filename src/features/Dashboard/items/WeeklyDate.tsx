import type { WeekDay } from '../types';

export default function WeeklyDate({ day, onClick }: { day: WeekDay; onClick: () => void }) {
  return (
    <button
      key={`${day.fullDate.toISOString()}`}
      className={`
              w-50px h-full rounded-[25px] flex flex-col items-center justify-center 
              text-white font-medium cursor-pointer transition-colors duration-200 ease-in-out active:scale-95
              ${day.isCurDate ? 'bg-ppp' : 'bg-ppm '}
            `}
      onClick={() => onClick()}
      type="button"
    >
      <span className="text-2xl font-bold mb-5px">{day.date}</span>
      <span className="text-base">{day.day}</span>
    </button>
  );
}
