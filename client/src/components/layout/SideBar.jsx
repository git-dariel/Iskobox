import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, BarChartBig, LayoutDashboard, Folders, FileClock } from "lucide-react";
import { useAuth } from "@/helpers/auth.context";

function SideBar() {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 z-10 bg-slate-100 shadow-lg">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex-grow text-center py-2 text-xs md:text-base text-gray-800 ${
              isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-400 hover:text-orange-50'
            } transition-all duration-200 mx-1 rounded-full`
          }
        >
          <LayoutDashboard className="h-6 w-6 mx-auto" /> Dashboard
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex-grow text-center py-2 text-xs md:text-base text-gray-800 ${
              isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-400 hover:text-orange-50'
            } transition-all duration-200 mx-1 rounded-full`
          }
        >
          <Folders className="h-6 w-6 mx-auto" /> Folders
        </NavLink>
        <NavLink
          to="/dashboard-pending"
          className={({ isActive }) =>
            `flex-grow text-center py-2 text-xs md:text-base text-gray-800 ${
              isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-400 hover:text-orange-50'
            } transition-all duration-200 mx-1 rounded-full`
          }
        >
          <BarChart3 className="h-6 w-6 mx-auto" /> Pending
        </NavLink>
        <NavLink
          to="/dashboard-completed"
          className={({ isActive }) =>
            `flex-grow text-center py-2 text-xs md:text-base text-gray-800 ${
              isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-400 hover:text-orange-50'
            } transition-all duration-200 mx-1 rounded-full`
          }
        >
          <BarChartBig className="h-6 w-6 mx-auto" /> Completed
        </NavLink>
        {currentUser.role !== "Faculty" && (
          <NavLink
            to="/activity-log"
            className={({ isActive }) =>
              `flex-grow text-center py-2 text-xs md:text-base text-gray-800 ${
                isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-400 hover:text-orange-50'
              } transition-all duration-200 mx-1 rounded-full`
            }
          >
            <FileClock className="h-6 w-6 mx-auto" /> Activity Logs
          </NavLink>
        )}
        {currentUser.role !== "Faculty" && (
          <NavLink
            to="/activity-log"
            className="flex-grow text-center py-2 text-xs md:text-base text-gray-100 hover:text-gray-400 "
          >
            <FileClock className="h-6 w-6 mx-auto" /> Activity Logs
          </NavLink>
        )}
      </div>
      <div className="hidden md:flex flex-col min-w-64">
        <div className="flex flex-col flex-1 relative bg-slate-100">
          <span className="flex items-center justify-start h-16 p-4 w-full font-semibold text-xl text-gray-800 rounded-lg rounded-b-none">
            Iskobox
          </span>
          <nav
            className="flex-1 overflow-y-auto rounded-lg rounded-t-none"
            style={{
              scrollbarWidth: "thin",
              // background: "rgba(255, 255, 255, 0.54)",
            }}
          >
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center text-center justify-start px-4 py-4 md:text-base my-1 text-gray-800 ${
                  isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-400 hover:text-orange-50'
                } transition-all duration-200 mx-1 rounded-full`
              }
            >
              <LayoutDashboard className="h-6 w-6 mr-2" /> Dashboard
            </NavLink>
            <div>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex items-center text-center justify-start px-4 py-4 md:text-base my-1 text-gray-800 ${
                    isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-400 hover:text-orange-50'
                  } transition-all duration-200 mx-1 rounded-full`
                }
              >
                <Folders className="h-6 w-6 mr-2" /> Folders
              </NavLink>
              <NavLink
                to="/dashboard-pending"
                className={({ isActive }) =>
                  `flex items-center text-center justify-start px-4 py-4 md:text-base my-1 text-gray-800 ${
                    isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-400 hover:text-orange-50'
                  } transition-all duration-200 mx-1 rounded-full`
                }
              >
                <BarChart3 className="h-6 w-6 mr-2" /> Pending Files
              </NavLink>
              <NavLink
                to="/dashboard-completed"
                className={({ isActive }) =>
                  `flex items-center text-center justify-start px-4 py-4 md:text-base my-1 text-gray-800 ${
                    isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-400 hover:text-orange-50'
                  } transition-all duration-200 mx-1 rounded-full`
                }
              >
                <BarChartBig className="h-6 w-6 mr-2" /> Completed Files
              </NavLink>
              {currentUser.role !== "Faculty" && (
                <NavLink
                  to="/activity-log"
                  className={({ isActive }) =>
                    `flex items-center text-center justify-start px-4 py-4 md:text-base my-1 text-gray-800 ${
                      isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-300 hover:text-orange-50'
                    } transition-all duration-200 mx-1 rounded-full`
                  }
                >
                  <FileClock className="h-6 w-6 mr-2" /> Activity Logs
                </NavLink>
              )}
              {currentUser.role !== "Faculty" && (
                <NavLink
                  to="/activity-log"
                  className="flex items-center px-4 py-2 pb-5 md:text-base text-gray-100 hover:text-gray-400"
                >
                  <FileClock className="h-6 w-6 mr-2" /> Activity Logs
                </NavLink>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default SideBar;
