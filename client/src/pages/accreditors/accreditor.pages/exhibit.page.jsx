import React from "react";
import Navbar from "../accreditors.layout/top.nav";
import { navItems } from "../configs/common.configs";
import pup_logo from "../../../assets/logo/pup_logo.webp";
import MainLayout from "../accreditors.layout/main.layout";
import ImageTopBanner from "../accreditor.components/image.top.banner";

const ExhibitPage = () => {
  return (
    <MainLayout>
      <Navbar
        logo={pup_logo}
        navTitle={"PUP Lopez Branch"}
        navItems={navItems}
      />
      <ImageTopBanner />
    </MainLayout>
  );
};

export default ExhibitPage;
