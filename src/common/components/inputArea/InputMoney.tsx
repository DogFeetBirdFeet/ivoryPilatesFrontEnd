import {type ChangeEvent, useState} from "react";

interface IArea {
    id: string;
    className?: string;
}

/**
 *
 * 금액(원) 형태 문자를 입력 받기 위한 input
 * @param id
 * @param className
 * @constructor
 */
export default function InputMoney({ id, className }: IArea) {

    const [amount, setAmount] = useState<number | null>(null);
    const [display, setDisplay] = useState<string>("");

    const INPUT_BASE_CLASS =
        "w-[250px] leading-[30px] h-30px p-10px rounded-default bg-white border-[1px] border-gray text-base focus:outline-none focus:border-yellow text-right";

    // 입력된 문자열 숫자로 전환
    const toNumber = (text: string): number | null => {
        const digits = text.replace(/\D/g, "");
        if (!digits) return null;
        const n = Number(digits);
        return Number.isNaN(n) ? null : n;
        // ... existing code ...
    };

    // "원" 텍스트 우측으로 추가
    const formatCurrency = (n: number | null): string => {
        if (n === null) return "";
        return `${n.toLocaleString()} 원`;
    };

    // 입력 시: 숫자만 파싱해 상태 업데이트, 표시 문자열은 그대로(숫자만) 유지
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const n = toNumber(raw);
        setAmount(n);
        setDisplay(raw.replace(/\D/g, ""));
        // ... existing code ...
    };

    // 포커스 시: 포맷 해제(숫자만 보이게)
    const handleFocus = () => {
        setDisplay(amount === null ? "" : String(amount));
    };

    // 블러 시: 포맷 적용
    const handleBlur = () => {
        setDisplay(formatCurrency(amount));
    };

    return (
        <input
            id={id}
            className={`${INPUT_BASE_CLASS}${className ? ` ${className}` : ""}`}
            type="text"
            inputMode="numeric"
            placeholder="0원"
            value={display}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
        />
    );
}
