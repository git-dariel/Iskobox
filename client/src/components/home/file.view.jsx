import React, { useState, useEffect } from "react";
import { fetchFolders } from "../../services/folders/folder.service";
import { fetchAllFiles } from "../../services/files/file-service";
import FileItem from "./file.item";
import FolderItem from "./folder.item";

const FileView = ({
  selectedView,
  isGridView,
  currentFolder,
  setCurrentFolder,
  setFolderPath,
  setFiles,
}) => {
  const [files, setLocalFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (currentFolder) {
      fetchFolders(currentFolder.id).then(setFolders);
      fetchAllFiles(currentFolder.id).then(setLocalFiles);
    } else {
      // Fetch root folders and files
      fetchFolders().then(setFolders);
      fetchAllFiles().then(setLocalFiles);
    }
  }, [currentFolder]); 

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
                setCurrentFolder={setCurrentFolder}
                setFolderPath={setFolderPath} 
                setFiles={setFiles}
              />
            ))}
          </div>
          {/* <SampleCreatedFolder /> */}
        </div>
      )}
    </div>
  );
};

export default FileView;
