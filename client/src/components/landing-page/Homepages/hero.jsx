import React from "react";
import { Link } from "react-router-dom";
import '../../../index.css';

export default function Hero() {
  return (
    <>
      <section className="bg-[#810101] select-none">
        <div className="border-2 mx-auto  px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="flex flex-col gap-10 mx-auto max-w-3xl text-center items-center">
            <h1 className=" text-[#ffffff]  text-3xl font-extrabold  sm:text-5xl lg:text-6xl lg:w-[1010px]">
              POLYTECHNIC UNIVERSITY OF THE PHILIPPINES
            </h1>

            <h1 className="text-[#ffffff] text-3xl font-extrabold  sm:text-5xl lg:w-[500px] lg:text-6xl border-b md:w-[400px] ">
              LOPEZ BRANCH
            </h1>
          </div>
        </div>
      </section> 
    </>
  );
}


