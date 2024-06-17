import { history } from "@/configs/LanfingPageConfigs/historypage";


export default function HistoryHeader() {
  return (
    <section className="bg-gradient-to-r from-[#DCA819] via-[#cebb69] to-[#ffffff] h-full  ">
      <div className="h-[50vh] bg-[#810101] ">
        <div
          className="h-[48vh] w-full bg-cover bg-no-repeat bg-center bg-seal bg-fixed"
          style={{ backgroundImage: `url(${history.bgimg})` }}
        >
          <div className="bg-[#810101] bg-opacity-50 flex items-center justify-start h-full">
            <h1 className="px-20 font-serif font-extrabold flex flex-col ">
            
              <span className="text-[#ffffff] text-5xl md:text-6xl">
                {history.historytitle}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
