import React from "react";
import MainLayout from "../../layout/main.layout";
import { Link } from "react-router-dom";
import documents_links from "@/configs/documents.config";
import { animated, useSpring } from "@react-spring/web";
import imgSource from "@/configs/img.configs";
import ImageTopBanner from "@/components/accreditors/image.top.banner";
const Syllabi = () => {
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
  return (
    <MainLayout>
      <ImageTopBanner
        imgSource={imgSource.title_banner}
        banner_title={"syllabi"}
      />
      <div
        className="flex items-center justify-center bg-gray-50 h-[80vh]"
        style={{
          backgroundImage: `url(${imgSource.yellow_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Link to={documents_links.syllabi}>
          <div className="flex items-center justify-center w-[100%]">
            {/* Apply the spring animation to the img element */}
            <animated.img
              src={imgSource.syllabi}
              style={{
                transform: springs.scale.to((scale) => `scale(${scale})`),
              }}
              className="flex object-center z-[10] sm:max-w-[40rem] md:max-w-[55rem] lg:max-w-[60rem] rounded"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Syllabi;
