import React from "react";
import SideMenu from "@/components/layout/side-menu";
import TopNavigation from "@/components/layout/top-nav";
import TicketModal from "@/components/notification/addticket/ticketmodal";
import DisplayFetchedData from "@/components/notification/displayticket/displayticket";



function Workspace() {
  return (
    <div className="flex h-screen bg-[#f8fafd]">
      <SideMenu />
      <div className="flex flex-col flex-1 ">
        <TopNavigation />
        <div className="flex flex-col flex-1 p-4 overflow-y-auto items-center justify-center">
          {/* Main Content */}
        <DisplayFetchedData/>
        <TicketModal/>
          {/* <h1>Workspace component/content here</h1> */}
        </div>
      </div>
    </div>
  );
}

export default Workspace;
