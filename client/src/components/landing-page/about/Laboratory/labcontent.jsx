import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { laboratory } from "@/configs/LanfingPageConfigs/labpage";
import { animated, useSpring } from "@react-spring/web";

export default function LabContent() {
  const [springs, api] = useSpring(
    () => ({
      opacity: 1,
      transform: "translateY(0px)",
      scale: 1,
      from: { opacity: 0, transform: "translateY(-10px)", scale: 1 },
      config: {
        mass: 1,
        tension: 180,
        friction: 12,
      },
    }),
    []
  );

  const handleMouseEnter = () => {
    api.start({ scale: 1.2 }); // Scale up on hover
  };

  const handleMouseLeave = () => {
    api.start({ scale: 1 }); // Scale back down when hover ends
  };

  return (
    <>
      <section className=" flex flex-col bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb]">
        <div className="flex flex-col  justify-center  gap-5 h-full">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
          >
            <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
              <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">{laboratory.title1}</h2>
            </header>
          </div>
          <div className=" h-full md:px-20 md:py-10 px-6 flex justify-center">
            <div className=" h-full md:w-[50rem] w-[20rem]  max-w-screen-lg">
              <animated.img
                src={laboratory.labimg}
                style={{
                  transform: springs.scale.to((scale) => `scale(${scale})`),
                }}
                className="flex object-center z-[10]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className=" w-full flex flex-col  justify-center py-5 ">
          <div
            className="w-full text-center select-none bg-no-repeat bg-cover  bg-center shadow-xl "
            style={{ backgroundImage: `url(${bgHeader.bgheader2})` }}
          >
            <header className="border w-full px-20 lg:px-30 xl:px-40 h-full py-10">
              <h2 className="font-bold text-lg md:text-3xl text-[#dca819]">{laboratory.title2}</h2>
            </header>
          </div>
          <div className="md:px-20 md:py-10 px-6 py-6">
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              {/* 16:9 aspect ratio (h/w * 100) */}
              <iframe
                src={laboratory.video3}
                className="absolute inset-0 w-full h-full rounded-md shadow-xl"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
