import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { history } from "@/configs/LanfingPageConfigs/historypage";


export default function HistoryHeader() {
  return (
    <section className=" h-full  border-b-8 border-[#810101] ">
       <header className="font-bebas-neue">
        <div
          className=" w-full text-center select-none bg-cover bg-no-repeat bg-center shadow-xl "
          style={{ backgroundImage: `url(${bgHeader.bgbanner})` }}
        >
          <div className=" py-32">
            <h1 className="px-20 font-extrabold flex flex-col items-start xl:px-40 ">
            
              <span className="text-[#ffffff] text-3xl md:text-4xl lg:text-5xl xl:text-5xl">
                {history.historytitle}
              </span>
            </h1>
          </div>
        </div>
      </header>
    </section>
  );
}
