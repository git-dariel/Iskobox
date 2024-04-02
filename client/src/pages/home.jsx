import Header from "@/components/home/home.header";
import SideMenu from "@/components/layout/side-menu";
import TopNavigation from "@/components/layout/top-nav";
import React from "react";

const Home = () => {
  return (
    <div className="flex h-screen mx-1 bg-[#f8fafd]">
      <SideMenu />
      <div className="flex flex-col flex-1 ">
        <TopNavigation />
        <div className="flex flex-col flex-1">
          {/* Main Content */}
          <div
            className="flex flex-col flex-1"
            style={{ scrollbarWidth: "thin" }}
          >
            <Header />
            <div className="flex flex-col flex-1 bg-white">
              {/* File view component here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
