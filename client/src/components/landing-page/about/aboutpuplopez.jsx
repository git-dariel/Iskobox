import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { about } from "../../../configs/LanfingPageConfigs/aboutpage";

export default function AboutPUPLopez() {
  return (
    <section className=" bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]  h-full w-full flex flex-col ">
      {/* Title Section */}

      <div
        className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
        style={{ backgroundImage: `url(${bgHeader.bgheader0})` }}
      >
        <header className="bg-[#810101] bg-opacity-[40%] text-[#ffffff] w-full flex flex-col items-center justify-center py-10 ">
          <h2 className="font-bold text-lg md:text-3xl lg:text-4xl">
            {about.span5}
          </h2>
          <h2 className="font-bold text-lg md:text-3xl lg:text-4xl">
            {about.span6}
          </h2>
        </header>
      </div>

      {/* Video Section */}
      <div className="px-20 lg:px-40 py-10">
        <div
          className="relative  border border-black"
          style={{ paddingTop: "56.25%" }}
        >
          {/* 16:9 aspect ratio (h/w * 100) */}
          <iframe
            src={about.video1}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
