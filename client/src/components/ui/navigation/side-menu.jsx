import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFolder } from "react-icons/fa";
import { TbFolders, TbFolderSymlink } from "react-icons/tb";
import { GoPin } from "react-icons/go";
import { ChevronUp } from 'lucide-react';
import { folders } from '@/utils/data';

const SideMenu = () => {
  // State to track the open/close status of sections
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const [recentOpen, setRecentOpen] = useState(true);
  const [allFoldersOpen, setAllFoldersOpen] = useState(true);

  // Filter folders based on categories
  const pinnedFolders = folders.filter(folder => folder.pinned);
  const recentFolders = folders.filter(folder => folder.recent);

  return (
    <div className="hidden md:flex flex-col min-w-64">
      <div className="flex items-center justify-center h-16 bg-gray-100">
        <span className="mx-5 w-full font-bold text-xl text-gray-800">ShareHub</span>
      </div>
      <div className="flex flex-col flex-1 relative">
        <nav className="flex-1 py-4 bg-gray-100 overflow-y-auto" style={{ maxHeight: "90vh" }}>
          {/* Pinned Folders */}
          <div>
            <h2 className="px-4 py-2 text-gray-800 font-semibold text-sm flex justify-between items-center cursor-pointer border-b" onClick={() => setPinnedOpen(!pinnedOpen)}>
              <span className="flex items-center"><GoPin className="h-4 w-4 mr-2" /> Pinned</span> {pinnedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronUp className="h-4 w-4 transform rotate-180 transition-all duration-100 ease-in-out" />}
            </h2>
            {pinnedOpen && (
              pinnedFolders.map(folder => (
                <Link key={folder.id} to={`/folder/${folder.id}`} className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">
                  <FaFolder className="h-4 w-4 mr-2" />
                  {folder.name}
                </Link>
              ))
            )}
          </div>
          {/* Recent Folders */}
          <div>
            <h2 className="px-4 py-2 text-gray-800 font-semibold text-sm flex justify-between items-center cursor-pointer border-b" onClick={() => setRecentOpen(!recentOpen)}>
              <span className="flex items-center"><TbFolderSymlink className="h-4 w-4 mr-2" /> Recents</span> {recentOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronUp className="h-4 w-4 transform rotate-180 transition-all duration-100 ease-in-out" />}
            </h2>
            {recentOpen && (
              recentFolders.map(folder => (
                <Link key={folder.id} to={`/folder/${folder.id}`} className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">
                  <FaFolder className="h-4 w-4 mr-2" />
                  {folder.name}
                </Link>
              ))
            )}
          </div>
          {/* All Folders */}
          <div>
            <h2 className="px-4 py-2 text-gray-800 font-semibold text-sm flex justify-between items-center cursor-pointer border-b" onClick={() => setAllFoldersOpen(!allFoldersOpen)}>
              <span className="flex items-center"><TbFolders className="h-4 w-4 mr-2" /> All Folders</span> {allFoldersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronUp className="h-4 w-4 transform rotate-180 transition-all duration-100 ease-in-out" />}
            </h2>
            {allFoldersOpen && (
              folders.map(folder => (
                <Link key={folder.id} to={`/folder/${folder.id}`} className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">
                  <FaFolder className="h-4 w-4 mr-2" />
                  {folder.name}
                </Link>
              ))
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;