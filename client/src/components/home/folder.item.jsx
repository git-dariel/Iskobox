// FolderItem.jsx
import React from "react";
import { RiFolderLine } from "react-icons/ri";

const FolderItem = ({ folder, isGridView }) => {
  return (
    <div
      className={`${
        isGridView ? "w-1/4 p-2" : "w-full p-2"
      } text-sm flex items-center space-x-2 border-b border-gray-200 hover:bg-gray-100`}
    >
      <RiFolderLine className="h-8 w-8 text-gray-600" />
      <span className="truncate">{folder.name}</span>
    </div>
  );
};

export default FolderItem;
