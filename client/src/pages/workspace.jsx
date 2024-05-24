import React from "react";
import SideMenu from "@/components/layout/side-menu";
import TopNavigation from "@/components/layout/top-nav";
import { Toaster } from "sonner";
import TicketForm from "@/components/notification/addticket/ticket";
import CommentForm from "@/components/comment/commentform";

function Workspace() {
  return (
    <div className="flex h-screen bg-[#f8fafd]">
      <Toaster position="bottom-right" />
      <SideMenu />
      <div className="flex flex-col flex-1">

          <TopNavigation />
       
        <div className="h-full flex  items-center justify-center">
          <div className=" ">
            {/* <TicketForm /> */}
            <CommentForm/>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
