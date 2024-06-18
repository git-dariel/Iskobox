import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { data } from "@/configs/LanfingPageConfigs/facilitiespage";


export default function FacilitiesContent() {
    return(
        <>
        <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]  w-full ">
        <div className=" w-full flex flex-col  justify-center  ">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
          >
            <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
            <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl text-[#dca819]">
                {data.title}
              </h2>
            </header>
          </div>
          <div className="px-20 lg:px-40 py-10">
            <div
              className="relative   "
              style={{ paddingTop: "56.25%" }}
            >
              {/* 16:9 aspect ratio (h/w * 100) */}
              <iframe
                src={data.video}
                className="absolute inset-0 w-full h-full rounded-md shadow-xl"
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