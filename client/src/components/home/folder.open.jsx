import React, { useState, useEffect } from "react";
import SideMenu from "../layout/side-menu";
import TopNavigation from "../layout/top-nav";
import Header from "./home.header";
import { fetchFolders } from "../../services/folders/folder.service";

const FolderOpen = () => {
  const [selectedView, setSelectedView] = useState(
    localStorage.getItem("selectedView") || "files"
  );
  const [isGridView, setIsGridView] = useState(
    localStorage.getItem("isGridView") === "true" || false
  );
  const [folderContents, setFolderContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFolderId, setSelectedFolderId] = useState(null); // Track selected folder ID

  useEffect(() => {
    // Fetch folders for the initially selected folder
    fetchFolderContents(null);
  }, []); // Fetch folders when component mounts

  const fetchFolderContents = async (parentId) => {
    setIsLoading(true);
    try {
      const folders = await fetchFolders(parentId);
      setFolderContents(folders);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching folders:", error);
      setIsLoading(false);
    }
  };

  const handleFolderDoubleClick = (folderId) => {
    // Handle opening a folder (e.g., fetch its subfolders)
    setSelectedFolderId(folderId);
    fetchFolderContents(folderId);
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
    localStorage.setItem("selectedView", view);
  };

  const toggleView = () => {
    const newGridView = !isGridView;
    setIsGridView(newGridView);
    localStorage.setItem("isGridView", newGridView.toString());
  };

  return (
    <div className="flex h-screen mx-1 bg-[#f8fafd]">
      <SideMenu />
      <div className="flex flex-col flex-1 ">
        <TopNavigation />
        <div className="flex flex-col flex-1">
          <div
            className="flex flex-col flex-1"
            style={{ scrollbarWidth: "thin" }}
          >
            <Header
              selectedButton={selectedView}
              handleButtonClick={handleViewChange}
              isGridView={isGridView}
              toggleView={toggleView}
            />
            {isLoading ? (
              <div className="flex flex-col flex-1 items-center justify-center bg-white">
                Loading...
              </div>
            ) : (
              <div className="flex flex-col flex-1 items-center justify-center bg-white">
                {folderContents.length === 0 ? (
                  <div>This folder is empty.</div>
                ) : (
                  <div>
                    {folderContents.map((folder) => (
                      <div
                        key={folder.id}
                        onClick={() => handleFolderDoubleClick(folder.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {folder.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderOpen;
