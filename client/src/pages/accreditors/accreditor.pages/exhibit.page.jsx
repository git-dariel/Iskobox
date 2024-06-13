import React from "react";
import MainLayout from "../layout/main.layout";
import ImageTopBanner from "@/components/accreditors/image.top.banner";
import { Link } from "react-router-dom";
import imgSource from "@/configs/img.configs";

const ExhibitPage = () => {
  return (
    <MainLayout>
      <ImageTopBanner
        imgSource={imgSource.title_banner}
        banner_title={"EXHIBIT"}
      />
      <section className="flex w-full items-center justify-center bg-blue-50 min-h-[50vh]">
        <div className="flex w-[57%] justify-between">
          <div className="flex flex-col gap-2">
            <h1>Contents:</h1> <h1>Contents:</h1>
            <Link to={"/exhibit/citizens-charter"}>Citizen's Charter</Link>
            <Link to={"/exhibit/student-handbook"}>Student Handbook </Link>
            <Link to={"/exhibit/university-code"}>University Code</Link>
            <Link to={"/exhibit/university-policies-and-guidelines"}>
              University Policies & Guidelines
            </Link>
            <Link to={"/exhibit/administrative-manual"}>
              Administrative Manual
            </Link>
            <Link to={"/exhibit/syllabi"}>Syllabi</Link>
            <Link to={"/exhibit/instructional-materials"}>
              Instructional Materials
            </Link>
            <Link to={"/exhibit/cmo-2015"}>CMO 2015</Link>
          </div>
          <div className="flex items-center justify-center w-[60%]">
            <img src={imgSource.pylon_ngayon} className="flex object-center" />
          </div>
        </div>
      </section>
      <section className="bg-red-50 min-h-[50vh]">dfgdfg</section>
      <section className="bg-blue-50 min-h-[50vh]">sdfdf</section>
      <section className="bg-red-50 min-h-[50vh]">dsfdf</section>
      <section className="bg-blue-50 min-h-[50vh]">sdfdf</section>
      <section className="bg-red-50 min-h-[50vh]">sdfd</section>
    </MainLayout>
  );
};

export default ExhibitPage;
