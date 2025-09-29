import { INPUT_BASE_CLASS } from './styleConstants';

interface IArea {
  id: string;
  placeholder?: string;
  className?: string;
}

/**
 *
 * @param id
 * @param placeholder
 * @param className
 * @constructor
 */
export default function InputText({ id, className, placeholder }: IArea) {
  return (
    <>
      <input className={`${INPUT_BASE_CLASS} ${className}`} id={id} aria-placeholder={placeholder} />
    </>
  );
}
