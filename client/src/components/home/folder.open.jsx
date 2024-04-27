import React, { useState, useEffect } from "react";
import SideMenu from "../layout/side-menu";
import TopNavigation from "../layout/top-nav";
import Header from "./home.header";
import { fetchFolders } from "../../services/folders/folder.service";
import FolderItem from "./folder.item";

const FolderOpen = () => {
  const [selectedView, setSelectedView] = useState(
    localStorage.getItem("selectedView") || "files"
  );
  const [isGridView, setIsGridView] = useState(
    localStorage.getItem("isGridView") === "true" || false
  );
  const [folderStack, setFolderStack] = useState([]); // Maintain folder navigation history
  const [folderContents, setFolderContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch folders for the initially selected folder
    fetchFolderContents(null);
  }, []); // Fetch folders when component mounts

  const fetchFolderContents = async (folderId) => {
    setIsLoading(true);
    try {
      const folders = await fetchFolders(folderId);
      setFolderContents(folders);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching folders:", error);
      setIsLoading(false);
    }
  };

  const handleFolderDoubleClick = (folderId) => {
    // Handle opening a folder (e.g., fetch its subfolders)
    setFolderStack([...folderStack, folderId]); // Push the folder ID onto the stack
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

  const navigateBack = () => {
    if (folderStack.length > 0) {
      const previousFolderId = folderStack.pop(); // Pop the last folder ID from the stack
      fetchFolderContents(previousFolderId);
      setFolderStack([...folderStack]); // Update the folder stack
    }
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
              navigateBack={navigateBack} // Pass the navigateBack function
            />
            {isLoading ? (
              <div className="flex flex-col flex-1 items-center justify-center">
                Loading...
              </div>
            ) : (
              <div>
                {folderContents.length === 0 ? (
                  <div className="flex flex-col flex-1 items-center justify-center">
                    This folder is empty.
                  </div>
                ) : (
                  <div className="flex flex-col flex-1">
                    {folderContents.map((folder) => (
                      <FolderItem
                        key={folder.id}
                        folder={folder}
                        isGridView={isGridView}
                        onDoubleClick={handleFolderDoubleClick}
                      />
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
