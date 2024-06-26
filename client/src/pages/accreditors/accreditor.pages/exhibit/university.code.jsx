import React from "react";
import MainLayout from "../../layout/main.layout";
import imgSource from "@/configs/img.configs";

const UniversityCode = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center bg-gray-50 h-[69vh]">
        No data yet...
        <img src={imgSource.waving_boy} alt="Loading GIF" />
      </div>
    </MainLayout>
  );
};

export default UniversityCode;
