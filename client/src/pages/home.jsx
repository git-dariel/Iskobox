import FileView from "@/components/home/file.view";
import Header from "@/components/home/home.header";
import SideMenu from "@/components/layout/side-menu";
import TopNavigation from "@/components/layout/top-nav";
import React, { useState } from "react";
import FolderPage from "./admin/folder-page";

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
        <FolderPage/>
      </div>
    </div>
  );
};

export default Home;
