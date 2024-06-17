import {
    BD,
    HAP,
  LHSP,
  history,
  paragraphs,
} from "@/configs/LanfingPageConfigs/historypage";

export default function HistoryContent() {
  return (
    <section className="w-full h-full">
      <article className="px-20 py-10">
        <div className="text-justify flex flex-col gap-8">
          {paragraphs.map((item) => (
            <div key={item.id}>
              <p className="text-lg md:text-xl lg:text-2xl">{item.paragraph}</p>
            </div>
          ))}
        </div>
      </article>

      {/* Past Campus Officials */}
      <div className=" w-full flex flex-col  justify-center">
        {/* title */}
        <header className="border w-full text-center h-full py-10">
          <h2 className="font-bold text-xl md:text-4xl lg:text-5xl">
            {history.PCOtitle}
          </h2>
        </header>

        <article className="w-full flex flex-col justify-center py-10 px-20 gap-5">
            {/* notes */}
          <p className="text-lg md:text-xl lg:text-xl">{history.paragraph1}</p>
          {/* LHSP */}
          <div>
            <p className="text-lg md:text-xl lg:text-2xl">
              {history.paragraph2}
            </p>
            <div className="text-justify flex flex-col p-5">
              {LHSP.map((item) => (
                <div key={item.id}>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* HAP */}
          <div>
            <p className="text-lg md:text-xl lg:text-2xl">
              {history.paragraph3}
            </p>
            <div className="text-justify flex flex-col p-5">
              {HAP.map((item) => (
                <div key={item.id}>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

              {/* BD */}
          <div>
            <p className="text-lg md:text-xl lg:text-2xl">
              {history.paragraph4}
            </p>
            <div className="text-justify flex flex-col p-5">
              {BD.map((item) => (
                <div key={item.id}>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
          <p className="text-lg md:text-xl lg:text-xl">{history.paragraph1}</p>
          </div>


        </article>
      </div>
    </section>
  );
}
