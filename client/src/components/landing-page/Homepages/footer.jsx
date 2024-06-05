import React from "react";

import img8 from "../../../assets/homeAssets/img8.png";

export default function Footer() {
  return (
    <div
      className="text-center bg-[#810101] select-none bg-cover bg-no-repeat bg-center shadow-xl border"
      style={{ backgroundImage: `url(${img8})` }}
    >
      <h3 className="text-[#ffffff] text-3xl font-extrabold  sm:text-3xl px-10 py-10 flex flex-col">
        <span> All Rights Reserved 2022</span>
        <span>Polytechnic University of the Philippines - Lopez Branch </span>
      </h3>
    </div>
  );
}
