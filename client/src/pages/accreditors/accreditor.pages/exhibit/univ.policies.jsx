import React from "react";
import MainLayout from "../../layout/main.layout";
import documents_links from "@/configs/documents.config";
import CertHeader from "@/components/landing-page/CertofAuthenticity/certicateheader";
import imgSource from "@/configs/img.configs";
import ImageTopBanner from "@/components/accreditors/image.top.banner";

const UnivPoliciesGuidelines = () => {
  const googleDriveLink = documents_links.univ_policies;
  const embedLink = googleDriveLink.replace("/view?usp=sharing", "/preview");

  return (
    <MainLayout>
      {/* <CertHeader backgroundImage={imgSource.title_banner} /> */}
      <ImageTopBanner
        imgSource={imgSource.title_banner}
        banner_title={"university policies and guidelines"}
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
          width="50%"
          height="100%"
          allow="autoplay"
          className="border-none"></iframe>
      </div>
    </MainLayout>
  );
};

export default UnivPoliciesGuidelines;
