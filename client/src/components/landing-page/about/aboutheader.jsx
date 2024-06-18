import { about } from "@/configs/LanfingPageConfigs/aboutpage";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import "@fontsource/bebas-neue";

export default function AboutHeader() {
  return (
    <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]   ">
      <section
        className="min-h-[17rem] select-none bg-cover bg-no-repeat bg-center shadow-xl flex justify-center items-center"
        style={{ backgroundImage: `url(${bgHeader.bgbanner})` }}
      >
        <div className=" w-full h-full flex items-center">
          <h1 className=" flex flex-col items-start px-20 md:px-32 lg:px-40 md:gap-3 xl:gap-6">
            
              <span className="text-[#3d6969] text-4xl md:text-[4rem] xl:text-[5rem]  font-bebas-neue ">
                {about.span1}
              </span>
              <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
                {about.span2}
              </span>
            
          </h1>
        </div>
      </section>

      <div className="h-full lg:h-[50vh] md:h-[50vh] ">
        <p className="flex flex-col items-center justify-center gap-5 px-10 py-10 lg:px-32  lg:py-0 text-justify h-full font-mono font-normal ">
          <span className="text-md lg:text-md">{about.span3}</span>
          <span className="text-md lg:text-md">{about.span4}</span>
        </p>
      </div>
    </section>
  );
}
