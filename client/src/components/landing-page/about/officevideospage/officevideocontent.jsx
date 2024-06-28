import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { videosfile } from "@/configs/LanfingPageConfigs/officevideopage";

export default function OfficeVideoContent() {
  return (
    <section className="w-full flex flex-col bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]">
      {videosfile.map((item) => (
        <div key={item.id} className="w-full flex flex-col justify-center">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover bg-center shadow-xl"
            style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
          >
            <header className="w-full text-center h-full py-10">
              <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
                {item.title}
              </h2>
            </header>
          </div>

          <div className="px-4 md:px-10 lg:px-40 py-10">
            <div className="relative border border-black " style={{ paddingTop: "56.25%" }}>
              {/* 16:9 aspect ratio (h/w * 100) */}
              <iframe
                src={item.video}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
