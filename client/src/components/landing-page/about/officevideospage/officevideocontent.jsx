import ReactPlayer from "react-player";
import { offices } from "@/configs/LanfingPageConfigs/officevideopage";

export default function OfficeVideoContent() {
  return (
    <>
      <section className="h-full w-full flex flex-col">
        {/* Admission Office Section */}
        <div className="w-full flex flex-col justify-center py-5">
          <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
            <h2 className="font-bold text-xl md:text-4xl lg:text-5xl">
              {offices.Admission}
            </h2>
          </header>
          <div className="px-20 xl:px-40 ">
            <div className="relative  border border-black" style={{ paddingTop: "56.25%" }}>
              {/* 16:9 aspect ratio (h/w * 100) */}
              <iframe
                src={offices.video1}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Registrar Office Section */}
        <div className="w-full flex flex-col justify-center py-5">
          <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
            <h2 className="font-bold text-xl md:text-4xl lg:text-5xl">
              {offices.registrar}
            </h2>
          </header>
          <div className="px-20 py-10 xl:px-40">
            <div className="relative " style={{ paddingTop: "56.25%" }}>
              {/* 16:9 aspect ratio (h/w * 100) */}
              <iframe
                src={offices.video2}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* fundmanagement */}
        <div className="w-full flex flex-col justify-center py-5">
          <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
            <h2 className="font-bold text-xl md:text-4xl lg:text-5xl">
              {offices.fundmanagement}
            </h2>
          </header>
          <div className="px-20 py-10 xl:px-40">
            <div className="relative " style={{ paddingTop: "56.25%" }}>
              {/* 16:9 aspect ratio (h/w * 100) */}
              <iframe
                src={offices.video3}
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
