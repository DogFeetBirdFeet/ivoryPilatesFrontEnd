/**
 * 11자리 핸드폰번호를 format형식으로 변경하는 함수
 * 예) 01000000000 -> 010-0000-0000
 * @param phone 핸드폰번호
 * @returns
 */
export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};
