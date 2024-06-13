import React from "react";
import { HomeData } from "@/configs/LanfingPageConfigs/homepage.data";

export default function HomeContent() {
  return (
    <>
      <div className="bg-gradient-to-r from-[#DCA819] via-[#cebb69] to-[#ffffff] select-none h-auto ">
        <div
          className="flex flex-col  lg:flex lg:items-center md:items-center sm:items-center 

        "
        >
          {/* welcome */}
          <div className="flex items-center  h-auto justify-center  px-10 py-10 lg:h-[100vh] md:h-[80vh]">
            <div className=" lg:w-[1000px] lg:h-auto">
              <img src={HomeData.welcome} alt="My Image Description " />
            </div>
          </div>

          {/* pillar */}
          {/* <div className="  w-full flex flex-col items-center lg:h-[100vh] md:h-[80vh] ">
            <div
              className="w-full text-center select-none bg-cover bg-no-repeat bg-center shadow-xl"
              style={{ backgroundImage: `url(${HomeData.BgImg})` }}
            >
              <div className="bg-[#810101] bg-opacity-50  px-10">
                <h1 className="text-[#dca819] text-2xl font-extrabold sm:text-2xl md:text-2xl lg:text-4xl px-10 py-10 flex flex-col ">
                  {HomeData.title1}
                </h1>
              </div>
            </div>
            <div className="flex justify-center h-full items-center">
              <div className="w-full h-auto border ">
                <video
                  src={HomeData.Pillar}
                  width="100%"
                  height="auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  controls
                />
              </div>
            </div>
          </div> */}

          {/* about PUP */}
          {/* <div className=" w-full flex flex-col items-center lg:h-[100vh] md:h-[80vh] ">
            <div
              className="w-full text-center  select-none bg-cover bg-no-repeat bg-center shadow-xl"
              style={{ backgroundImage: `url(${HomeData.BgImg})` }}
            >
              <div className="bg-[#810101] bg-opacity-50  px-10">
                <h1 className="text-[#dca819] text-2xl font-extrabold sm:text-2xl md:text-32xl lg:text-4xl px-10 py-10 flex flex-col ">
                  {HomeData.title2}
                </h1>
              </div>
            </div>
            <div className="flex justify-center h-full items-center">
              <div className="w-full h-auto border ">
                <video
                  src={HomeData.PUPLopez}
                  width="100%"
                  height="auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  controls
                />
              </div>
            </div>
          </div> */}

          {/* message from director */}
          <div className="  w-full flex flex-col items-center ">
            <div className="flex items-center  ">
              <h1 className=" text-[#810101] text-2xl font-extrabold sm:text-2xl md:text-32xl lg:text-4xl px-10 py-10 ">
                {HomeData.title3}
              </h1>
            </div>

            <div className="w-full md:h-auto flex flex-col items-center gap-10 lg:flex-row">
              <div className=" flex flex-col gap-2  ">
                <div className="flex justify-center bord">
                  <img src={HomeData.director} className=" lg:ml-10 border" />
                </div>
                <div className="text-[#810101] lg:pl-20  lg:pb-16 flex justify-center items-center flex-col font-bold text-md ">
                  <span className="text-md">{HomeData.name}</span>
                  <span className="text-sm"> {HomeData.position}</span>
                </div>
              </div>
              <div className="w-[70%] text-justify text-[#810101] pb-10 lg:pb-10 lg:pr-10">
                <div>
                  <p>{HomeData.paragraph1}</p>
                  <br />

                  <p>{HomeData.paragraph2}</p>
                  <br />

                  <p className="flex flex-col text-end">
                    <span>{HomeData.span1}</span>
                    <span> {HomeData.span2}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

       
        </div>
      </div>
    </>
  );
}
