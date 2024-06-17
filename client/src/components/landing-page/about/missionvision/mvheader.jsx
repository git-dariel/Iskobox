import { about } from "@/configs/LanfingPageConfigs/aboutpage";

export default function MVHeader() {
  return (
    <section className="bg-gradient-to-r from-[#DCA819] via-[#cebb69] to-[#ffffff] h-full  ">
      <div className="h-[50vh] bg-[#810101] ">
        <div
          className="h-[48vh] w-full bg-cover bg-no-repeat bg-center bg-seal bg-fixed"
          style={{ backgroundImage: `url(${about.img5})` }}
        >
          <div className="bg-[#810101] bg-opacity-50 flex items-center justify-start h-full">
            <h1 className="px-20 font-serif font-extrabold flex flex-col ">
              <div className="flex  gap-2"
>                <span className="text-[#ffffff] text-5xl md:text-6xl">
                  {about.span7}
                </span>
                <span className="text-[#6b9493] text-4xl md:text-5xl pt-2 lg:pt-3 md:pt-3 ">
                  {about.span9}
                </span>
              </div>
              <span className="text-[#ffffff] text-5xl md:text-6xl">
                {about.span8}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
