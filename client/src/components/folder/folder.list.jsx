import React from "react";
import FolderItem from "../home/folder.item";

const FolderList = ({ folders, onFolderDoubleClick, isGridView }) => {
  return (
    <div className={isGridView ? "grid grid-cols-3 gap-4" : "flex flex-col"}>
      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          onDoubleClick={onFolderDoubleClick}
          isGridView={isGridView}
        />
      ))}
    </div>
  );
};

export default FolderList;
