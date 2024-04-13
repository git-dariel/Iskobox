import React from "react";
import { AiOutlineFile } from "react-icons/ai";

const FileItem = ({ file, isGridView }) => {
  return (
    <div
      className={`${
        isGridView ? "w-1/4 p-2" : "w-full p-2"
      } text-sm flex items-center space-x-2 border-b border-gray-200 hover:bg-gray-100`}
    >
      <AiOutlineFile className="h-8 w-8 text-gray-600" />
      <span className="truncate">{file.name}</span>
    </div>
  );
};

export default FileItem;
