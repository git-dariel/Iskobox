import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { missionvision } from "@/configs/LanfingPageConfigs/mvpage";


export default function MVHeader() {
  return (
    <section className=" h-full  border-b-8 border-[#810101] ">
       <header className="font-bebas-neue">
        <div
          className=" w-full text-center select-none bg-cover bg-no-repeat bg-center shadow-xl "
          style={{ backgroundImage: `url(${bgHeader.bgbanner})` }}
        >
          <div className=" py-32">
            <h1 className="px-20 font-extrabold flex flex-col items-start xl:px-40 gap-4">
             <div className="flex gap-5">
              <span className="text-[#ffffff] text-3xl md:text-4xl lg:text-5xl xl:text-5xl">
                {missionvision.mission}
              </span>
              
              <span className="text-[#3d6969] text-3xl md:text-4xl lg:text-5xl xl:text-5xl">
                {missionvision.and}
              </span>
              </div>
              
              <span className="text-[#ffffff] text-3xl md:text-4xl lg:text-5xl xl:text-5xl">
                {missionvision.vission}
              </span>
            </h1>
          </div>
        </div>
      </header>
    </section>
  );
}
