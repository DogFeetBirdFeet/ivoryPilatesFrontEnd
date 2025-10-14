import PopupConfirm from '../PopupConfirm';

interface ISchedule {
  date: string;
  time: string;
  member: string;
}

export default function PopupScheDltConfirm({
  schedule,
  onClickBack,
  onClickConfirm,
}: {
  schedule: ISchedule;
  onClickBack: () => void;
  onClickConfirm: () => void;
}) {
  const formatDate = (dateStr: string) => {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);

    const date = new Date(`${year}-${month}-${day}`);

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];

    return `${year}년 ${month}월 ${day}일(${weekday})`;
  };

  const formatTime = (timeStr: string) => {
    return `${timeStr}:00 - ${timeStr}:50`;
  };

  const formatMember = (memberStr: string) => {
    return `${memberStr} 회원님`;
  };

  return (
    <PopupConfirm onClickBack={onClickBack} onClickConfirm={onClickConfirm}>
      <div className="text-ppm">
        <span className="mr-5px">{formatDate(schedule.date)}</span>
        <span>{formatTime(schedule.time)}</span>
      </div>
      <div>
        <span className="text-ppm">{formatMember(schedule.member)}</span>
        <span>의 수업을 정말 삭제하시겠습니까?</span>
      </div>
    </PopupConfirm>
  );
}
