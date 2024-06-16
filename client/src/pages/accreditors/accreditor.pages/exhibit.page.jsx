import React from "react";
import MainLayout from "../layout/main.layout";
import ImageTopBanner from "@/components/accreditors/image.top.banner";
import { Link } from "react-router-dom";
import imgSource from "@/configs/img.configs";
import common from "@/configs/common.config";
import PortalSection from "../layout/portal.section";
import Divider from "../layout/divider";
import Footer from "../layout/footer";

const ExhibitPage = () => {
  return (
    <MainLayout>
      <ImageTopBanner
        imgSource={imgSource.title_banner}
        banner_title={"EXHIBIT"}
      />
      <section className="flex w-full items-center justify-center bg-gradient-to-r from-amber-300 to-yellow-50 min-h-[50vh] p-7">
        <div className="flex w-[57%] justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-lg">Contents:</h1>
            {common.exhibitPaths.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="font-medium text-green-950 hover:underline"
              >
                {item.text}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center w-[65%]">
            <img src={imgSource.pylon_ngayon} className="flex object-center" />
          </div>
        </div>
      </section>

      {common.exhibitPaths.map((item, index) => (
        <PortalSection
          portalLink={item.path}
          sectionTitle={item.text}
          folderImage={item.image}
        />
      ))}

      <Footer />
    </MainLayout>
  );
};

export default ExhibitPage;
