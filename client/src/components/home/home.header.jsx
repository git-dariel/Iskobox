import React, { useState } from 'react';
import FileFolderButton from '../common/buttons/file.folder';
import ToggleViewButton from '../common/buttons/toggle.view';
import FileCrumbs from '../common/filecrumb';
import AddNewButton from '../common/buttons/add.new';
import CircleButton from '../common/buttons/reusable/circle.button';
import { FaUserTag } from 'react-icons/fa6';
import { MdOutlineFileDownload, MdDelete } from 'react-icons/md';
import FolderTagModal from '../modals/folder.tag';

const Header = ({ selectedButton, handleButtonClick, isGridView, toggleView, currentFolderId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className='bg-white max-w-full rounded-t-xl '>
      <div className=' mx-auto p-4'>
        <div className='flex'>
          <h1 className='text-xl text-gray-800 pl-3 pr-1'>Sharehub</h1>
          {/* <FileCrumbs /> */}
          <AddNewButton parentId={currentFolderId} />
        </div>

        <div className='flex p-3'>
          <FileFolderButton selectedButton={selectedButton} handleButtonClick={handleButtonClick} />

          <div className='flex justify-end gap-2 w-full'>
            <div className='flex rounded-full  items-center justify-end bg-gray-100'>
              <CircleButton title={'Download'} icon={<MdOutlineFileDownload size={18} />} />
              <CircleButton title={'Remove'} icon={<MdDelete size={18} />} />
              <CircleButton
                title={'Tag an uploader'}
                icon={<FaUserTag size={17} />}
                onClick={toggleModal}
              />
            </div>
            <ToggleViewButton isGridView={isGridView} toggleView={toggleView} />
          </div>
          {/* Add more components here */}
        </div>
      </div>
      {isModalOpen && <FolderTagModal folderId={currentFolderId} onClose={toggleModal} />}
    </div>
  );
};

export default Header;
