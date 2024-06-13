import React from "react";
import MainLayout from "../layout/main.layout";
import ImageTopBanner from "@/components/accreditors/image.top.banner";
import exhibit_banner from "@/assets/homeAssets/img8.png";

const ExhibitPage = () => {
  return (
    <MainLayout>
      <ImageTopBanner imgSource={exhibit_banner} />
      <section className="bg-blue-50 min-h-[50vh]">sdfd</section>
      <section className="bg-red-50 min-h-[50vh]">sdfd</section>
      <section className="bg-blue-50 min-h-[50vh]">sdfdf</section>
      <section className="bg-red-50 min-h-[50vh]">dsfdf</section>
      <section className="bg-blue-50 min-h-[50vh]">sdfdf</section>
      <section className="bg-red-50 min-h-[50vh]">sdfd</section>
    </MainLayout>
  );
};

export default ExhibitPage;
