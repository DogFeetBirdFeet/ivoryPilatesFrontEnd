export interface IMember {
  mstId: string;
  name: string;
  contact: string;
  birthDate: string;
  gender: string;
  memType: 'COS' | 'REG' | 'RES' | 'EXP';
  height: string; //소수점 가능임으로
  weight: string; // 소수점 가능임으로
  surHist: string | null;
  disease: string | null;
  remark: string | null;
  bodyImg: File | null;
  consDate?: string;
  lastClsDate?: string;
  blackYN?: string;
}
