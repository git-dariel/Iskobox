import React from "react";
import MainLayout from "../../layout/main.layout";
import imgSource from "@/configs/img.configs";
import ImageTopBanner from "@/components/accreditors/image.top.banner";
import common from "@/configs/common.config";

const UnivPoliciesGuidelines = () => {
  return (
    <MainLayout>
      <ImageTopBanner
        imgSource={imgSource.title_banner}
        banner_title={"university policies and guidelines"}
      />
      <div
        className="flex items-center justify-center bg-transparent min-h-[90vh] py-10"
        style={{
          backgroundImage: `url(${imgSource.yellow_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {common.univ_policies_links.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-105 transition-transform">
              <div className="flex flex-col items-center justify-center">
                <div className="hover:bg-white rounded-full p-5 transition duration-200 ease-in-out transform hover:scale-105 hover:animate-wiggle">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-32 h-32 object-cover mb-4"
                  />
                </div>
                <span className="text-center max-w-[50%] text-yellow-700 font-bebas-neue text-3xl">
                  {item.text}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default UnivPoliciesGuidelines;
