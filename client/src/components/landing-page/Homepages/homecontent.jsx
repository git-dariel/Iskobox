import React from "react";
import { HomeData } from "@/configs/LanfingPageConfigs/homepage.data";
import { bgHeader } from "@/configs/LanfingPageConfigs/bgheader";
import { animated, useSpring } from "@react-spring/web";

export default function HomeContent() {
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

  // Event handlers for hover
  const handleMouseEnter = () => {
    api.start({ scale: 1.2 }); // Scale up on hover
  };

  const handleMouseLeave = () => {
    api.start({ scale: 1 }); // Scale back down when hover ends
  };

  return (
    <>
      <section>
        <div className="bg-gradient-to-r from-[#e9cf5e] to-[#fffbfb] select-none min-h-screen w-full">
          <div className="flex flex-col items-center">
            {/* Welcome Section */}
            {/* <section className="flex items-center justify-center px-10 py-10 min-h-screen">
              <div className="lg:w-[768px] lg:h-auto">
                <animated.img
                  src={HomeData.welcome}
                  style={{
                    transform: springs.scale.to((scale) => `scale(${scale})`),
                  }}
                  className="flex object-center z-[10]"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  alt="Welcome"
                />
              </div>
            </section> */}

            {/* Message from Director Section */}
            <section className="w-full flex flex-col items-center">
              <div
                className="w-full text-center select-none bg-cover bg-no-repeat bg-center shadow-xl"
                style={{ backgroundImage: `url(${bgHeader.bgheader1})` }}
              >
                <div className="">
                  <h1 className="text-[#dca819] text-2xl font-extrabold md:text-3xl lg:text-4xl px-10 py-10 flex flex-col">
                    {HomeData.title3}
                  </h1>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-8 lg:gap-0 lg:flex-row py-10">
                <div className="flex flex-col items-center gap-4 w-full lg:w-[40%] h-full py-4">
                  <div className="flex justify-center">
                    <img
                      src={HomeData.director}
                      alt="Director"
                      className="w-[300px] h-atuo rounded-md shadow-lg"
                    />
                  </div>
                  <div className="text-[#810101] flex justify-center items-center flex-col font-bold text-md">
                    <span className="text-md">{HomeData.name}</span>
                    <span className="text-sm">{HomeData.position}</span>
                  </div>
                </div>
                <div className="w-full h-full text-justify text-[#810101] px-10 lg:pr-28 lg:pl-0 lg:w-[60%]">
                  <div>
                    <p>{HomeData.paragraph1}</p>
                    <br />
                    <p>{HomeData.paragraph2}</p>
                    <br />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
