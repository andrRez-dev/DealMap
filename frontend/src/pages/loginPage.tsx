
import GoogleIcon from "@mui/icons-material/Google";
import LoginImg from "../components/images/loginImg.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, type SubmitEvent } from "react";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;
  const token = import.meta.env.VITE_FRONTEND_TOKEN;

  async function login(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!api || !token) {
      setError("error with the api url or token");
      return;
    }

    const form = new FormData(event.currentTarget);

    const body = {
      login: form.get("login"),
      password: form.get("password"),
    };

    setLoading(true);

    try {
      const response = await fetch(`${api}/api/user/verify`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "error with login");
        return;
      }

      localStorage.setItem("client_token", data.client_token);
      navigate("/main");
    } catch {
      setError("did not succeed to connect with the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex h-dvh w-full min-w-0 flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-green-950 px-3 py-16 sm:px-6 lg:px-8">
       {/* Back to Home */}
      <Link
        to="/"
        className="absolute left-3 top-4 z-10 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-green-900 shadow-md transition-colors hover:bg-green-100 sm:left-6 sm:top-6 sm:px-4 sm:text-sm lg:left-8"
      >
        <ArrowLeft
          aria-hidden="true"
          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
        />
        Back to Home
      </Link>

      {/* Auth card */}
      <div className="flex w-full min-w-0 max-w-[880px] overflow-hidden rounded-xl shadow-2xl">
        {/* Login form */}
        <div className="flex w-full min-w-0 flex-col items-center border border-white bg-gray-900 px-4 py-8 text-white sm:w-1/2 sm:px-6 sm:py-10 lg:px-8">
          <h1 className="mt-2 text-center text-xl font-semibold sm:mt-4 sm:text-2xl">
            Welcome back
          </h1>

          <p className="mt-2 text-center text-sm text-gray-300 sm:text-base">
            Login to your DealMap account
          </p>

          <form
            className="mt-6 flex w-full min-w-0 max-w-[320px] flex-col"
            onSubmit={login}
          >
            <label
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="login"
              placeholder="username@example.com"
<<<<<<< HEAD
              autoComplete="email"
              className="mt-1 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
=======
              className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              required
            />

            <div className="mt-5 flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium"
              >
                Password
              </label>

              {/* Password recovery is not implemented yet */}
              <span className="text-xs text-gray-400 sm:text-sm">
                Forgot your password?
              </span>
            </div>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="**********"
<<<<<<< HEAD
              autoComplete="current-password"
              className="mt-1 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
=======
              className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-5 min-h-11 w-full cursor-pointer rounded-md bg-white px-4 py-2.5 font-medium text-gray-900 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

<<<<<<< HEAD
          {/* Error message */}
          <div
            className="my-4 w-full min-w-0 max-w-[320px]"
            aria-live="polite"
          >
            {error && (
              <p
                className="break-words text-center text-sm font-medium text-red-400"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="flex w-full max-w-[320px] items-center gap-3">
            <div className="h-px min-w-0 flex-1 bg-gray-600" />

            <span className="shrink-0 text-sm text-gray-300">
              Or
            </span>

            <div className="h-px min-w-0 flex-1 bg-gray-600" />
          </div>

          {/* Google login placeholder */}
          <button
            type="button"
            disabled
            className="mt-4 inline-flex min-h-11 w-full max-w-[320px] items-center justify-center gap-2 rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-400 disabled:cursor-not-allowed"
          >
            <GoogleIcon fontSize="small" />
            Continue with Google
          </button>

          {/* Register link */}
          <p className="mt-8 max-w-full text-center text-sm text-gray-300 sm:mt-10">
=======
          {error ? (
            <p className="text-red-500 font-medium h-5 my-4" role="alert">
              {error}
            </p>
          ) : (
            <div className="h-5 w-5 my-4" />
          )}

          <div className="flex flex-row items-center ">
            <div className="w-35 h-px bg-white" />
            <p className="mx-2 text-sm">Or</p>
            <div className="w-35 h-px bg-white" />
          </div>

          <button className="flex flex-row items-center mt-4 border border-gray-300 p-2 rounded-md text-sm gap-1 cursor-not-allowed text-gray-500">
            <GoogleIcon className="scale-95" />
            <p>Continue with Google </p>
          </button>

          <p className="text-sm text-gray-300 mt-10">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-white underline underline-offset-2 hover:text-green-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Decorative image */}
        <div className="hidden min-w-0 sm:block sm:w-1/2">
          <img
            src={LoginImg}
            alt="DealMap login illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
