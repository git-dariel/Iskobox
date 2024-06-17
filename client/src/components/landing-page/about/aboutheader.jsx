import { about } from "@/configs/LanfingPageConfigs/aboutpage";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import "@fontsource/bebas-neue";

export default function AboutHeader() {
  return (
    <section className="bg-gradient-to-r from-[#DCA819] via-[#cebb69] to-[#ffffff] w-full  h-full">
      <header className="font-bebas-neue">
        <div
          className=" w-full text-center select-none bg-cover bg-no-repeat bg-center shadow-xl"
          style={{ backgroundImage: `url(${bgHeader.bgbanner})` }}
        >
          <div className=" py-32">
            <h1 className="px-20 font-extrabold flex flex-col items-start xl:px-40 ">
              <span className="text-[#6b9493] text-3xl md:text-4xl lg:text-5xl xl:text-5xl ">
                {about.span1}
              </span>
              <span className="text-[#ffffff] text-3xl md:text-4xl lg:text-5xl xl:text-5xl">
                {about.span2}
              </span>
            </h1>
          </div>
        </div>
      </header>

       {/* <div className="relative h-[53vh] bg-[#810101]">
        <div
          className="h-full w-full bg-contain bg-no-repeat border bg-seal  bg-fixed "
          style={{ backgroundImage: `url(${bgHeader.bgbanner})`,}}
        >
          <div className="absolute inset-0 flex items-center justify-center px-5 lg:px-20 ">
            <h1 className="px-20 font-serif font-extrabold flex flex-col ">
              <span className="text-[#6b9493] text-xl md:text-4xl lg:text-6xl ">
                {about.span1}
              </span>
              <span className="text-[#ffffff] text-3xl md:text-6xl">
                {about.span2}
              </span>
            </h1>
          </div> 
        </div>
      </div> */}

       
      <div className="bg-gradient-to-r from-[#DCA819] via-[#cebb69] to-[#ffffff] h-full lg:h-[50vh] md:h-[50vh] ">
        <p className="flex flex-col items-center justify-center gap-5 px-10 py-10 lg:px-32  lg:py-0 text-justify h-full font-mono font-normal ">
          <span className="text-md lg:text-md">{about.span3}</span>
          <span className="text-md lg:text-md">{about.span4}</span>
        </p>
      </div> 
    </section>
  );
}
