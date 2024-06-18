import React from "react";
import "../../../index.css";
import { HomeData } from "@/configs/LanfingPageConfigs/homepage.data";

export default function Hero() {
  return (
    <>
      <section className="bg-[#810101] select-none w-full h-screen">
        <div className="w-full h-full flex justify-center items-center border">
          <div className="flex flex-col gap-10 mx-auto text-center justify-center items-center max-w-3xl borde">
            <h1 className="text-[#ffffff]  text-4xl font-extrabold ">
              <span>{HomeData.pupname1}</span>
              <br />
              <span>{HomeData.pupname2}</span>
              <br />
              <span>{HomeData.pupname3}</span>
            </h1>

            <h2 className="text-[#ffffff] text-4xl font-extrabold  border-b-4 border-[#ffffff] ">
              {HomeData.pupbranch}
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
