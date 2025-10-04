import type {SCHEDULE_STATUS, SCHEDULE_TYPE} from '@/constants/schedule';

export interface ITimeSlot {
    id: string;
    time: number;
    schedule: IScheduleItem[] | null;
    trainerBreak: string[] | null;
}

export interface IScheduleItem {
    id: string;
    cusNm: string;
    pix: boolean;
    trainerNm: string;
    status: keyof typeof SCHEDULE_STATUS; // 'SCH' | 'COM' | 'NOS'
    type: keyof typeof SCHEDULE_TYPE; // 'S' | 'D'
}

export interface WeekDay {
    date: number;
    day: string;
    fullDate: Date;
    isCurDate: boolean;
}
