interface ITextarea {
  id: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  maxLength?: number;
}

export default function Textarea({ id, value, onChange, className = '', placeholder, maxLength = 4000 }: ITextarea) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const byteLength = new Blob([newValue]).size;

    // maxLength(byte) 이하일 때만 업데이트
    if (byteLength <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <textarea
      id={id}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`border border-whiteGray rounded-default p-15px text-sm resize-none focus:outline-none focus:border-yellow ${className}`}
    />
  );
}
