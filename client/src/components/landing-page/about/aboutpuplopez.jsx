import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { about } from "../../../configs/LanfingPageConfigs/aboutpage";

export default function AboutPUPLopez() {
  return (
    <section className=" h-full w-full flex flex-col">
      {/* Title Section */}

      <div
        className="w-full text-center select-none bg-no-repeat  shadow-xl border border-black"
        style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
      >
        <header className="border border-black w-full flex flex-col items-center justify-center py-10 ">
          <h2 className="font-bold text-lg md:text-3xl lg:text-4xl">
            {about.span5}
          </h2>
          <h2 className="font-bold text-lg md:text-3xl lg:text-4xl">
            {about.span6}
          </h2>
        </header>
      </div>

      {/* Video Section */}
      <div className=" h-full px-20 py-20 flex justify-center">
        <div className=" h-full w-full max-w-screen-lg">
          <video
            src={about.video1}
            className="w-full h-full object-contain"
            controls
            autoPlay
            loop
            muted
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></video>
        </div>
      </div>
    </section>
  );
}
