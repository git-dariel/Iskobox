import React, { useState } from "react";
import { FaRegIdCard, FaLock } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === ""
    ) {
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
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Firestore document reference
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        firstname: firstname,
        lastname: lastname,
        email: email,
      });

      //Success Toast
      toast("Registration Successful", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      // Clear input fields after successful registration
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <title>SignIn</title>

      {/* MainBox */}
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {/* FOrm */}
        <div className="bg-black text-yellow-500 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* SignInBox */}
          <div className="w-3/5 p-5">
            <div className="flex text-left font-bold rounded pb-5">
              <div className="border-2 border-yellow-500 text-yellow-500 pl-2 pr-1 rounded-s-md hover:text-black hover:bg-yellow-500">
                Share
              </div>
              <div className="border-2 border-yellow-500 bg-yellow-500 text-black pr-2 rounded-tr-md rounded-br-md">
                Hub
              </div>
            </div>
            {/* Sign In Header */}
            <h2 className="text-3xl font-bold mb-2">
              Sign Up to Create Account
            </h2>
            {/* line */}
            <div className="border-2 w-10 border-yellow-500 inline-block mb-2"></div>
            {/* Paragrahp */}
            <p className="mb-5 px-16 text-center">
              "Sign Up to unlock seamless file-sharing collaboration"
            </p>

            {/* form */}
            <div className="flex flex-col items-center ">
              <div className="rounded flex bg-yellow-500 w-64 p-2  items-center mb-5">
                <FaRegIdCard className="text-black m-2" />
                <input
                  type="text"
                  name="firstname"
                  placeholder="Firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className=" bg-transparent text-sm flex placeholder-black text-black focus:border-none focus:outline-none"
                />
              </div>

              <div className="rounded flex bg-yellow-500 w-64 p-2  items-center mb-5">
                <MdOutlineLocalPhone className="text-black m-2" />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className=" bg-transparent text-sm flex placeholder-black text-black focus:border-none focus:outline-none"
                />
              </div>

              <div className="rounded flex bg-yellow-500 w-64 p-2  items-center mb-5">
                <MdEmail className="text-black m-2" />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" bg-transparent text-sm flex placeholder-black text-black focus:border-none focus:outline-none"
                />
              </div>

              {/* password */}

              <div className="rounded flex bg-yellow-500 w-64 p-2  items-center mb-2">
                <FaLock className="text-black m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" bg-transparent text-sm flex placeholder-black text-black focus:border-none focus:outline-none"
                />
              </div>

              {/* SignUp Button */}
              <button
                variant={"default"}
                onClick={handleSubmit}
                className="border-2 border-yellow-500 text-yellow-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-yellow-500 hover:text-black"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* SignUpBox */}
          <div className="w-2/5 bg-yellow-500 text-black rounded-tr-2xl rounded-br-2xl py-36 px-12">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-2"> Hi! Welcome</h2>
            {/* line */}
            <div className="border-2 w-10 border-black inline-block mb-2"></div>
            {/*  */}
            <p className="mb-10">
              "Seamlessly sign in for swift file sharing, ensuring efficiency
              and collaboration with our streamlined and user-friendly platform.
              Join now!"
            </p>
            <Link to="/signin">
              <button className="border-2 border-black text-black rounded-full px-12 py-2 inline-block font-semibold hover:bg-black hover:text-yellow-500">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default SignUp;
