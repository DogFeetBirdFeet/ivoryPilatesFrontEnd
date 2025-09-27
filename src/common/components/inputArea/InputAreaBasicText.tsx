
interface IArea {
    id: string;
    required: boolean;
    placeholder: string;
}

/**
 *
 * @param id
 * @param required
 * @param placeholder
 * @constructor
 */
export default function InputAreaBasicText({ id, required, placeholder}: IArea) {
    return (
        <>
            {(
                <input
                  className="w-3/6 h-30px rounded-default bg-white border-[1px] border-black text-base focus:outline-none"
                  id={id}
                  aria-required={required}
                  aria-placeholder={placeholder}
                />
            )}
        </>
    )

}
