import type {WeekDay} from '@/features/Dashboard/types';

export default function WeeklyDate({day, onClick}: { day: WeekDay; onClick: () => void }) {
    return (
        <button
            key={`${day.fullDate.toISOString()}`}
            className={`
              w-100px h-100px rounded-lg flex flex-col items-center justify-center rounded-full
              ${day.isCurDate
                ? 'bg-ppp text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }
            `}
            onClick={() => onClick()}
            type="button"
        >
            <span className="text-2xl font-bold mb-1">{day.fullDate.getMonth() + 1}/{day.date}</span>
            <span className="text-3xl font-bold">{day.day}</span>
        </button>
    );
}
