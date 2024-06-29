import React from "react";
import MainLayout from "../../layout/main.layout";
import imgSource from "@/configs/img.configs";
import ImageTopBanner from "@/components/accreditors/image.top.banner";

const UniversityCode = () => {
  return (
    <MainLayout>
      <ImageTopBanner
        imgSource={imgSource.title_banner}
        banner_title={"university code"}
      />
      <div className="flex items-center justify-center bg-gray-50 h-[69vh]">
        No data yet...
        <img src={imgSource.waving_boy} alt="Loading GIF" />
      </div>
    </MainLayout>
  );
};

export default UniversityCode;
