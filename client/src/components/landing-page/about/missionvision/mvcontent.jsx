import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { missionvision } from "@/configs/LanfingPageConfigs/mvpage";

export default function MVContent() {
  return (
    <>
      <section className="w-full flex flex-col bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] ">
        <div className="px-20 lg:px-40 py-10">
          <div className="relative  border border-black" style={{ paddingTop: "56.25%" }}>
            {/* 16:9 aspect ratio (h/w * 100) */}
            <iframe
              src={missionvision.video}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Vision Section */}
        <div className=" w-full flex flex-col  justify-center">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
          >
            <header className="border w-full text-center h-full py-10">
              <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">
                {missionvision.visiontitle}
              </h2>
            </header>
          </div>
          <article className="w-full flex flex-col items-center justify-center py-10 px-10">
            <p className="text-base text-center md:text-2xl ">{missionvision.visioncontent}</p>
          </article>
        </div>

        {/* Mission Section */}
        <div className=" w-full flex flex-col items-center justify-center ">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
          >
            <header className="border w-full text-center h-full py-10">
              <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">
                {missionvision.missiontitle}
              </h2>
            </header>
          </div>
          <article className="w-full flex flex-col items-center justify-center p-6 md:py-10 md:px-32">
            <div className="md:text-justify flex flex-col gap-5">
              <p className="text-base md:text-xl">{missionvision.mission1}</p>
              <p className="text-base md:text-xl">{missionvision.mission2}</p>
              <p className="text-base md:text-xl">{missionvision.mission3}</p>
              <p className="text-base md:text-xl">{missionvision.mission4}</p>
              <p className="text-base md:text-xl">{missionvision.mission6}</p>
              <p className="text-base md:text-xl">{missionvision.mission5}</p>
            </div>
          </article>
        </div>

        {/* Goal Section */}

        <div className=" w-full flex flex-col  justify-center">
          {/* title */}

          <div
            className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader3})` }}
          >
            <header className="border w-full text-center h-full py-10">
              <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">
                {missionvision.goaltitle}
              </h2>
            </header>
          </div>

          <div className="flex flex-col lg:flex-row md:text-justify">
            {/* English Version */}
            <div className="w-full ">
              <header className="md:py-7 md:px-20 px-6 py-5 ">
                <h2 className="font-bold text-base md:text-2xl">{missionvision.title1}</h2>
              </header>
              <article className="md:py-5 md:px-20 px-6">
                <div className="flex flex-col gap-5">
                  <p className="text-base md:text-xl">{missionvision.goal1}</p>
                  <p className="text-base md:text-xl">{missionvision.goal2}</p>
                  <p className="text-base md:text-xl">{missionvision.goal3}</p>
                  <p className="text-base md:text-xl">{missionvision.goal4}</p>
                  <p className="text-base md:text-xl">{missionvision.goal5}</p>
                </div>
              </article>
            </div>

            {/* Tagalog Version */}
            <div className="w-full ">
              <header className="md:py-7 md:px-20 py-5 px-6">
                <h2 className="font-bold text-base md:text-2xl">{missionvision.title2}</h2>
              </header>
              <article className="md:py-5 xl:px-20 px-6 pb-5">
                <div className="flex flex-col gap-5">
                  <p className="text-base md:text-xl">{missionvision.goalv1}</p>
                  <p className="text-base md:text-xl">{missionvision.goalv2}</p>
                  <p className="text-base md:text-xl">{missionvision.goalv3}</p>
                  <p className="text-base md:text-xl">{missionvision.goalv4}</p>
                  <p className="text-base md:text-xl">{missionvision.goalv5}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
