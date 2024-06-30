import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { BD, HAP, LHSP, history, paragraphs } from "@/configs/LanfingPageConfigs/historypage";

export default function HistoryContent() {
  return (
    <section className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] w-full">
      <article className="md:px-20 md:py-10 p-10">
        <div className="text-justify flex flex-col gap-8">
          {paragraphs.map((item) => (
            <div key={item.id}>
              <p className="text-base md:text-lg">{item.paragraph}</p>
            </div>
          ))}
        </div>
      </article>

      {/* Past Campus Officials */}
      <div className=" w-full flex flex-col justify-center">
        {/* title */}
        <div
          className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
          style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
        >
          <header className=" text-[#3d6969] w-full flex items-center justify-center py-10 ">
            <h2 className="font-bold text-lg md:text-3xl">{history.PCOtitle}</h2>
          </header>
        </div>

        <article className="w-full flex flex-col justify-center md:py-10 md:px-20 md:gap-5 p-6">
          {/* notes */}
          <p className="text-base md:text-xl">{history.paragraph1}</p>
          {/* LHSP */}
          <div className="flex flex-col xl:flex-row gap-5 ">
            <div className="basis-1/2 ">
              <p className="text-lg px-5 py-5 font-bold">{history.paragraph2}</p>
              <div className="md:text-justify flex flex-col px-5 md:pb-10">
                {LHSP.map((item) => (
                  <div key={item.id}>
                    <p className="text-base">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* HAP */}
            <div className="basis-1/2">
              <p className="text-lg px-5 py-5 font-bold  ">{history.paragraph3}</p>
              <div className="md:text-justify flex flex-col px-5 md:pb-10">
                {HAP.map((item) => (
                  <div key={item.id}>
                    <p className="text-md">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BD */}
            <div className=" basis-1/2 ">
              <p className="text-lg px-5 py-5 font-bold">{history.paragraph4}</p>
              <div className="md:text-justify flex flex-col px-5 pb-10">
                {BD.map((item) => (
                  <div key={item.id}>
                    <p className="text-md">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-base md:text-xl">{history.paragraph5}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
