import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { laboratory } from "@/configs/LanfingPageConfigs/labpage";

export default function LabHeader() {
  return ( 
    <section
      className="min-h-[17rem] select-none bg-cover bg-no-repeat bg-center shadow-xl flex justify-center items-center"
      style={{ backgroundImage: `url(${bgHeader.bgbanner})` }}
    >
      <div className=" w-full h-full flex items-center">
        <h1 className=" flex flex-col items-start px-20 md:px-32 lg:px-40 md:gap-3 xl:gap-6">
          <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem]  font-bebas-neue ">
            {laboratory.labtitle1}
          </span>
          <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
            {laboratory.labtitle2}
          </span>
        </h1>
      </div>
    </section> 
  );
}
