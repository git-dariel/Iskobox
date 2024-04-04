import React, { useState, useEffect } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { RiFolderLine } from "react-icons/ri";
import { fetchFolders } from "../../services/folders/folder.service";
import { fetchAllFiles } from "../../services/files/file-service";

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

  const renderItem = (item) => {
    const Icon = selectedView === "files" ? AiOutlineFile : RiFolderLine;
    return (
      <div
        key={item.id}
        className={`${
          isGridView ? "w-1/4 p-2" : "w-full p-2"
        } text-sm flex items-center space-x-2 border-b border-gray-200 hover:bg-gray-100`}
      >
        <Icon className="h-8 w-8 text-gray-600" />
        <span className="truncate">{item.name}</span>
      </div>
    );
  };

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
            {files.map(renderItem)}
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
            {folders.map(renderItem)}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileView;
