import GoogleIcon from "@mui/icons-material/Google";
import LoginImg from "../components/images/loginImg.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, type SubmitEvent } from "react";

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
      navigate("/");
    } catch {
      setError("did not succeed to connect with the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-green-950">
      <div className="flex flex-row justify-between w-220 h-130 rounded-xl">
        {/* form  */}
        <div className="flex flex-col justify-start items-center bg-gray-900 w-1/2 rounded-l-xl text-white border border-white">
          <h1 className="text-xl font-semibold mt-8">Welcome back</h1>
          <p className="text-base text-gray-300 mt-2">
            Login to your DealMap account
          </p>

          <form className="flex flex-col mt-6" onSubmit={login}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="login"
              placeholder="username@example.com"
              className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
              required
            />
            <div className="flex flex-row mt-5 justify-between">
              <label htmlFor="password">Password</label>
              <p className="text-sm text-gray-400 hover:underline hover:text-white transition-all cursor-pointer">
                Forgot your password?
              </p>
            </div>
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
              className="bg-white text-black mt-5 p-1 rounded-md hover:bg-gray-300 cursor-pointer transition-all font-medium"
            >
              {loading ? "Submitting an application" : "Submit"}
            </button>
          </form>

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
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white underline cursor-pointer"
              // onClick={() => setAction("register")}
            >
              Sing up
            </Link>
          </p>
        </div>

        {/* image */}
        <div className="w-1/2">
          <img
            src={LoginImg}
            alt="background image for auth page"
            className="h-full w-full rounded-r-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
