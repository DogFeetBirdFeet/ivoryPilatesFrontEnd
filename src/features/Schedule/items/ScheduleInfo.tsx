interface IScheduleInfo {
    userId: string;
    userNm: string;
    trainerNm: string;
    fixYn: boolean;
    status: string;
}

export default function ScheduleInfo({scheduleInfo}: { scheduleInfo: IScheduleInfo }) {
    return (
        <>
            <h1>{scheduleInfo.userNm}</h1>
            <h1>{scheduleInfo.trainerNm}</h1>
            <h1>{scheduleInfo.fixYn ? '고정' : '비고정'}</h1>
            <h1>{scheduleInfo.status}</h1>
        </>
    );
}