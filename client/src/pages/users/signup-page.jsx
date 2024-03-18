import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineNumber } from "react-icons/ai";
import { FaLock, FaRegIdCard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../../assets/LOGO.png";
import { registerUser } from "@/services/user-service";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstname === "" || lastname === "" || idNumber === "" || email === "" || password === "") {
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
      const registrationSuccessful = await registerUser(email, password, firstname, lastname, idNumber);
      if (registrationSuccessful) {
        toast("Registration Successful", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setFirstname("");
        setLastname("");
        setIdNumber("");
        setEmail("");
        setPassword("");
      } else {
        toast("User already exists!", {
          icon: "⚠️",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Registration Failed", {
        icon: "❌",
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
      <div className="flex justify-start">
        {/* position*/}
        <div className="flex items-center w-2/4 h-screen bg-white justify-center">
          {/* form*/}
          <div className="  bg-white">
            {/* signup box*/}
            <div className="w-full">
              <div className="flex  md:gap-4 flex-col items-left">
                {/* Logo */}
                <img
                  src={Logo}
                  draggable="false"
                  className="no-select w-52 h-9 mb-4 pointer-events-none"
                />
                {/* Name Section */}
                <div>
                  {/* name label */}
                  <div className="flex flex-row md:gap-2 mb-2">
                    <FaRegIdCard className="text-gray-700 text-xl mt-1 " />
                    <p className="text-gray-700 text-xl">Name</p>
                  </div>
                  {/* first name */}
                  <div className="flex flex-row md:gap-2">
                    <div className="flex bg-white w-60 items-center border-2 border-gray-700">
                      <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className=" p-2 bg-transparent text-sm flex placeholder-gray-700 text-gray-700focus:border-none focus:outline-none"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="flex bg-white w-60 items-center border-2 border-gray-700">
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className=" p-2 bg-transparent text-sm flex placeholder-gray-700 text-gray-700 focus:border-none focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                {/* Information Section */}
                <div>
                  {/* Information Label */}
                  <div className="flex flex-row md:gap-2 mb-2">
                    <FaRegIdCard className="text-gray-700 text-xl mt-1 " />
                    <p className="text-gray-700 text-xl">Information</p>
                  </div>
                  {/* ID Number */}
                  <div className="flex bg-white  items-center border-2 border-gray-700">
                    <AiOutlineNumber className="text-gray-700 m-2" />
                    <input
                      type="text"
                      name="idnumber"
                      placeholder="ID Number"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className=" bg-transparent text-sm flex placeholder-gray-700 text-gray-700focus:border-none focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex bg-white items-center border-2 border-gray-700">
                  <MdEmail className="text-gray-700 m-2" />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" bg-transparent text-sm flex placeholder-gray-700 text-gray-700 focus:border-none focus:outline-none"
                  />
                </div>

                {/* password */}
                <div className="flex bg-white  items-center border-2 border-gray-700">
                  <FaLock className="text-gray-700 m-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" bg-transparent text-sm flex placeholder-gray-700 text-gray-700 focus:border-none focus:outline-none"
                  />
                </div>

                {/* SignUp Button */}
                <p className="text-gray-700 text-xs mt-10 pl-2">
                  By clicking Sign Up, you agree to our Terms, Privacy Policy
                  and Cookies Policy.{" "}
                </p>

                <button
                  variant={"default"}
                  onClick={handleSubmit}
                  className="px-12 py-2 inline-block font-semibold text-center rounded-xl bg-amber-500 text-white shadow-md shadow-gray-400 cursor-pointer"
                >
                  SIGN UP
                </button>

                <div className="flex justify-end md:gap-2">
                  <p className="text-gray-700">Already have an account? </p>
                  <Link to="/">
                    <button className="text-indigo-500 border-b border-indigo-500 ">
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border max-h-full mb-10 mt-10 border-gray-600 inline-block"></div>
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default SignUp;
