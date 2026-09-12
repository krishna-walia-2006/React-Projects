import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const mismatched = authStatus !== authentication;

    useEffect(() => {
        if (mismatched) {
            navigate(authentication ? "/login" : "/");
        }
    }, [mismatched, authentication, navigate]);

    if (mismatched) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-hairline)] border-t-[var(--color-accent)]" />
            </div>
        );
    }

    return <>{children}</>;
}
