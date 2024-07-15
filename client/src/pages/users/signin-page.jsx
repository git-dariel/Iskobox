import { useAuth } from "@/helpers/auth.context";
import { loginUser } from "@/services/users/user.service";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import validator from "validator";
import Image from "../../assets/shareehub.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn() {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(currentUser?.role || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.role === role) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleSignIn = async () => {
    if (!email || !password || !role) {
      toast.error("Required all fields");
      return;
    }

    if (!validator.isEmail(email)) {
      toast.warning("Email is invalid");
      return;
    }

    const loginProcess = async () => {
      const userData = await loginUser(email, password);
      if (!userData) {
        throw new Error("Login failed");
      }
      if (userData.role !== role) {
        throw new Error(`Access denied for ${role} role`);
      }
      return userData;
    };

    toast.promise(loginProcess(), {
      loading: "Logging in...",
      success: (data) => {
        navigate("/dashboard");
        return `Login successful as ${data.role}`;
      },
      error: (err) => {
        return err.message;
      },
    });
  };

  return (
    <div className="bg-[#F0F4F9] h-screen flex flex-col justify-center items-center">
      <Toaster richColors />
      <div className=" bg-[#FFFFFF] w-[22rem] h-4/5 md:w-9/12 md:h-96 rounded-3xl md:flex md:justify-between mb-5">
        <div className="px-5 pt-14 md:pt-5">
          <img src={Image} alt="logo" className="w-20 h-20 md:w-28 md:h-auto" />
          <div className="px-5 md:px-15 ">
            <h1 className="text-2xl md:text-4xl md:pb-5 md:pt-0 pb-3 pt-0">Sign in</h1>
            <h1 className="text-sm md:text-base ">Use your PUP-ADMS Account</h1>
          </div>
        </div>

        <div className="flex-col flex items-center pt-5 md:pt-[6rem] md:pr-8">
          <div className="flex-col flex items-center relative w-[18rem] md:w-full  min-w-[200px] h-10 mb-5">
            <input
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-6 rounded-[7px] border-gray-400 focus:border-[#FF7D29] md:w-my-width"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-[#FF7D29] after:border-gray-400 peer-focus:after:!border-[#FF7D29]">
              Email
            </label>
          </div>

          <div className="relative w-[18rem] md:w-full min-w-[200px] h-10 mb-8">
            <input
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-6 rounded-[7px] border-gray-400 focus:border-[#FF7D29] md:w-my-width"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-[#FF7D29] after:border-gray-400 peer-focus:after:!border-[#FF7D29]">
              Password
            </label>
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash size={20} color="gray" />
              ) : (
                <FaEye size={20} color="gray" />
              )}
            </div>
          </div>

          <div className="flex flex-row justify-between mb-5 md:mb-10">
            <div className="border border-slate-300 rounded-full py-2 px-1 w-32 flex items-center mr-2 md:w-40">
              <input
                type="radio"
                name="role"
                value="Admin"
                onChange={(e) => setRole(e.target.value)}
                className="form-radio h-5 w-5 cursor-pointer ml-2"
              />
              <label className="inline-flex items-center cursor-pointer flex-grow justify-center">
                <span className="text-gray-700 font-sm text-sm md:text-base md:font-medium">
                  Admin
                </span>
              </label>
            </div>

            <div className="border border-slate-300 rounded-full py-2 px-1 w-32 flex items-center md:w-40">
              <input
                type="radio"
                name="role"
                value="Faculty"
                onChange={(e) => setRole(e.target.value)}
                className="form-radio h-5 w-5 cursor-pointer ml-2"
              />
              <label className="inline-flex items-center cursor-pointer flex-grow justify-center">
                <span className="text-gray-700 font-sm text-sm md:text-base md:font-medium">
                  Faculty
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center w-full gap-3 md:items-end md:justify-end">
            <Link to="/signup">
              <button className="text-[#DC5F00] font-medium text-[13px] px-6 py-3 rounded-3xl hover:bg-[#eeedeb] transition-all duration-300 cursor-pointer md:px-8 md:py-3 md:text-sm">
                Create account
              </button>
            </Link>
            <button
              onClick={handleSignIn}
              className="bg-[#FF7D29] text-white text-[13px] px-6 py-3 rounded-3xl hover:bg-[#DC5F00] transition-all duration-300 cursor-pointer md:px-8 md:py-3 md:text-sm"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      <div className="text-right bg-slate-200 rounded-md">
        <div className="flex flex-row">
          <Link to="/">
            <p className="text-[13px] hover:bg-slate-200 rounded-md transition-all duration-300 cursor-pointer mx-2 md:text-[14px] p-2 hover:px-4 hover:rounded-lg">
              Visit accreditor portal
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
