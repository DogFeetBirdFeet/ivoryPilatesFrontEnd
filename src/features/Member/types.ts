export interface IMember {
  mstId: string;
  name: string;
  contact: string;
  birthDate: string;
  gender: string;
  memType: 'COS' | 'REG' | 'RES' | 'EXP';
  height: number;
  weight: number;
  surHist: string | null;
  disease: string | null;
  remark: string | null;
  bodyImg: string | null;
  consDate?: string;
  lastClsDate?: string;
  blackYN?: string;
}
