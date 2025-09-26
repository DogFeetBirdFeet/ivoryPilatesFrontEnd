import DayOff from '../items/DayOff';

export default function SectionDayOff() {
  return (
    <div className="flex-1 overflow-y-auto mb-30px custom-scrollbar">
      <div className="flex flex-col gap-10px pb-10px">
        <DayOff type={'B'} dayOffInfo={{ day: '2025-08-04 (월)', content: '원예진 강사 휴가' }} />
        <DayOff type={'A'} dayOffInfo={{ day: '2025-08-15 (금)', content: '광복절' }} />
        <DayOff type={'B'} dayOffInfo={{ day: '2025-08-04 (월)', content: '원예진 강사 휴가' }} />
        <DayOff type={'B'} dayOffInfo={{ day: '2025-08-04 (월)', content: '원예진 강사 휴가' }} />
        <DayOff type={'B'} dayOffInfo={{ day: '2025-08-04 (월)', content: '원예진 강사 휴가' }} />
      </div>
    </div>
  );
}
