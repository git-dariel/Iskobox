import React, { useState } from "react";
import FolderPage from "./folder-page";
import NavBar from "../../components/home/home-navbar";
import SideBar from "../../components/home/home-sidebar";
import SideBarItem from "../../components/home/sidebar-item";
import { FaFolder } from "react-icons/fa";

function DashboardContent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {/* <NavBar />
      <div className="flex relative">
        <SideBar expanded={expanded} setExpanded={setExpanded}>
          <SideBarItem icon={<FaFolder />} text="Folder" expanded={expanded} />
        </SideBar> */}
      <FolderPage />
      {/* </div> */}
    </div>
  );
}

export default DashboardContent;
