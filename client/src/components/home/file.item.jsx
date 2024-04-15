import React from "react";
import { AiOutlineFile } from "react-icons/ai";

const FileItem = ({ file, isGridView }) => {
  return (
    <div
      className={`${
        isGridView ? "flex-col m-2 p-2 border" : "w-full border-y"
      } text-sm flex  items-center space-x-2 border-gray-200 hover:bg-gray-100`}
    >
      <AiOutlineFile className="h-8 w-8 text-gray-600" />
      <span className="truncate">{file.name}</span>
    </div>
  );
};

export default FileItem;
