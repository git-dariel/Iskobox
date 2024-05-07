import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiFolderLine, RiFolderOpenLine } from 'react-icons/ri';

const FolderItem = ({ folder, isGridView, onDoubleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDoubleClick = () => {
    setIsOpen(!isOpen);
    onDoubleClick(folder.id);
  };

  const folderUrl = `/folders/${folder.id}`;
  const displayLimit = `${folder.fileCount}/${folder.uploadLimit}`;

  return (
    <Link to={folderUrl}>
      <div
        className={`cursor-default ${
          isGridView ? 'flex-col m-2 p-2 border' : 'w-full border-y'
        } text-sm flex items-center space-x-2 border-gray-200 hover:bg-gray-100`}
        onDoubleClick={handleDoubleClick}
      >
        {isOpen ? (
          <RiFolderOpenLine className='h-8 w-8 text-gray-600' />
        ) : (
          <RiFolderLine className='h-8 w-8 text-gray-600' />
        )}
        <span className='truncate'>{folder.name}</span>
        <span className='ml-auto'>{displayLimit}</span>
      </div>
    </Link>
  );
};

export default FolderItem;
