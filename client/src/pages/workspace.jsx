import React from "react";
import SideMenu from "@/components/layout/side-menu";
import TopNavigation from "@/components/layout/top-nav";

import TicketForm from "@/components/notification/addticket/ticket";

function Workspace() {
  return (
    <div className="flex h-screen bg-[#f8fafd]">
      <SideMenu />
      <div className="flex flex-col flex-1">

          <TopNavigation />
       
        <div className="h-full flex  items-center justify-center">
          <div className=" ">
            <TicketForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
