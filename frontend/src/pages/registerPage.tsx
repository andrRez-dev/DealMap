import RegisterImg from "../components/images/registerImg.png";
import { Link } from "react-router-dom";

export default function Register() {
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
            <Link to="/login" className="text-white underline cursor-pointer">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
