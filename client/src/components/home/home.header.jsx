import React, { useState } from 'react';
import AddNewButton from '../common/buttons/add.new';
import FileFolderButton from '../common/buttons/file.folder';
import ToggleViewButton from '../common/buttons/toggle.view';
import FolderTagModal from '../modals/folder.tag';
import { useAuth } from '@/helpers/auth.context';

const Header = ({ selectedButton, handleButtonClick, isGridView, toggleView, currentFolderId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className='bg-white max-w-full rounded-t-xl '>
      <div className='mx-auto p-4'>
        <div className='flex'>
          <h1 className='text-2xl text-gray-800 font-bold pl-3 pr-1'>
            {' '}
            {currentUser
              ? `${getGreeting()}, ${currentUser.firstname} ${currentUser.lastname}`
              : 'Iskobox'}
          </h1>
        </div>

        <div className='flex p-3'>
          <div className='flex gap-1'>
            <FileFolderButton
              selectedButton={selectedButton}
              handleButtonClick={handleButtonClick}
            />
            <AddNewButton parentId={currentFolderId} />
          </div>

          <div className='flex justify-end gap-2 w-full'>
            <ToggleViewButton isGridView={isGridView} toggleView={toggleView} />
          </div>
        </div>
      </div>
      {isModalOpen && <FolderTagModal folderId={currentFolderId} onClose={toggleModal} />}
    </div>
  );
};

export default Header;
