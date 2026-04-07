import { useState } from "react";
import { useTranslation } from "react-i18next";

export type Field<T extends Record<string, string>> = {
    name: keyof T;
    type?: string;
    placeholder: string;
};

function createInitialState<T extends Record<string, string>>(fields: Field<T>[]): T {
    const state = {} as T;
    fields.forEach((field) => {
        state[field.name] = "" as T[keyof T];
    });
    return state;
}

export function AuthForm<T extends Record<string, string>>(props: {
    title?: string;
    fields: Field<T>[];
    submitText: string;
    errorText?: string;
    isPending?: boolean;
    onSubmit: (data: T) => void;
}) {
    const [formState, setFormState] = useState<T>(() => createInitialState<T>(props.fields));
    const { t } = useTranslation();

    const handleChange = (name: keyof T, value: string) => {
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.onSubmit(formState);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-20">
            {props.title && (
                <h2 className="text-xl font-bold text-center mb-4">
                    {props.title}
                </h2>
            )}

            {props.fields.map((field) => (
                <input
                    key={String(field.name)}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={formState[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            ))}

            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
                {props.isPending ? t("loading") : props.submitText}
            </button>

            {props.errorText && <p className="text-red-500 text-center">{props.errorText}</p>}
        </form>
    );
}