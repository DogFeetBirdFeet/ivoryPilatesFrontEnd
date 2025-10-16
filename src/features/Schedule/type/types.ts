import type { SCHEDULE_STATUS, SCHEDULE_TYPE } from '@/constants/schedule';

export interface ITimeSlot {
  id: string;
  time: string;
  schedule: ISchData[] | null;
}

// TODO : API설계서 확인후 정확하게 수정필요
export interface IInsDay {
  schedId?: number;
  acctId?: number;
  mstId?: number;
  trainerNm?: string;
  cusNm?: string;
  acctOffYn?: string;
  holYn?: string;
  centerOffYn?: string;
  offAcctNm?: string;
  grpYn?: string;
  grpIds?: string;
  grpNms?: string;
  grpType?: keyof typeof SCHEDULE_TYPE; // 'S' | 'D'
  clsStatus?: keyof typeof SCHEDULE_STATUS; // 'SCH' | 'COM' | 'NOS'
  clsSession?: string;
  injury?: string;
  homework?: string;
  videoRecYn?: string;
  restYn?: string;
  fixYn?: string;
  clsNote?: string;
  clsNoteYn?: string;
  regDtm?: string;
  regId?: string;
  modDtm?: string;
  modId?: string;
  calId?: number;
  calType?: string;
  year?: string;
  month?: string;
  day?: string;
  korDate?: string;
  schedDate?: string;
  schedTime?: string;
}

export interface ISchData {
  schedId: string;
  cusId: string;
  cusNm: string;
  trainerId: string;
  trainerNm: string;
  schedDate: string;
  schedTime: string;
  fixYn: string;
  grpType: keyof typeof SCHEDULE_TYPE | null; // 'S' | 'D'
  clsStatus: keyof typeof SCHEDULE_STATUS;
}
