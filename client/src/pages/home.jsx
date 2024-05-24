import FileView from "@/components/home/file.view";
import Header from "@/components/home/home.header";
import SideMenu from "@/components/layout/side-menu";
import TopNavigation from "@/components/layout/top-nav";
import React, { useState } from "react";

const Home = () => {
  const [selectedView, setSelectedView] = useState(
    localStorage.getItem("selectedView") || "files"
  );
  const [isGridView, setIsGridView] = useState(
    localStorage.getItem("isGridView") === "true" || false
  );

  const handleViewChange = (view) => {
    setSelectedView(view);
    localStorage.setItem("selectedView", view);
  };

  const toggleView = () => {
    const newGridView = !isGridView;
    setIsGridView(newGridView);
    localStorage.setItem("isGridView", newGridView.toString());
  };

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
            <Header
              selectedButton={selectedView}
              handleButtonClick={handleViewChange}
              isGridView={isGridView}
              toggleView={toggleView}
            />
            <div className="flex">
              <div className="flex flex-col flex-1 bg-white w-[70%]">
                {/* File view component here */}
                <FileView selectedView={selectedView} isGridView={isGridView} />
              </div>
              <div className="flex w-[30%] bg-blue-50">
                eto na space mo dadeh
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
