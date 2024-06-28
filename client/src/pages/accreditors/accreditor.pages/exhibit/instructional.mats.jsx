import React from "react";
import MainLayout from "../../layout/main.layout";
import { Link } from "react-router-dom";
import documents_links from "@/configs/documents.config";
import imgSource from "@/configs/img.configs";
import ImageTopBanner from "@/components/accreditors/image.top.banner";

const InstructionalMaterials = () => {
  return (
    <MainLayout>
      <ImageTopBanner
        imgSource={imgSource.title_banner}
        banner_title={"instructional materials"}
      />
      <div
        className="flex items-center justify-center bg-gray-50 h-[80vh]"
        style={{
          backgroundImage: `url(${imgSource.yellow_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <Link to={documents_links.instructional_mats}>
          <div className="flex items-center justify-center w-[100%]">
            {/* Apply the spring animation to the img element */}
            <img
              src={imgSource.instructional_material}
              className="flex object-center z-[10]"
            />
          </div>
        </Link>
      </div>
    </MainLayout>
  );
};

export default InstructionalMaterials;
