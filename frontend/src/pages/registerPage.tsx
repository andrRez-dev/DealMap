
import { useState, type SubmitEvent } from "react";
import RegisterImg from "../components/images/registerImg.png";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;
  const token = import.meta.env.VITE_FRONTEND_TOKEN;

  async function register(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!api || !token) {
      setError("error with the api url or token");
      return;
    }

    const form = new FormData(event.currentTarget);

    const body = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
    };

    setLoading(true);

    try {
      const response = await fetch(`${api}/api/user`, {
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
        setError(data.message || "Error with registration");
        return;
      }

      localStorage.setItem("client_token", data.client_token);
      navigate("/main");
    } catch {
      setError("Did not succeed to connect with the server");
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

      {/* Registration card */}
      <div className="flex w-full min-w-0 max-w-[880px] overflow-hidden rounded-xl shadow-2xl">
        {/* Decorative image */}
        <div className="hidden min-w-0 sm:block sm:w-1/2">
          <img
            src={RegisterImg}
            alt="DealMap registration illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Registration form */}
        <div className="flex w-full min-w-0 flex-col items-center border border-white bg-gray-900 px-4 py-8 text-white sm:w-1/2 sm:px-6 sm:py-10 lg:px-8">
          <h1 className="mt-2 text-center text-xl font-semibold sm:mt-4 sm:text-2xl">
            Create an account
          </h1>

          <p className="mt-2 text-center text-sm text-gray-300 sm:text-base">
            Enter your information below
          </p>

          <form
            className="mt-7 flex w-full min-w-0 max-w-[320px] flex-col sm:mt-9"
            onSubmit={register}
          >
            {/* Full name */}
            <label
              htmlFor="fullname"
              className="text-sm font-medium"
            >
              Full Name
            </label>

            <input
              type="text"
              id="fullname"
              name="name"
              placeholder="Name Surname"
<<<<<<< HEAD
              autoComplete="name"
              className="mt-1 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
=======
              className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              required
            />

            {/* Email */}
            <label
              htmlFor="email"
              className="mt-4 text-sm font-medium"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="username@example.com"
<<<<<<< HEAD
              autoComplete="email"
              className="mt-1 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
=======
              className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              required
            />

            {/* Password */}
            <label
              htmlFor="password"
              className="mt-4 text-sm font-medium"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="**********"
<<<<<<< HEAD
              autoComplete="new-password"
              className="mt-1 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
=======
              className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
              required
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 min-h-11 w-full cursor-pointer rounded-md bg-white px-4 py-2.5 font-medium text-gray-900 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating an account..." : "Create account"}
            </button>
          </form>

<<<<<<< HEAD
          {/* Error message */}
          <div
            className="mt-4 w-full min-w-0 max-w-[320px]"
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

          {/* Login link */}
          <p className="mt-8 max-w-full text-center text-sm text-gray-300 sm:mt-10">
=======
          {error ? (
            <p className="h-5 text-red-500 font-medium mt-4 w-90" role="alert">
              {error}
            </p>
          ) : (
            <div className="h-5 w-5 mt-4" />
          )}

          <p className="text-sm text-gray-300 mt-14">
>>>>>>> 566d474c9031e314b552850f413e2179164e84f1
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-white underline underline-offset-2 hover:text-green-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
