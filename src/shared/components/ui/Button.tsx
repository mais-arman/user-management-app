import React from "react";

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "blue" | "green";
}

export function MyButton({ variant = "blue", children, className = "", ...props }: MyButtonProps) {
    const colorClass =
        variant === "blue"
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-green-500 hover:bg-green-600";

    return (
        <button
        {...props}
        className={`${colorClass} w-full text-white py-2 rounded-lg transition ${className}`}
        >
        {children}
        </button>
    );
}