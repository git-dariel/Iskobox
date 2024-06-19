import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { CertData } from "@/configs/LanfingPageConfigs/certificate.data";

export default function CertHeader() {
  return (
 
    <section
      className="min-h-[17rem] select-none bg-cover bg-no-repeat bg-center shadow-xl flex justify-center items-center"
      style={{ backgroundImage: `url(${bgHeader.bgbanner})` }}
    >
      <div className=" w-full h-full flex items-center">
        <h1 className=" flex flex-col items-start px-20 md:px-32 lg:px-40 md:gap-3 xl:gap-6">
          <div className="flex gap-4">
            <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem]  font-bebas-neue ">
            {CertData.span1}
            </span>
            <span className="text-[#3d6969] text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
            {CertData.span2}
            </span>
          </div>
          <span className="text-white text-4xl md:text-[4rem] xl:text-[5rem] font-bebas-neue">
          {CertData.span3}
          </span>
        </h1>
      </div>
    </section>

  );
}
