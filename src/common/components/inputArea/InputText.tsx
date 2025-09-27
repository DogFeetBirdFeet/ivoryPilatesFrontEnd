interface IArea {
  id: string;
  placeholder?: string;
  width?: string;
}

/**
 *
 * @param id
 * @param required
 * @param placeholder
 * @constructor
 */
export default function InputText({ id, width, placeholder }: IArea) {
  const clsWidth = width ? `w-${width}` : 'w-[250px]';
  return (
    <>
      <input
        className={`${clsWidth} leading-[30px] h-30px p-10px rounded-default bg-white border-[1px] border-gray text-base focus:outline-none focus:border-yellow `}
        id={id}
        aria-placeholder={placeholder}
      />
    </>
  );
}
