import { laboratory } from "@/configs/LanfingPageConfigs/labpage";

export default function LabHeader() {
  return (
    <section className="bg-gradient-to-r from-[#DCA819] via-[#cebb69] to-[#ffffff] h-full">
      <div className="h-[52vh] bg-[#810101]">
        <div
          className="h-[50vh] w-full bg-cover bg-no-repeat bg-center bg-fixed"
          style={{ backgroundImage: `url(${laboratory.bgimg})` }}
        >
          <div className="bg-[#810101] bg-opacity-50 flex items-center justify-start h-full">
            <h1 className="px-20 font-serif font-extrabold flex flex-col">
              <span className="text-white text-5xl md:text-6xl">
                {laboratory.labtitle1}
              </span>
              <span className="text-white text-5xl md:text-6xl">
                {laboratory.labtitle2}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
