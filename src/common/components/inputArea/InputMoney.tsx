import {INPUT_BASE_CLASS} from './styleConstants';

interface IArea {
    id: string;
    value: string;
    className?: string;
    onChange: (value: string) => void;
}

/**
 *
 * 금액(원) 형태 문자를 입력 받기 위한 input
 * @param id
 * @param value
 * @param className
 * @param onChange
 * @constructor
 */
export default function InputMoney({id, value, className, onChange}: IArea) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let numbersOnly = e.target.value;
        numbersOnly = formatNumber(numbersOnly);

        if (onChange) {
            onChange(numbersOnly);
        }
    }


    // 숫자에 쉼표 추가
    const formatNumber = (value: string) => {
        const number = value.replace(/\D/g, ''); // 숫자만 추출
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 쉼표 추가
    };

    return (
        <div className={`relative ${className}`}>
            <input
                id={id}
                className={`${INPUT_BASE_CLASS} text-end pr-25px ${className}`}
                inputMode="decimal"
                value={formatNumber(value)}
                onChange={handleChange}
            />
            <span className="absolute right-[10px] leading-[30px] text-lightGray">원</span>
        </div>
    );
}
