import React from "react";
import { HomeData } from "@/configs/LanfingPageConfigs/homepage.data";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";

export default function HomeContent() {
  return (
    <>
    <section>
      <div className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]  select-none h-full w-full">
        <div className="flex flex-col items-center">
          {/* Welcome Section */}
          <div className="flex items-center justify-center px-10 py-10 h-auto lg:h-[100vh] md:h-[80vh] hover:animate-bounce">
            <div className="lg:w-[1000px] lg:h-auto">
              <img src={HomeData.welcome} alt="Welcome Image" />
            </div>
          </div>

          {/* Message from Director Section */}
          <div className="w-full h-full flex flex-col items-center ">
            <div
              className=" w-full text-center select-none bg-cover bg-no-repeat bg-center shadow-xl"
              style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
            >
              <div className="">
                <h1 className="text-[#dca819] text-2xl font-extrabold md:text-3xl lg:text-4xl px-10 py-10 flex flex-col ">
                  {HomeData.title3}
                </h1>
              </div>
            </div>

            <div className="w-full md:h-auto flex flex-col gap-8 lg:gap-0 lg:flex-row py-10">
              <div className="flex flex-col items-center gap-4 w-full lg:w-[40%] h-full">
                <div className="flex justify-center">
                  <img src={HomeData.director} alt="Director" className="" />
                </div>
                <div className="text-[#810101] flex justify-center items-center flex-col font-bold text-md ">
                  <span className="text-md">{HomeData.name}</span>
                  <span className="text-sm">{HomeData.position}</span>
                </div>
              </div>
              <div className="w-full h-full text-justify text-[#810101] px-10  lg:pr-10  lg:w-[60%]">
                <div>
                  <p>{HomeData.paragraph1}</p>
                  <br />
                  <p>{HomeData.paragraph2}</p>
                  <br />
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
