import { laboratory } from "@/configs/LanfingPageConfigs/labpage";

export default function LabContent() {
  return (
    <>
      <section className="h-full w-full flex flex-col">
        <div className=" w-full flex flex-col  justify-center">
          <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
            <h2 className="font-bold text-xl md:text-4xl lg:text-5xl">
              {laboratory.title1}
            </h2>
          </header>
          <div className=" h-full px-20 py-10 flex justify-center">
            <div className=" h-full w-full max-w-screen-lg">
              <img
                src={laboratory.labimg}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className=" w-full flex flex-col  justify-center py-5">
          <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
            <h2 className="font-bold text-xl md:text-4xl lg:text-5xl">
              {laboratory.title2}
            </h2>
          </header>
          <div className=" h-full px-20  py-10 flex justify-center">
            <div className=" h-full w-full max-w-screen-lg">
              <video
                src={laboratory.video3}
                className="w-full h-full object-contain"
                controls
                autoPlay
                loop
                muted
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></video>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
