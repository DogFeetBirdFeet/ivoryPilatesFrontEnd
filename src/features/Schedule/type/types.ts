import type {SCHEDULE_STATUS, SCHEDULE_TYPE} from '@/constants/schedule';

export interface ITimeSlot {
    id: string;
    time: number;
    schedule: IInsDay[] | null;
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

export interface IInsDay {
    schedId: number;
    acctId: number;
    mstId: number;
    trainerNm: string;
    cusNm: string;
    acctOffYn: string;
    holYn: string;
    centerOffYn: string;
    offAcctNm: string;
    grpYn: string;
    grpIds: string;
    grpNms: string;
    clsStatus: string;
    clsSession: string;
    injury: string;
    homework: string;
    videoRecYn: string;
    restYn: string;
    fixYn: string;
    clsNote: string;
    clsNoteYn: string;
    regDtm: string;
    regId: string;
    modDtm: string;
    modId: string;
    calId: number;
    calType: string;
    year: string;
    month: string;
    day: string;
    korDate: string;
    schedDate: string;
    schedTime: string;
}
