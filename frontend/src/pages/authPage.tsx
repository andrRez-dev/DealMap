import GoogleIcon from "@mui/icons-material/Google";
import LoginImg from "../components/images/loginImg.png";
import RegisterImg from "../components/images/registerImg.png";
import { useState } from "react";

export default function AuthPage() {
  const [action, setAction] = useState("login");

  return (
    <div className="flex items-center justify-center w-full h-full bg-green-950">
      {action === "login" ? (
        // LOGIN part
        <div className="flex flex-row justify-between w-220 h-130 rounded-xl">
          {/* form  */}
          <div className="flex flex-col justify-start items-center bg-gray-900 w-1/2 rounded-l-xl text-white border border-white">
            <h1 className="text-xl font-semibold mt-8">Welcome back</h1>
            <p className="text-base text-gray-300 mt-2">
              Login to your DealMap account
            </p>

            <form className="flex flex-col mt-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="username@example.com"
                className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
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
              />
              <button
                type="submit"
                className="bg-white text-black mt-5 p-1 rounded-md hover:bg-gray-300 cursor-pointer transition-all font-medium"
              >
                Submit
              </button>
            </form>

            <div className="flex flex-row items-center my-7">
              <div className="w-35 h-px bg-white" />
              <p className="mx-2 text-sm">Or</p>
              <div className="w-35 h-px bg-white" />
            </div>

            <button className="flex flex-row items-center border border-gray-300 p-2 rounded-md text-sm gap-1 hover:bg-white hover:text-black transition-all">
              <GoogleIcon className="scale-95" />
              <p>Continue with Google </p>
            </button>

            <p className="text-sm text-gray-300 mt-12">
              Don't have an account?{" "}
              <span
                className="text-white underline cursor-pointer"
                onClick={() => setAction("register")}
              >
                Sing up
              </span>
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
      ) : (
        // REGISTER part
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

            <form className="flex flex-col mt-9">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullnam"
                placeholder="Name Surname"
                className="border border-gray-300 p-1 px-2 w-80 rounded-md mt-1"
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
              />
              <button
                type="submit"
                className="bg-white text-black mt-5 p-1 rounded-md hover:bg-gray-300 cursor-pointer transition-all font-medium"
              >
                Create
              </button>
            </form>

            <p className="text-sm text-gray-300 mt-22">
              Already have an account?{" "}
              <span
                className="text-white underline cursor-pointer"
                onClick={() => setAction("login")}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
