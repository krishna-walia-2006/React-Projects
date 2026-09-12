import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        await authService.logout();
        dispatch(logout());
    };

    return (
        <button
            onClick={logoutHandler}
            className="rounded-full px-4 py-2 text-[14px] font-medium text-[var(--color-ink-soft)] transition-colors duration-150 hover:text-[var(--color-ink)]"
        >
            Log out
        </button>
    );
}

export default LogoutBtn;
