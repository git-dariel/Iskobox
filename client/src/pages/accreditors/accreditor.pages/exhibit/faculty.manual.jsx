import React from "react";
import MainLayout from "../../layout/main.layout";
import imgSource from "@/configs/img.configs";
import documents_links from "@/configs/documents.config";
import ImageTopBanner from "@/components/accreditors/image.top.banner";

const FacultyManual = () => {
  const googleDriveLink = documents_links.faculty_manual;
  const embedLink = googleDriveLink.replace("/view?usp=sharing", "/preview");

  return (
    <MainLayout>
      <ImageTopBanner
        imgSource={imgSource.title_banner}
        banner_title={"faculty manual"}
      />
      <div
        className="flex items-center justify-center bg-transparent h-[90vh]"
        style={{
          backgroundImage: `url(${imgSource.yellow_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <iframe
          src={embedLink}
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-full border-none"
          allow="autoplay"></iframe>
      </div>
    </MainLayout>
  );
};

export default FacultyManual;
