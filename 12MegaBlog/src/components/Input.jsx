import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    { label, type = "text", className = "", ...props },
    ref
) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label
                    className="mb-1.5 block text-[13px] font-medium text-[var(--color-ink-soft)]"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full rounded-xl border border-[var(--color-hairline)] bg-white px-3.5 py-2.5 text-[15px] text-[var(--color-ink)] outline-none transition-all duration-150 placeholder:text-[var(--color-ink-soft)]/70 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;
