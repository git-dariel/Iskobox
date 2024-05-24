import SideMenu from "@/components/layout/side-menu";
import TopNavigation from "@/components/layout/top-nav";
import React from "react";
import DashboardContent from "./admin/dashboard.content";
import FolderPage from "./admin/folder-page";

function Dashboard() {
  return (
    // <div className="flex h-full bg-[#f8fafd]">
    //   <SideMenu />
    //   <div className="flex flex-col flex-1 ">
    //     <TopNavigation />
    //     <div className="flex flex-col flex-1">
    //       {/* Main Content */}
    //       <DashboardContent />
    //     </div>
    //   </div>
    // </div>

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
            <div className="flex flex-col flex-1 bg-white">
              <DashboardContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
