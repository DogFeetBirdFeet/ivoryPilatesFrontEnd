export interface IMember {
  id: string;
  name: string;
  number: string;
  birth: string;
  gender: string;
  memType: 'COS' | 'REG' | 'RES' | 'EXP';
  height: number;
  weight: number;
  surHist: string | null;
  disease: string | null;
  memo: string | null;
  bodyImg: string | null;
  lastClsDate: string;
}
