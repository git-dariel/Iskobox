import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, BarChartBig, LayoutDashboard, Folders } from "lucide-react";

function SideBar() {
  return (
    <>
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 z-10  bg-slate-100 shadow-lg">
        <NavLink
          to="/dashboard"
          className="flex-grow text-center py-2 text-xs md:text-base text-gray-800 hover:bg-orange-500 hover:text-white transition-all duration-200 mx-1 rounded-full"
        >
          <LayoutDashboard className="h-6 w-6 mx-auto" /> Dashboard
        </NavLink>
        <NavLink
          to="/home"
          className="flex-grow text-center py-2 text-xs md:text-base text-gray-800 hover:bg-orange-500 hover:text-white transition-all duration-200 mx-1 rounded-full"
        >
          <Folders className="h-6 w-6 mx-auto" /> Folders
        </NavLink>
        <NavLink
          to="/dashboard-pending"
          className="flex-grow text-center py-2 text-xs md:text-base text-gray-800 hover:bg-orange-500 hover:text-white transition-all duration-200 mx-1 rounded-full"
        >
          <BarChart3 className="h-6 w-6 mx-auto" /> Pending
        </NavLink>
        <NavLink
          to="/dashboard-completed"
          className="flex-grow text-center py-2 text-xs md:text-base text-gray-800 hover:bg-orange-500 hover:text-white transition-all duration-200 mx-1 rounded-full"
        >
          <BarChartBig className="h-6 w-6 mx-auto" /> Completed
        </NavLink>
      </div>
      <div className="hidden md:flex flex-col min-w-64">
        <div className="flex flex-col flex-1 relative bg-slate-100">
          <span className="flex items-center justify-start h-16 p-4 w-full font-semibold text-xl text-gray-800 rounded-lg rounded-b-none">
            Iskobox
          </span>
          <nav
            className="flex-1  overflow-y-auto rounded-lg rounded-t-none"
            style={{
              scrollbarWidth: "thin",
              // background: "rgba(255, 255, 255, 0.54)",
            }}
          >
            <NavLink
              to="/dashboard"
              className="flex items-center text-center justify-start px-4 py-4 md:text-base text-gray-800 hover:bg-orange-500 hover:text-white transition-all duration-200 mx-1 rounded-full"
            >
              <LayoutDashboard className="h-6 w-6 mr-2" /> Dashboard
            </NavLink>
            <div>
              <NavLink
                to="/home"
                className="flex items-center text-center justify-start px-4 py-4 md:text-base text-gray-800 hover:bg-orange-500 hover:text-white transition-all duration-200 mx-1 rounded-full"
              >
                <Folders className="h-6 w-6 mr-2" /> Folders
              </NavLink>
              <NavLink
                to="/dashboard-pending"
                className="flex items-center text-center justify-start px-4 py-4 md:text-base text-gray-800 hover:bg-orange-500 hover:text-white transition-all duration-200 mx-1 rounded-full"
              >
                <BarChart3 className="h-6 w-6 mr-2" /> Pending Files
              </NavLink>
              <NavLink
                to="/dashboard-completed"
                className="flex items-center text-center justify-start px-4 py-4 md:text-base text-gray-800 hover:bg-orange-500 hover:text-white transition-all duration-200 mx-1 rounded-full"
              >
                <BarChartBig className="h-6 w-6 mr-2" /> Completed Files
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default SideBar;
