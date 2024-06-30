import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { data } from "@/configs/LanfingPageConfigs/facilitiespage";

export default function FacilitiesHeader() {
  return (
    <section
      className="min-h-[17rem] select-none bg-cover bg-no-repeat bg-center shadow-xl flex justify-center items-center"
      style={{ backgroundImage: `url(${bgHeader.bgbanner})` }}
    >
      <div className="w-full h-full flex items-center">
        <h1 className="flex flex-col items-start px-5 md:px-32 md:gap-3 xl:gap-6">
          <div className="flex gap-2 md:gap-4">
            <span className="text-white text-2xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
              {data.building}
            </span>
            <span className="text-[#3d6969] text-2xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
              {data.and}
            </span>
            <span className="text-white text-2xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
              {data.facilities}
            </span>
          </div>
        </h1>
      </div>
    </section>
  );
}
