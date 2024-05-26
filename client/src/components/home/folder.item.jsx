import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcFolder } from 'react-icons/fc';
import CircleButton from '../common/buttons/reusable/circle.button';
import { deleteFolder } from '../../services/folders/folder.service';
import { Toaster, toast } from 'sonner';
import { useUpdate } from '@/helpers/update.context';
import { bouncy } from 'ldrs';
import { MdDelete } from 'react-icons/md';
import { FaUserAlt, FaFileAlt } from 'react-icons/fa';
import { FiEdit } from "react-icons/fi";
import UpdateFolderForm from '../modals/update.folder';

const FolderItem = ({ folder, onDoubleClick, isGridView, currentFolderId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const { triggerUpdate } = useUpdate();
  const [loading, setLoading] = useState(false);
  bouncy.register();

  const handleDoubleClick = () => {
    onDoubleClick(folder.id);
  };

  const toggleModal = () => {
    setIsModalOpenEdit(!isModalOpenEdit);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteFolder(folder.id);
      toast.success('Folder removed');
      triggerUpdate();
    } catch (error) {
      console.error('Error deleting folder:', error);
      toast.error('Failed to remove folder. Please try again.');
    } finally {
      setIsModalOpen(false);
      setLoading(false);
    }
  };

  const openModal = (e) => {
    e.preventDefault(); // Prevent link navigation
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const folderUrl = `/folders/${folder.id}`;
  const displayLimit = `${folder.fileCount}/${folder.uploadLimit}`;

  return (
    <>
      <Toaster />
      <Link to={folderUrl}>
        <div
          className={`cursor-default p-4 ${
            isGridView ? 'flex flex-col m-2 p-2 border' : 'flex w-full border-b'
          } text-sm flex items-center justify-between space-x-4 border-gray-200 hover:bg-gray-100 transition-all duration-150`}
          onDoubleClick={handleDoubleClick}
        >
          <div className='flex items-center w-full space-x-2'>
            <FcFolder size={40} />
            <div className='flex w-full flex-col'>
              <span className='truncate text-lg font-semibold'>{folder.name}</span>
              {!isGridView && (
                <div className='flex items-center w-full space-x-1 text-gray-500 text-xs'>
                  <FaUserAlt size={12} />
                  <span>Assignee</span>
                </div>
              )}
            </div>
          </div>
          {!isGridView && (
            <div className='ml-auto flex items-center space-x-6'>
              <div className='flex items-center space-x-1 text-gray-500'>
                <FaFileAlt size={16} />
                <span>{displayLimit}</span>
              </div>
              <CircleButton title={'Edit'} icon={<FiEdit size={20} />} onClick={toggleModal} />
              <CircleButton title={'Remove'} icon={<MdDelete size={20} />} onClick={openModal} />
            </div>
          )}
          {isGridView && (
            <div className='ml-auto'>
              <CircleButton title={'Edit'} icon={<FiEdit size={20} />} onClick={toggleModal} />
              <CircleButton title={'Remove'} icon={<MdDelete size={20} />} onClick={openModal} />
            </div>
          )}
        </div>
      </Link>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='bg-gray-300 p-8 rounded-lg shadow-2xl'>
            <h2 className='text-xl font-semibold mb-6'>Delete Folder</h2>
            {loading ? (
              <div className='flex justify-center items-center'>
                <l-bouncy size='40' color='black'></l-bouncy>
              </div>
            ) : (
              <>
                <p className='mb-4'>Are you sure you want to delete the folder "{folder.name}"?</p>
                <div className='flex justify-end space-x-4'>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='px-6 py-2 border bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    No
                  </button>
                  <button
                    onClick={handleDelete}
                    className='px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors'
                  >
                    Yes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {isModalOpenEdit && (
        <UpdateFolderForm 
          onClose={toggleModal} 
          folderDetails={{
            id: folder.id,
            name: folder.name,
            dueDate: folder.dueDate,
            uploadLimit: folder.uploadLimit,
          }}
        />
      )}
    </>
  );
};

export default FolderItem;
