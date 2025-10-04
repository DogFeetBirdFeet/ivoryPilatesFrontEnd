import type {WeekDay} from '@/features/Dashboard/types';

export default function WeeklyDate({day, onClick}: { day: WeekDay; onClick: () => void }) {
    return (
        <button
            key={`${day.fullDate.toISOString()}`}
            className={`
              w-60px h-80px rounded-lg flex flex-col items-center justify-center 
              font-medium cursor-pointer transition-all duration-200 ease-in-out active:scale-95
              ${day.isCurDate
                ? 'bg-ppp text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }
            `}
            onClick={() => onClick()}
            type="button"
        >
            <span className="text-sm font-normal mb-1">{day.fullDate.getMonth() + 1}/{day.date}</span>
            <span className="text-lg font-bold">{day.day}</span>
        </button>
    );
}
