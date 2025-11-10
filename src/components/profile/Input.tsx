import type { ChangeEvent } from "react";

interface InputProps {
    value: string;
    name: string;
    isEditing: boolean;
    type: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    autoComplete?: string;
}

export default function Input({ type, isEditing, value, name, handleInputChange, readOnly = false, autoComplete }: InputProps) {
    const isDisabled = readOnly || !isEditing;
    return (
        <input
            type={type}
            name={name}
            value={value}
            disabled={isDisabled}
            onChange={handleInputChange}
            autoComplete={autoComplete}
            className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white bg-opacity-60 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
    )
}