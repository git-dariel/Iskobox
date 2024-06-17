import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { CertData } from "@/configs/LanfingPageConfigs/certificate.data";

export default function CertHeader() {
  return (
    <section className=" w-full">
    <div className="relative h-[53vh] bg-[#810101]">
      <div
        className="h-[52vh] w-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgHeader.bgbanner})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center px-5 lg:px-20">
          <h1 className="font-serif font-extrabold text-[#ffffff] text-3xl md:text-6xl text-center lg:text-left flex flex-col lg:flex-row gap-2">
            <span>{CertData.span1}</span>
            <span className="text-[#6b9493] text-xl md:text-4xl lg:pt-5">{CertData.span2}</span>
            <span>{CertData.span3}</span>
          </h1>
        </div>
      </div>
    </div>
  </section>
  
  );
}
