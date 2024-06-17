import { about } from "@/configs/LanfingPageConfigs/aboutpage";

export default function MVContent() {
  return (
    <>
      <section className="h-full w-full flex flex-col">
        <div className=" h-full px-20 py-20 flex justify-center">
          <div className=" h-full w-full max-w-screen-lg">
            <video
              src={about.video2}
              className="w-full h-full object-contain"
              controls
              autoPlay
              loop
              muted
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></video>
          </div>
        </div>

        {/* Vision Section */}
        <div className=" w-full flex flex-col  justify-center">
          <header className="border w-full text-center h-full py-10">
            <h2 className="font-bold text-xl md:text-4xl lg:text-5xl">
              {about.visiontitle}
            </h2>
          </header>
          <article className="w-full flex flex-col items-center justify-center py-10 px-10">
            <p className="text-lg md:text-xl lg:text-2xl">{about.vision}</p>
          </article>
        </div>

        {/* Mission Section */}
        <div className=" w-full flex flex-col items-center justify-center ">
          <header className="border w-full text-center h-full py-10">
            <h2 className="font-bold text-lg md:text-3xl lg:text-4xl">
              {about.titlemission}
            </h2>
          </header>
          <article className="w-full flex flex-col items-center justify-center py-10 px-32">
            <div className="text-justify flex flex-col gap-5">
              <p className="text-lg md:text-xl lg:text-2xl">
                {about.mission1}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl">
                {about.mission2}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl">
                {about.mission3}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl">
                {about.mission4}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl">
                {about.mission6}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl">
                {about.mission5}
              </p>
            </div>
          </article>
        </div>

        {/* Goal Section */}

        <div className=" w-full flex flex-col  justify-center">
          {/* title */}
          <header className="border w-full text-center h-full py-10">
            <h2 className="font-bold text-xl md:text-4xl lg:text-5xl">
              {about.goaltitle}
            </h2>
          </header>

          <div className="flex flex-col lg:flex-row text-justify">
            {/* English Version */}
            <div className="w-full ">
              <header className="border py-10 px-32">
                <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
                  {about.title1}
                </h2>
              </header>
              <article className="px-32 py-10">
                <div className="flex flex-col gap-10">
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {about.goal1}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {about.goal2}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {about.goal3}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {about.goal4}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {about.goal5}
                  </p>
                </div>
              </article>
            </div>

            {/* Tagalog Version */}
            <div className="w-full ">
              <header className="border py-10 px-32">
                <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
                  {about.title2}
                </h2>
              </header>
              <article className="px-32 py-10">
                <div className="flex flex-col gap-10">
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {about.goalv1}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {about.goalv2}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {about.goalv3}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {about.goalv4}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl">
                    {about.goalv5}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
