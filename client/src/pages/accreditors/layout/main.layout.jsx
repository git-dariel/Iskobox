import React from "react";
import Navbar from "./top.nav";
import pup_logo from "../../../assets/logo/pup_logo.webp";
import common from "@/configs/common.config";

const MainLayout = ({ children }) => {
  return (
    <div
      className="flex flex-col bg-red-50 h-screen overflow-y-scroll"
      style={{ scrollbarWidth: "thin" }}
    >
      <Navbar
        logo={pup_logo}
        navTitle={"PUP Lopez Branch"}
        navItems={common.navItems}
      />
      <div className="mt-16">{children}</div>
    </div>
  );
};

export default MainLayout;
