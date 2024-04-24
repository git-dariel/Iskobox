import { handleFolderDoubleClick } from '@/helpers/folder-helpers';
import React from 'react';
import { RiFolderLine } from 'react-icons/ri';
import { db } from "@/database/firebase-connection";

const FolderItem = ({ folder, isGridView, setCurrentFolder, setFolderPath, setFiles }) => {
  const onDoubleClick = async () => {
    console.log('Double-clicked folder:', folder);
    await handleFolderDoubleClick(folder, setCurrentFolder, setFolderPath, db, setFiles);
  };

  return (
    <div
      className={`${
        isGridView ? 'flex-col m-2 p-2 border' : 'w-full border-y'
      } text-sm flex  items-center space-x-2 border-gray-200 hover:bg-gray-100`}
      onDoubleClick={onDoubleClick}
    >
      <RiFolderLine className='h-8 w-8 text-gray-600' />
      <span className='truncate'>{folder.name}</span>
    </div>
  );
};

export default FolderItem;
