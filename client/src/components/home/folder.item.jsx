import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcFolder } from 'react-icons/fc';
import { MdDelete, MdMoreVert } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineTag } from 'react-icons/ai'; // Import icon for tagging
import { deleteFolder } from '../../services/folders/folder.service';
import { Toaster, toast } from 'sonner';
import { useUpdate } from '@/helpers/update.context';
import UpdateFolderForm from '../modals/update.folder';
import FolderTagModal from '../modals/folder.tag'; // Import the FolderTagModal

const FolderItem = ({ folder, onDoubleClick, isGridView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false); // State for FolderTagModal
  const dropdownRef = useRef(null);
  const { triggerUpdate } = useUpdate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDoubleClick = () => {
    onDoubleClick(folder.id);
  };

  const toggleModal = () => {
    setIsModalOpenEdit(!isModalOpenEdit);
  };

  const handleDelete = () => {
    const deleteProcess = async () => {
      await deleteFolder(folder.id);
      triggerUpdate();
      return 'Folder removed';
    };

    toast
      .promise(deleteProcess(), {
        loading: 'Removing folder...',
        success: 'Folder successfully removed',
        error: (err) => err.message || 'Failed to remove folder. Please try again.',
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const openTagModal = () => {
    setIsTagModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const folderUrl = `/folders/${folder.id}`;

  return (
    <>
      <Toaster richColors />
      <div className='relative'>
        <Link to={folderUrl} onClick={null}>
          <div
            className={`cursor-default p-4 ${
              isGridView ? 'flex flex-col m-2 p-2 border' : 'flex w-full border-b'
            } text-sm flex items-center justify-between space-x-4 border-gray-200 hover:bg-gray-100 transition-all duration-150`}
            onDoubleClick={handleDoubleClick}
          >
            <div className='flex items-center w-full space-x-2'>
              <FcFolder size={30} />
              <div className='flex w-full flex-col'>
                <span className='truncate text-lg font-semibold'>{folder.name}</span>
                <div className='flex items-center w-full space-x-1 text-gray-500 text-xs'>
                  <span>{new Date(folder.createdAt).toLocaleDateString()}</span>
                  <span>{folder.fileSize}</span>
                  {folder.assignee && (
                    <div className='flex items-center space-x-1'>
                      <div className='w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center'>
                        <span className='text-xs font-medium'>{folder.assignee.initials}</span>
                      </div>
                      <span>{folder.assignee.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='relative' ref={dropdownRef}>
              <MdMoreVert
                size={24}
                className='cursor-pointer'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
                  <button
                    className='flex items-center w-full px-4 pt-3 pb-3 text-sm text-gray-700 hover:bg-gray-100'
                    onClick={toggleModal}
                  >
                    <FiEdit size={20} className='mr-2' />
                    Edit
                  </button>
                  <button
                    className='flex items-center w-full px-4 pt-2 pb-3 text-sm text-red-600 hover:bg-gray-100'
                    onClick={openModal}
                  >
                    <MdDelete size={20} className='mr-2' />
                    Delete
                  </button>
                  <button
                    className='flex items-center w-full px-4 pt-2 pb-3 text-sm text-blue-600 hover:bg-gray-100'
                    onClick={openTagModal}
                  >
                    <AiOutlineTag size={20} className='mr-2' />
                    Assign
                  </button>
                </div>
              )}
            </div>
          </div>
        </Link>

        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
            <div className='bg-gray-300 p-8 rounded-lg shadow-2xl'>
              <h2 className='text-xl font-semibold mb-6'>Delete Folder</h2>
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
            </div>
          </div>
        )}
        {isModalOpenEdit && (
          <UpdateFolderForm
            onClose={toggleModal}
            folderDetails={{
              id: folder.id,
              name: folder.name,
              uploadLimit: folder.uploadLimit,
            }}
          />
        )}
        {isTagModalOpen && (
          <FolderTagModal folderId={folder.id} onClose={() => setIsTagModalOpen(false)} />
        )}
      </div>
    </>
  );
};
export default FolderItem;
