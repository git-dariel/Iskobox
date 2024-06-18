import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { laboratory } from "@/configs/LanfingPageConfigs/labpage";

export default function LabContent() {
  return (
    <>
      <section className="h-full w-full flex flex-col bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]">
        <div className=" w-full flex flex-col  justify-center">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
          >
            <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
            <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
                {laboratory.title1}
              </h2>
            </header>
          </div>
          <div className=" h-full px-20 py-10 flex justify-center">
            <div className=" h-full w-full max-w-screen-lg">
              <img
                src={laboratory.labimg}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className=" w-full flex flex-col  justify-center py-5">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
          >
            <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
            <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
                {laboratory.title2}
              </h2>
            </header>
          </div>
          <div className="px-20 lg:px-40 py-10">
            <div
              className="relative  border border-black"
              style={{ paddingTop: "56.25%" }}
            >
              {/* 16:9 aspect ratio (h/w * 100) */}
              <iframe
                src={laboratory.video3}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
