import img5 from "../../../assets/homeAssets/img5.webp";
import { CertData } from "@/configs/LanfingPageConfigs/certificate.data";

export default function CertHeader() {
  return (
    <div className="h-auto">
      <div className="h-[82vh] bg-[#810101]">
        <div
          className="h-[80vh] w-full bg-cover bg-no-repeat bg-center bg-seal bg-fixed"
          style={{ backgroundImage: `url(${img5})` }}
        >
          <div className="bg-[#810101] bg-opacity-50 flex items-center w-full h-full">
            <h1 className="px-20 font-serif font-extrabold flex flex-col lg:flex-row">
              <span className="text-[#ffffff] text-3xl md:text-6xl">{CertData.span1}</span>
              <span className="text-[#6b9493] text-xl md:text-4xl lg:pt-5 ">{CertData.span2}</span>
              <span className="text-[#ffffff] text-3xl md:text-6xl">{CertData.span3}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
