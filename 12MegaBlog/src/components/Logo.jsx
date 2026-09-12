function Logo({ className = "" }) {
    return (
        <span
            className={`select-none text-[19px] font-semibold tracking-tight text-[var(--color-ink)] ${className}`}
        >
            mega<span className="text-[var(--color-accent)]">blog</span>
        </span>
    );
}

export default Logo;
