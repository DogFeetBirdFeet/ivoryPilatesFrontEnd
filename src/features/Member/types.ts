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

export interface IMemberDefaultInfo {
  mstId: string;
  name: string;
  contact: string;
  birthDate: string;
  gender: string;
  memType: 'COS' | 'EXP' | 'REG' | 'RES';
  height: string;
  weight: string;
  surHist: string | null;
  disease: string | null;
  remark: string | null;
  bodyImg: File | null;
}

export interface IMemberCos extends IMemberDefaultInfo {
  consDate: string; // 상담일자
}

export interface IMemberReg extends IMemberDefaultInfo {
  lastClsDate: string; // 마지막 수강일자
  acctId: string; //담당강사
  flxClsYn: 'Y' | 'N'; // 고정수업여부
  flxClsDay?: string; // 고정수업 요일
  flxClsTm?: string; //고정수업 시간
  grpYn: 'Y' | 'N'; //그룹회원 여부
  grpType?: 'S' | 'G'; //그룹구분
  grpId?: string;
  grpList?: { memberId: string; memberName: string; memberBirth: string; memberGender: 'W' | 'M' }[];
}

export interface IMemberRes extends IMemberDefaultInfo {
  lastClsDate: string;
}
