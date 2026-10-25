import { useState, type SubmitEvent } from "react";
import RegisterImg from "../components/images/registerImg.png";
import { Link, useNavigate } from "react-router-dom";

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
      navigate("/");
    } catch {
      setError("Did not succeed to connect with the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-green-950">
      <div className="flex flex-row justify-between w-220 h-130 rounded-xl">
        {/* image */}
        <div className="w-1/2">
          <img
            src={RegisterImg}
            alt="background image for auth page"
            className="h-full w-full rounded-l-xl object-cover"
          />
        </div>

        {/* form */}
        <div className="flex flex-col justify-start items-center bg-gray-900 w-1/2 rounded-r-xl text-white border border-white">
          <h1 className="text-xl font-semibold mt-8">Create an account</h1>
          <p className="text-base text-gray-300 mt-2">
            Enter your information below
          </p>

          <form className="flex flex-col mt-9" onSubmit={register}>
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="name"
              placeholder="Name Surname"
              className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
              required
            />

            <label htmlFor="email" className="mt-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="username@example.com"
              className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
              required
            />

            <label htmlFor="password" className="mt-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="**********"
              className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black mt-5 p-1 rounded-md hover:bg-gray-300 cursor-pointer transition-all font-medium"
            >
              {loading ? "Creating an account" : "Create"}
            </button>
          </form>

          {error ? (
            <p className="h-5 text-red-500 font-medium mt-4 w-90" role="alert">
              {error}
            </p>
          ) : (
            <div className="h-5 w-5 mt-4" />
          )}

          <p className="text-sm text-gray-300 mt-14">
            Already have an account?{" "}
            <Link to="/login" className="text-white underline cursor-pointer">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
