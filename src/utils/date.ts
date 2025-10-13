const pad2 = (n: number) => String(n).padStart(2, '0');

export const dateFormatToString = (date: Date | null, withSeparator: boolean = true): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  return withSeparator ? `${year}-${month}-${day}` : `${year}${month}${day}`;
};

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

export const isSameDate = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const formatBirth = (birth: string) => {
  return birth.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3');
};
