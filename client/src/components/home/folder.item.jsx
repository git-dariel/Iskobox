import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcFolder } from "react-icons/fc";
import TicketModal from "../notification/addticket/ticketmodal";
import CommentButton from "../comment/commentbutton";

const FolderItem = ({ folder, isGridView, onDoubleClick }) => {
  const handleDoubleClick = () => {
    onDoubleClick(folder.id);
  };

  const folderUrl = `/folders/${folder.id}`;
  const displayLimit = `${folder.fileCount}/${folder.uploadLimit}`;

  return (
    <Link to={folderUrl}>
      <div
        className={`cursor-default px-1 py-2  ${
          isGridView ? "flex-col m-2 p-2 border" : "w-full border-b"
        } text-sm flex items-center space-x-2 border-gray-200 hover:bg-gray-100`}
        onDoubleClick={handleDoubleClick}
      >
        <FcFolder size={30} />
        <div className="flex flex-row w-full justify-between items-center">
          <div className=" gap-1">
            <span className="truncate">{folder.name}</span>
            <span className="ml-auto">{displayLimit}</span>
          </div>
          <div className="flex gap-1 mr-10">
            <div>
              <TicketModal />
            </div>
            <div>
              <CommentButton />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FolderItem;
