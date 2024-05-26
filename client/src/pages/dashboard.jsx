import SideMenu from "@/components/layout/side-menu";
import TopNavigation from "@/components/layout/top-nav";
import React from "react";
import DashboardContent from "./admin/dashboard.content";

function Dashboard() {
  return (
    <div className="flex w-full h-screen">
      <SideMenu />
      <div className="flex h-full w-full flex-col">
        <TopNavigation />
        <div className="flex h-full w-full flex-col">
          {/* Main Content */}
          <div className="flex h-full w-full flex-col bg-gray-400">
            <div className="flex w-full h-screen flex-1 bg-white">
              <DashboardContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
