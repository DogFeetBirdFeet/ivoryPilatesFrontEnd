import InputDate from '@/common/components/inputArea/InputDate';
import PopupConfirm from '../PopupConfirm';
import { useEffect, useState } from 'react';
import { formatToLocal, stringToDate } from '@/utils/date';
import SelectBox from '@/common/components/inputArea/SelectBox';

interface ISchedule {
  date: string;
  time: string;
  member: string;
}

const mockData = [
  { codeId: '9', dtlNm: '09:00 - 09:50' },
  { codeId: '10', dtlNm: '10:00 - 10:50' },
  { codeId: '11', dtlNm: '11:00 - 11:50' },
  { codeId: '12', dtlNm: '12:00 - 12:50' },
  { codeId: '13', dtlNm: '13:00 - 13:50' },
];

export default function PopupScheEdit({
  schedule,
  newDate,
  onClickBack,
  onClickConfirm,
}: {
  schedule: ISchedule;
  newDate: string;
  onClickBack: () => void;
  onClickConfirm: () => void;
}) {
  const [editDate, setEditDate] = useState<Date | null>(stringToDate(newDate));
  const [editTime, setEditTime] = useState<string | null>(schedule.time);

  // TODO : editDate 바뀔때마다 editTime fetch

  useEffect(() => {
    setEditDate(stringToDate(newDate));
  }, [newDate]);

  const formatTime = (timeStr: string) => {
    return `${timeStr}:00 - ${timeStr}:50`;
  };

  const formatMember = (memberStr: string) => {
    return `${memberStr} 회원님`;
  };

  return (
    <PopupConfirm onClickBack={onClickBack} onClickConfirm={onClickConfirm}>
      <div className="text-ppm">
        <span className="mr-5px">{formatToLocal(schedule.date)}</span>
        <span>{formatTime(schedule.time)}</span>
      </div>
      <div>
        <span className="text-ppm">{formatMember(schedule.member)}</span>
        <span>의 스케줄을 변경하시겠습니까?</span>
      </div>

      <div className="mt-20px">
        <div className="flex gap-20px h-30px justify-between items-center mb-10px">
          <label htmlFor="editDate" className="text-ppm">
            변경 일자 <span className="text-red">*</span>
          </label>
          <InputDate
            id="editDate"
            value={editDate}
            onChange={(value) => setEditDate(value)}
            className="required w-[230px]"
          />
        </div>
        <div className="flex gap-20px h-30px justify-between items-center mb-10px">
          <label htmlFor="editTime" className="text-ppm">
            변경 시간대 <span className="text-red">*</span>
          </label>
          <SelectBox
            id="editTime"
            options={mockData}
            value={editTime}
            onChange={(value) => setEditTime(value)}
            center={true}
            className="required w-[230px]"
          />
        </div>
      </div>
    </PopupConfirm>
  );
}
