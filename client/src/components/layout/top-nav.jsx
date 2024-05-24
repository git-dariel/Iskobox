import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchForm from "../common/searchbars/search";
import UserProfile from "@/components/users/user-profile";
import Notification from "../common/buttons/notification";

const tabs = [
  { path: "/home", text: "Home" },
  { path: "/dashboard", text: "Dashboard" },
  { path: "/workspace", text: "Workspace" },
];

const TopNavigation = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="bg-[#f8fafd]">
      <div className="min-w-full mx-auto px-4 sm:px-1 lg:px-2">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Content */}
            </div>
            <div className="hidden sm:flex sm:items-center sm:ml-6 sm:space-x-8">
              {/* Navigation tabs */}
              {tabs.map((tab, index) => (
                <Link
                  key={index}
                  to={tab.path}
                  className={`inline-flex items-center text-sm font-medium ${
                    location.pathname === tab.path
                      ? "text-gray-800 border-b-2 rounded-b-none rounded-md p-2 border-blue-500 transition-all duration-300 ease-in-out"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.text}
                </Link>
              ))}
            </div>
          </div>
          {/* Additional elements */}
          <SearchForm onSearch={handleSearch} />
          <div className="flex items-center ml-6">
            <Notification />
            <UserProfile />
          </div>
        </div>
        {searchResults.length > 0 && (
          <div className="absolute bg-white w-full shadow-md rounded-lg mt-2 p-4 z-20">
            <ul>
              {searchResults.map((result) => (
                <li key={result.id} className="border-b py-2">
                  {result.type === "folder" ? "📁" : "📄"} {result.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavigation;
