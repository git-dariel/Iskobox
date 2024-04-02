import SideMenu from "@/components/layout/side-menu";
import TopNavigation from "@/components/layout/top-nav";
import React from "react";

function Dashboard() {
  return (
    <div className="flex h-screen bg-[#f8fafd]">
      <SideMenu />
      <div className="flex flex-col flex-1 ">
        <TopNavigation />
        <div className="flex flex-col flex-1 p-4 overflow-y-auto items-center justify-center">
          {/* Main Content */}
          <h1>Dashboard component/content here</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
