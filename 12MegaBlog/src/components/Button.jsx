function Button({
    children,
    type = "button",
    variant = "primary",
    className = "",
    ...props
}) {
    const base =
        "inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-[15px] font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none";

    const variants = {
        primary:
            "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-sm hover:shadow",
        secondary:
            "bg-black/5 text-[var(--color-ink)] hover:bg-black/10",
        danger:
            "bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger-hover)]",
        ghost:
            "text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10",
    };

    return (
        <button
            type={type}
            className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
