import React from "react";
import img8 from "../../../assets/homeAssets/img8.png";
import PUPlogo from "../../../assets/PUPlogo.png";

export default function Footer() {
  return (
    <div
      className="text-center bg-[#810101] select-none bg-cover bg-no-repeat bg-center shadow-xl"
      style={{ backgroundImage: `url(${img8})` }}
    >
      <div className="bg-[#810101] bg-opacity-50 text-left flex flex-row justify-start items-center px-10">
        <div className="w-[60px] h-[60px] md:w-[60px] md:h-[60px] sm:w-[60px] sm:h-[60px]">
          <img src={PUPlogo} alt="" />
        </div>
        <h3 className="text-[#ffffff] text-sm font-regular sm:text-sm md:text-lg lg:text-2xl px-10 py-5 flex flex-col ">
          <span>Polytechnic University of the Philippines - Lopez Branch </span>
          <span> © All Rights Reserved 2024</span>
        </h3>
      </div>
    </div>
  );
}
