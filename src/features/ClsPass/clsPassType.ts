export interface IClsPassData {
  clsPkgId: number;
  clsPassId: number; // 결제 수강권 ID
  userId: number; // 회원 ID
  userNm: string; // 회원명
  clsPkgNm: string; // 상품명
  clsType: string; // 상품타입
  price: number; // 기본금액
  paidAmt: number; // 결제 금액
  discountAmt: number; // 기본할인금액
  discountAmt2: number; // 추가할인금액
  totalCnt: number; // 총 회차
  remainCnt: number; // 잔여 회차
  expRate: string; // 유효 기간
  payMethod: string; // 결제 수단
  payDate: string; // 결제 일자
  refundYn: string; // 환불 여부
  useYn: string; // 사용 여부
}

export interface IClsPassSearchForm {
  payDateFrom: Date | null;
  payDateTo: Date | null;
  refundDateFrom: Date | null;
  refundDateTo: Date | null;
  searchPayName: string;
  searchName: string;
}

export interface IPropsAuthority {
  title: string;
  userId: number;
  userNm: string;
  clsPassId: number;
  useAge: number; // 1 : 조회 - 사용중, 2 :  조회 - 만료/환불, 3 : 수정 - 사용중, 4 : 수정 - 만료/환불, 5 : 등록
  authority: number; // 1 : 강사, 2 : 관리자
  onCancel?: () => void; // 취소 버튼 클릭 시 호출될 함수
}

export interface IClsAndUserData {
  contact: string; // 연락처
  birthDate: string; // 생년월일
  gender: string; // 성별
  cusType: string; // 회원구분
  staDtm: string; // 게시일자
  endDtm: string; // 종료예정일자
  totalCnt: number; // 총 회차
  remainCnt: number; // 잔여 회차
  useYn: boolean; // 만료 여부
  clsPkgNm: string; // 상품명
  clsPassId: number; // 결제수강권 ID
  price: number; // 기본금액
  discountAmtPkg: number; // 기본할인금액
  clsPkgCnt: number; // 기본회차
  expRate: string; // 최대 사용기간(일)
  paidAmt: number; // 결제 금액
  discountAmtPass: number; // 추가할인금액
  payDate: string; // 결제 일자
  payMethod: string; // 결제 수단
  instMm: number; // 할부 개월수
  payUserNm: string; // 결제자
  remark: string; // 메모
  refundDtm: string; // 환불 일자
  refundAmt: number; // 환불 금액
  refundYn: boolean; // 환불 여부
}
