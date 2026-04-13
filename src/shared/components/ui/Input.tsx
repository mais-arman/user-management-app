import React from "react";

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export function MyInput({ error, className = "", ...props }: MyInputProps) {
    return (
        <input
        {...props}
        className={`border p-2 w-full rounded-lg focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-400" : "focus:ring-blue-400"
        } ${className}`}
        />
    );
}