import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/LOGO.png";
import { loginUser } from "@/services/user-service";
import { useAuth } from "@/helpers/auth.context";
import { AiOutlineMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      toast("Please fill in all fields", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    try {
      await loginUser(email, password);
    } catch (error) {
      toast("Invalid Input", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="w-screen h-full bg-white p-0 m-0 select-none">
      {/* MainBox */}
      <div className="flex justify-end ">
        {/* Line */}
        <div className="border max-h-full mb-10 mt-10 border-gray-600 inline-block "></div>
        {/* form size and position */}
        <div className=" flex items-center w-1/3 h-screen bg-white justify-center">
          {/* FOrm */}
          <div className=" bg-white ">
            {/* SignInBox */}
            <div className="w-full">
              {/* form */}
              <div className="flex  md:gap-4 flex-col items-left ">
                {/* logo */}
                <img
                  src={Logo}
                  draggable="false"
                  className="no-select w-52 h-9 mb-4"
                />

                {/* email */}
                <div className="flex bg-white w-72 items-center border-2 border-gray-700">
                  <AiOutlineMail className="text-gray-700 m-2" />
                  <input
                    type="text"
                    name="email"
                    placeholder="EMAIL"
                    onChange={(e) => setEmail(e.target.value)}
                    className=" bg-transparent text-sm flex placeholder-gray-700 text-gray-700 focus:border-none focus:outline-none"
                  />
                </div>

                {/* password */}
                <div className="flex bg-white w-72  items-center border-2 border-gray-700">
                  <FaLock className="text- m-2 text-gray-700" />
                  <input
                    type="password"
                    name="password"
                    placeholder="PASSWORD"
                    onChange={(e) => setPassword(e.target.value)}
                    className=" bg-transparent text-sm flex placeholder-gray-700 text-gray-700 focus:border-none focus:outline-none"
                  />
                </div>

                {/* SignIn Button */}
                <div className=" cursor-pointer w-72 text-center rounded-xl bg-amber-500 text-white mt-4 shadow-md shadow-gray-400">
                  <button
                    variant={"default"}
                    onClick={handleSignIn}
                    className=" px-12 py-2 inline-block font-semibold"
                  >
                    SIGN IN
                  </button>
                </div>

                <div className="flex justify-end">
                  <a href="#" className=" text-gray-700 mb-2">
                    Forgot Password
                  </a>
                </div>
                <div>
                  <p className="">Don't have an</p>
                  <div className="flex flex-row md:gap-1">
                    <p className=""> account ?</p>
                    <Link to="/signup">
                      <button className="text-indigo-500 border-b border-indigo-500">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
}
