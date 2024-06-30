import React from "react";
import "../../../index.css";
import { HomeData } from "@/configs/LanfingPageConfigs/homepage.data";
import { animated, useSpring } from "@react-spring/web";
import StarsCanvas from "@/components/layout/starcanvas";

export default function Hero({ size = 1 }) {
  const [springs, api] = useSpring(
    () => ({
      opacity: 1,
      transform: "translateY(0px)",
      scale: size,
      from: { opacity: 0, transform: "translateY(-10px)", scale: size },
      config: {
        mass: 1,
        tension: 180,
        friction: 12,
      },
    }),
    [size]
  );

  const handleMouseEnter = () => {
    api.start({ scale: size * 1.2 });
  };

  const handleMouseLeave = () => {
    api.start({ scale: size });
  };

  return (
    <>
      <section className="bg-gradient-to-r from-red-800 to-orange-500  w-full min-h-[13%] max-h-screen relative">
        <StarsCanvas />
        <div className="w-full h-full flex">
          <div className="flex flex-col justify-center md:flex-row md:justify-between md:w-full text-center items-center mx-4 md:mx-10 gap-10">
            <h1 className="text-[#ffffff] p-4 text-center text-lg md:text-[1.8rem] font-extrabold leading-normal md:flex-1 md:text-left md:mt-0">
              {HomeData.puptitle}
            </h1>
            <div className="w-full h-auto md:flex-1 text-right mt-2 md:mt-0">
              <animated.img
                src={HomeData.welcome}
                style={{
                  transform: springs.scale.to((scale) => `scale(${scale})`),
                }}
                className="inline-block object-center z-[10] mt-[-20px] md:mt-0"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                alt="Welcome"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
