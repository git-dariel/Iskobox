// import React, { useState } from "react";
// import { FcFolder } from "react-icons/fc";

// const FolderItem = ({ folder, isGridView, onDoubleClick, inFileView }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleDoubleClick = () => {
//     setIsOpen(!isOpen);
//     onDoubleClick(folder.id);
//   };
//   const displayLimit = `${folder.fileCount}/${folder.uploadLimit}`;
//   return (
//     <div
//       className={`cursor-default p-3 ${
//         isGridView ? "flex-col m-2 p-2 border" : "w-full border-y"
//       } text-sm flex items-center space-x-2 border-gray-200 hover:bg-gray-100`}
//       onDoubleClick={inFileView ? null : handleDoubleClick} // Disable double click in FileView
//     >
//       <span className="mx-2">
//         <FcFolder size={20} />
//       </span>
//       <span className="truncate">{folder.name}</span>
//       <span className="ml-auto">{displayLimit}</span>
//     </div>
//   );
// };

// export default FolderItem;

import React, { useState } from "react";
import FileItem from "./file.item";

const FolderItem = ({ folder, isGridView, onDoubleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFolderClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDoubleClick = () => {
    if (onDoubleClick) {
      onDoubleClick(folder); // Pass the folder data to the parent component
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      <div className="flex justify-between" onClick={handleFolderClick}>
        <h2 className="text-sm m-2">{folder.name}</h2>
        <p>File Count: {folder.fileCount}</p>
      </div>
      {isOpen && (
        <div>
          {folder.subfolders.map((subfolder) => (
            <FolderItem
              key={subfolder.id}
              folder={subfolder}
              isGridView={isGridView}
              onDoubleClick={onDoubleClick}
            />
          ))}
          {folder.files.map((file) => (
            <FileItem key={file.id} file={file} isGridView={isGridView} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderItem;
