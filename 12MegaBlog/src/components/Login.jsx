import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const login = async (data) => {
        setError("");
        setSubmitting(true);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin({ userData }));
                }
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex w-full items-center justify-center px-4">
            <div className="w-full max-w-sm rounded-3xl border border-[var(--color-hairline)] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="mb-6 flex justify-center">
                    <Logo />
                </div>
                <h1 className="text-center text-[22px] font-semibold tracking-tight">
                    Sign in
                </h1>
                <p className="mt-1.5 text-center text-[14px] text-[var(--color-ink-soft)]">
                    New here?{" "}
                    <Link to="/signup" className="font-medium text-[var(--color-accent)]">
                        Create an account
                    </Link>
                </p>

                {error && (
                    <p className="mt-5 rounded-xl bg-[var(--color-danger)]/8 px-3 py-2 text-center text-[13px] text-[var(--color-danger)]">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-4">
                    <Input
                        label="Email"
                        placeholder="you@example.com"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Enter a valid email address",
                            },
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" className="mt-2 w-full" disabled={submitting}>
                        {submitting ? "Signing in…" : "Sign in"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
