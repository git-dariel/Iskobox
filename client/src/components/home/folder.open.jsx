import React, { useState } from "react";
import SideMenu from "../layout/side-menu";
import TopNavigation from "../layout/top-nav";
import Header from "./home.header";

const FolderOpen = () => {
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
            <div className="flex flex-col flex-1 items-center justify-center bg-white">
              This folder is empty.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderOpen;
