import { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index.js";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    // Bug fix: this previously read `state.auth.staus` (typo), which is
    // always undefined - so the header could never tell you were logged in.
    const authStatus = useSelector((state) => state.auth.status);
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", slug: "/", show: true },
        { name: "Login", slug: "/login", show: !authStatus },
        { name: "Sign up", slug: "/signup", show: !authStatus },
        { name: "All posts", slug: "/all-posts", show: authStatus },
        { name: "Add post", slug: "/add-post", show: authStatus },
    ];

    const linkClasses = ({ isActive }) =>
        `rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-150 ${
            isActive
                ? "text-[var(--color-ink)]"
                : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--color-hairline)]/70 bg-white/70 backdrop-blur-xl">
            <Container>
                <nav className="flex h-14 items-center justify-between">
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        <Logo />
                    </Link>

                    <ul className="hidden items-center gap-1 md:flex">
                        {navItems.map(
                            (item) =>
                                item.show && (
                                    <li key={item.name}>
                                        <NavLink to={item.slug} className={linkClasses} end>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                )
                        )}
                        {authStatus && (
                            <li className="ml-1">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>

                    <button
                        type="button"
                        aria-label="Toggle menu"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-ink)] transition-colors hover:bg-black/5 md:hidden"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            {menuOpen ? (
                                <path
                                    d="M2 2L16 16M16 2L2 16"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                            ) : (
                                <>
                                    <path d="M2 5H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                    <path d="M2 13H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                </>
                            )}
                        </svg>
                    </button>
                </nav>

                {menuOpen && (
                    <ul className="flex flex-col gap-1 border-t border-[var(--color-hairline)]/70 py-3 md:hidden">
                        {navItems.map(
                            (item) =>
                                item.show && (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.slug}
                                            onClick={() => setMenuOpen(false)}
                                            className={({ isActive }) =>
                                                `block rounded-lg px-3 py-2 text-[15px] font-medium ${
                                                    isActive
                                                        ? "bg-black/5 text-[var(--color-ink)]"
                                                        : "text-[var(--color-ink-soft)]"
                                                }`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                )
                        )}
                        {authStatus && (
                            <li className="px-1 pt-1">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                )}
            </Container>
        </header>
    );
}

export default Header;
