export default function SearchCondition({
  id,
  labelText,
  className,
  children,
}: {
  id: string;
  labelText: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`flex ${className}`}>
      <label htmlFor={id} className="flex-shrink-0 mr-20px">
        {labelText}
      </label>
      {children}
    </div>
  );
}
