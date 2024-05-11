import React from "react";

const FolderCanvas = ({ folder }) => {
  return (
    <div>
      {folder.subfolders && folder.subfolders.length > 0 ? (
        <div>
          {folder.subfolders.map((subfolder) => (
            <div key={subfolder.id}>{subfolder.name}</div>
          ))}
        </div>
      ) : (
        <p>This is an empty folder.</p>
      )}
    </div>
  );
};

export default FolderCanvas;
