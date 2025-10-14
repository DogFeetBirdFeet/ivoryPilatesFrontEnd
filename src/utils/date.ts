const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 *  Date -> 'yyyy-mm-dd' : 'yyyymmdd'
 * @param date
 * @param withSeparator
 * @returns 'yyyy-mm-dd' : 'yyyymmdd'
 */
export const dateFormatToString = (date: Date | null, withSeparator: boolean = true): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  return withSeparator ? `${year}-${month}-${day}` : `${year}${month}${day}`;
};

/**
 * Date -> 'yyyy-mm-dd'
 * @param date
 * @returns 'yyyy-mm-dd'
 */
export const dateStringFormat = (date: string): string => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return `${year}-${month}-${day}`;
};

/**
 *  'yyyymmdd' -> Date
 * @param dateStr
 * @returns date
 */
export const stringToDate = (dateStr: string): Date => {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  const date = new Date(`${year}-${month}-${day}`);
  return date;
};

/**
 * 'yyyy-mm-dd' -> Date
 * @param str
 * @returns
 */
export const parseStringToDate = (str: string): Date | null => {
  if (!str) return null;

  // 숫자만 추출
  const digits = str.replace(/\D/g, '');
  if (digits.length !== 8) return null;

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const date = new Date(year, month - 1, day);

  // 유효성 검증
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return date;
};
/**
 * 'yyyymmdd' -> 'yyyy년 mm월 dd일(요일)'
 * @param dateStr
 * @returns string
 */
export const formatToLocal = (dateStr: string) => {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  const date = new Date(`${year}-${month}-${day}`);

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];

  return `${year}년 ${month}월 ${day}일(${weekday})`;
};

/**
 * Date -> 'yyyy년 mm월 dd일'
 * @param date
 * @returns string
 */
export const dateToLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  return `${year}년 ${month}월 ${day}일`;
};

/**
 * Date 2개를 비교해주는 함수
 * @param a
 * @param b
 * @returns boolean
 */
export const isSameDate = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/**
 * 생년월일 형식으로 바꿔주는 함수
 * @param birth 'yyyymmdd'
 * @returns 'yyyy. mm. dd'
 */
export const formatBirth = (birth: string) => {
  return birth.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3');
};
