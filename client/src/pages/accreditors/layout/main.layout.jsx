import React from "react";
import Navbar from "./top.nav";
import pup_logo from "../../../assets/logo/pup_logo.webp";
import common from "@/configs/common.config";
import Footer from "./footer";

const MainLayout = ({ children }) => {
  return (
    <div
      className="flex flex-col h-screen overflow-y-scroll"
      style={{ scrollbarWidth: "thin" }}
    >
      <Navbar
        logo={pup_logo}
        navTitle={"PUP Lopez Branch"}
        navItems={common.navItems}
      />
      <div className="mt-[4.5rem]">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
