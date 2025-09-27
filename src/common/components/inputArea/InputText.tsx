interface IArea {
  id: string;
  placeholder?: string;
  className?: string;
}

/**
 *
 * @param id
 * @param required
 * @param placeholder
 * @constructor
 */
export default function InputText({ id, className, placeholder }: IArea) {
  return (
    <>
      <input
        className={`w-[250px] leading-[30px] h-30px p-10px rounded-default bg-white border-[1px] border-gray text-base focus:outline-none focus:border-yellow ${className}`}
        id={id}
        aria-placeholder={placeholder}
      />
    </>
  );
}
