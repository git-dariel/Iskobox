import React, { useState, useEffect } from "react";
import { fetchFolders } from "../../services/folders/folder.service";
import { fetchAllFiles } from "../../services/files/file-service";
import FileItem from "./file.item";
import FolderItem from "./folder.item";

const FileView = ({ selectedView, isGridView }) => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (selectedView === "files") {
      fetchAllFiles().then((data) => setFiles(data));
    } else if (selectedView === "folders") {
      fetchFolders().then((data) => setFolders(data));
    }
  }, [selectedView]);

  return (
    <div className="mt-4">
      {selectedView === "files" && (
        <div>
          <div className="flex justify-between">
            <h2 className="text-sm m-2">Name</h2>
          </div>
          <div
            className={`${
              isGridView ? "flex flex-wrap" : ""
            } border-y border-gray-200`}
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
              isGridView ? "flex flex-wrap" : ""
            } border-y border-gray-200`}
          >
            {folders.map((folder) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                isGridView={isGridView}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileView;
