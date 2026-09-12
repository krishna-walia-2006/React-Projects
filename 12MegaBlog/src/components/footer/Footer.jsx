import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
    return (
        <footer className="border-t border-[var(--color-hairline)]">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-[13px] text-[var(--color-ink-soft)] sm:flex-row">
                <Link to="/">
                    <Logo />
                </Link>
                <p>Built with React, Redux and Appwrite.</p>
            </div>
        </footer>
    );
}

export default Footer;
