import React, { useState, useEffect } from "react";
import { fetchFolders } from "../../services/folders/folder.service";
import { fetchAllFiles } from "../../services/files/file-service";
import FileItem from "./file.item";
import FolderItem from "./folder.item";

const FileView = ({ selectedView, isGridView }) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [openedFolders, setOpenedFolders] = useState([]);

  const handleFolderDoubleClick = (folderId) => {
    if (!openedFolders.includes(folderId)) {
      setOpenedFolders([...openedFolders, folderId]);
      console.log("Open folder:", folderId);
    }
  };

  const handleCreateNewFolder = (parentId) => {
    // Implement your folder creation logic here, using parentId as the parent folder ID
    console.log("Create new folder in folder:", parentId);
  };

  useEffect(() => {
    if (selectedView === "files") {
      fetchAllFiles().then((data) => setFiles(data));
      setFolders([]); // Clear folders when viewing files
    } else if (selectedView === "folders") {
      fetchFolders().then((data) => setFolders(data));
      setFiles([]); // Clear files when viewing folders
    }
  }, [selectedView]);

  // toggle view
  // useEffect(() => {
  //   if (selectedView === "files") {
  //     fetchAllFiles().then((data) => setFiles(data));
  //   } else if (selectedView === "folders") {
  //     fetchFolders().then((data) => setFolders(data));
  //   }
  // }, [selectedView]);

  return (
    <div className="mt-4">
      {selectedView === "files" && (
        <div>
          <div className="flex justify-between">
            <h2 className="text-sm m-2">Name</h2>
          </div>
          <div
            className={`${
              isGridView
                ? "grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center"
                : " "
            } `}
          >
            {files.map((file) => (
              <FileItem key={file.id} file={file} isGridView={isGridView} />
            ))}
          </div>
        </div>
      )}

      {selectedView === "folders" && (
        <div>
          <h2 className="text-sm m-2">Name</h2>
          <div
            className={`${
              isGridView
                ? "grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center"
                : " "
            } `}
          >
            {folders.map((folder) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                isGridView={isGridView}
                onDoubleClick={handleFolderDoubleClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileView;
