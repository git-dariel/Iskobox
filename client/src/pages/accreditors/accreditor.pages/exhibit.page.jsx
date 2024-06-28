import exhibit_banner from "@/assets/homeAssets/img8.webp";
import ImageTopBanner from "@/components/accreditors/image.top.banner";
import common from "@/configs/common.config";
import imgSource from "@/configs/img.configs";
import { animated, useSpring } from "@react-spring/web";
import { default as React } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/main.layout";
import PortalSection from "../layout/portal.section";
import StarsCanvas from "@/components/layout/starcanvas";

const ExhibitPage = () => {
  // Define the spring animation
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

  // Filter out the "Faculty Manual" from exhibitPaths
  const exhibitItems = common.exhibitPaths.filter(
    (item) => item.text !== "Faculty Manual"
  );

  return (
    <MainLayout>
      <ImageTopBanner
        imgSource={imgSource.title_banner}
        banner_title={"EXHIBIT"}
      />
      <section className="flex w-full items-center justify-center bg-gradient-to-r from-amber-300 to-yellow-50 min-h-[50vh] p-7 relative z-20">
        <div className="flex flex-col xl:flex-row sm:justify-center md:justify-between w-full xl:w-[57%]">
          <div className="flex flex-col gap-5 p-4 xl:p-0">
            <h1 className="font-semibold text-2xl sm:text-3xl">Contents:</h1>
            {exhibitItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-lg sm:text-xl text-green-950 hover:text-green-700 hover:bg-white rounded-full p-2 transition duration-200 ease-in-out transform hover:scale-105 z-10">
                {item.text}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center w-full xl:w-[65%] p-4 xl:p-0">
            {/* Apply the spring animation to the img element */}
            <animated.img
              src={imgSource.pylon_ngayon}
              style={{
                transform: springs.scale.to((scale) => `scale(${scale})`),
              }}
              className="object-center z-10 w-full"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </section>

      {exhibitItems.map((item, index) => (
        <PortalSection
          key={index}
          portalLink={item.path}
          sectionTitle={item.text}
          folderImage={item.image}
        />
      ))}
      <ImageTopBanner imgSource={exhibit_banner} />
    </MainLayout>
  );
};

export default ExhibitPage;
