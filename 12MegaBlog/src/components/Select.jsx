import React, { useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
    const id = useId();

    // Supports both plain strings ("active") and { label, value } objects,
    // since callers in this app pass a simple string array.
    const normalized = options.map((option) =>
        typeof option === "string" ? { label: option, value: option } : option
    );

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="mb-1.5 block text-[13px] font-medium text-[var(--color-ink-soft)]"
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full rounded-xl border border-[var(--color-hairline)] bg-white px-3.5 py-2.5 text-[15px] text-[var(--color-ink)] outline-none transition-all duration-150 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 ${className}`}
            >
                {normalized.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);
