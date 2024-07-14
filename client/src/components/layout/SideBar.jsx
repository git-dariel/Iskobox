import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, BarChartBig, LayoutDashboard, Folders, FileClock } from "lucide-react";

function SideBar() {
  return (
    <>
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 z-10 bg-gray-800 shadow-lg">
        <NavLink
          to="/dashboard"
          className="flex-grow text-center py-2 text-xs md:text-base text-gray-100 hover:text-gray-400"
        >
          <LayoutDashboard className="h-6 w-6 mx-auto" /> Dashboard
        </NavLink>
        <NavLink
          to="/home"
          className="flex-grow text-center py-2 text-xs md:text-base text-gray-100 hover:text-gray-400"
        >
          <Folders className="h-6 w-6 mx-auto" /> Folders
        </NavLink>
        <NavLink
          to="/dashboard-pending"
          className="flex-grow text-center py-2 text-xs md:text-base text-gray-100 hover:text-gray-400"
        >
          <BarChart3 className="h-6 w-6 mx-auto" /> Pending
        </NavLink>
        <NavLink
          to="/dashboard-completed"
          className="flex-grow text-center py-2 text-xs md:text-base text-gray-100 hover:text-gray-400"
        >
          <BarChartBig className="h-6 w-6 mx-auto" /> Completed
        </NavLink>
        <NavLink
          to="/activity-log"
          className="flex-grow text-center py-2 text-xs md:text-base text-gray-100 hover:text-gray-400"
        >
          <FileClock className="h-6 w-6 mx-auto" /> Activity Logs
        </NavLink>
      </div>
      <div className="hidden md:flex flex-col min-w-64">
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <span className="mx-5 w-full mt-5 font-semibold text-xl text-gray-100">Iskobox</span>
        </div>
        <div className="flex flex-col flex-1 relative">
          <nav
            className="flex-1 py-4 bg-gray-800 overflow-y-auto"
            style={{ maxHeight: "100vh", scrollbarWidth: "thin" }}
          >
            <NavLink
              to="/dashboard"
              className="flex items-center px-4 py-2 pb-5 md:text-base text-gray-100 hover:text-gray-400"
            >
              <LayoutDashboard className="h-6 w-6 mr-2" /> Dashboard
            </NavLink>
            <div>
              <NavLink
                to="/home"
                className="flex items-center px-4 py-2 pb-5 md:text-base text-gray-100 hover:text-gray-400"
              >
                <Folders className="h-6 w-6 mr-2" /> Folders
              </NavLink>
              <NavLink
                to="/dashboard-pending"
                className="flex items-center px-4 py-2 pb-5 md:text-base text-gray-100 hover:text-gray-400"
              >
                <BarChart3 className="h-6 w-6 mr-2" /> Pending Files Per Area
              </NavLink>
              <NavLink
                to="/dashboard-completed"
                className="flex items-center px-4 py-2 pb-5 md:text-base text-gray-100 hover:text-gray-400"
              >
                <BarChartBig className="h-6 w-6 mr-2" /> Completed Files Per Area
              </NavLink>
              <NavLink
                to="/activity-log"
                className="flex items-center px-4 py-2 pb-5 md:text-base text-gray-100 hover:text-gray-400"
              >
                <FileClock className="h-6 w-6 mr-2" /> Activity Logs
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default SideBar;
