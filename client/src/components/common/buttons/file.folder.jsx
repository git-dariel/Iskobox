import React from 'react';
import { FaRegFolder } from 'react-icons/fa';
import { TbFileStack } from 'react-icons/tb';
import { GoCheck } from 'react-icons/go';

const FileFolderButton = ({ selectedButton, handleButtonClick }) => {
  return (
    <div className='flex w-full justify-between'>
      <div className='flex items-center'>
        <span
          className={`flex px-3 py-1 text-sm rounded-s-2xl border ${
            selectedButton === 'files'
              ? 'bg-blue-100'
              : 'bg-transparent hover:bg-gray-200 active:bg-blue-100'
          } items-center justify-center cursor-pointer`}
          onClick={() => handleButtonClick('files')}
        >
          {selectedButton === 'files' ? (
            <GoCheck size={15} className={'mx-1'} />
          ) : (
            <TbFileStack size={15} className={'mx-1'} />
          )}
          Files
        </span>
        <span
          className={`flex px-3 py-1 text-sm rounded-e-2xl border ${
            selectedButton === 'folders'
              ? 'bg-blue-100'
              : 'bg-transparent hover:bg-gray-200 active:bg-blue-100'
          } items-center justify-center cursor-pointer`}
          onClick={() => handleButtonClick('folders')}
        >
          {selectedButton === 'folders' ? (
            <GoCheck size={15} className={'mx-1'} />
          ) : (
            <FaRegFolder size={15} className={'mx-1'} />
          )}
          Folders
        </span>
      </div>
    </div>
  );
};

export default FileFolderButton;
