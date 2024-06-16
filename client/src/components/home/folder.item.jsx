import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcFolder } from 'react-icons/fc';
import { MdDelete, MdMoreVert } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineTag } from 'react-icons/ai';
import { deleteFolder, removeAssigneeFromFolder } from '../../services/folders/folder.service';
import { Toaster, toast } from 'sonner';
import { useUpdate } from '@/helpers/update.context';
import { useAuth } from '@/helpers/auth.context';
import UpdateFolderForm from '../modals/update.folder';
import FolderTagModal from '../modals/folder.tag';

const FolderItem = ({ folder, onDoubleClick, isGridView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isRemoveAssigneeModalOpen, setIsRemoveAssigneeModalOpen] = useState(false);
  const [assigneeToRemove, setAssigneeToRemove] = useState(null);
  const dropdownRef = useRef(null);
  const { triggerUpdate } = useUpdate();
  const { currentUser } = useAuth();

  const isFaculty = currentUser?.role === 'Faculty';

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
    if (isFaculty) {
      toast.info('Faculty members cannot delete folders.');
      return;
    }

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

  const openRemoveAssigneeModal = () => {
    setIsRemoveAssigneeModalOpen(true);
  };

  const handleRemoveAssignee = async (assignee) => {
    setIsRemoveAssigneeModalOpen(false);

    const removeProcess = async () => {
      await removeAssigneeFromFolder(folder.id, assignee);
      triggerUpdate();
      return 'Assignee removed successfully';
    };

    toast.promise(removeProcess(), {
      loading: 'Removing assignee...',
      success: 'Assignee removed successfully',
      error: (err) => `Failed to remove assignee: ${err.message}`,
    });
  };

  const folderUrl = `/folders/${folder.id}`;

  const getInitials = (email) => {
    const nameParts = email.split('@')[0].split('.');
    return nameParts.map((part) => part[0].toUpperCase()).join('');
  };

  return (
    <>
      <Toaster richColors />
      <div className='relative'>
        <Link to={folderUrl} onClick={null}>
          <div
            className={`cursor-default p-4 ${
              isGridView
                ? 'flex m-2 py-5 pr-1 pl-2 bg-[#F0F4F9] hover:bg-gray-200 rounded-lg'
                : 'flex w-full border-b'
            } text-sm flex items-center p-[0.30rem] justify-between space-x-2 border-gray-200 hover:bg-gray-100 cursor-pointer`}
            onDoubleClick={handleDoubleClick}
          >
            <div className='flex items-center w-1/3'>
              <FcFolder size={25} />
              <span className='truncate text-base pl-2 font-semibold'>{folder.name}</span>
            </div>
            <div
              className={`flex items-center w-1/3 space-x-1 text-gray-500 text-xs ${
                isGridView ? '' : ''
              }`}
            >
              {folder.assignees && folder.assignees.length > 0 ? (
                folder.assignees.map((assignee) => (
                  <div key={assignee.userId} className='flex items-center space-x-1'>
                    <div className='w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center'>
                      <span className='text-xs font-medium'>{getInitials(assignee.userId)}</span>
                    </div>
                    <span>{assignee.name}</span>
                  </div>
                ))
              ) : (
                <span>No assignee</span>
              )}
            </div>
            <div className='flex items-center w-1/3 space-x-1 text-gray-500 text-xs'>
              <span>{new Date(folder.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={`relative ${isGridView ? 'self-end' : ''}`} ref={dropdownRef}>
              <MdMoreVert
                size={20}
                className={`cursor-pointer hover:bg-gray-300 rounded-full transition-all duration-150 ${
                  isGridView ? 'mt-[-2.5rem]' : ''
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
                  <button
                    className={`flex items-center w-full px-4 pt-3 pb-3 text-sm text-gray-700 hover:bg-gray-100 ${
                      isFaculty ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={toggleModal}
                    disabled={isFaculty}
                  >
                    <FiEdit size={20} className='mr-2' />
                    Edit
                  </button>
                  <button
                    className={`flex items-center w-full px-4 pt-2 pb-3 text-sm text-red-600 hover:bg-gray-100 ${
                      isFaculty ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={openModal}
                    disabled={isFaculty}
                  >
                    <MdDelete size={20} className='mr-2' />
                    Delete
                  </button>
                  <button
                    className={`flex items-center w-full px-4 pt-2 pb-3 text-sm text-blue-600 hover:bg-gray-100 ${
                      isFaculty ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={openTagModal}
                    disabled={isFaculty}
                  >
                    <AiOutlineTag size={20} className='mr-2' />
                    Assign
                  </button>
                  {folder.assignees &&
                    folder.assignees.map((assignee) => (
                      <button
                        key={assignee.userId}
                        className={`flex items-center w-full px-4 pt-2 pb-3 text-sm text-gray-700 hover:bg-gray-100 ${
                          isFaculty ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => {
                          setIsRemoveAssigneeModalOpen(true);
                          setAssigneeToRemove(assignee);
                        }}
                        disabled={isFaculty}
                      >
                        <MdDelete size={20} className='mr-2' />
                        Remove {assignee.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </Link>

        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
            <div className='bg-gray-300 p-8 rounded-lg shadow-2xl'>
              <h2 className='text-xl font-semibold mb-6'>Delete {folder.name}</h2>
              <p className='mb-4'>Are you sure you want to delete the folder "{folder.name}"?</p>
              <div className='flex justify-end space-x-4'>
                <button
                  onClick={handleDelete}
                  className='px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors'
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className='px-6 py-2 border bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors'
                >
                  Cancel
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

        {isRemoveAssigneeModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
            <div className='bg-gray-300 p-8 rounded-lg shadow-2xl'>
              <h2 className='text-xl font-semibold mb-6'>Confirm Removal</h2>
              <p className='mb-4'>Are you sure you want to remove {assigneeToRemove?.name}?</p>
              <div className='flex justify-end space-x-4'>
                <button
                  className='px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors'
                  onClick={() => handleRemoveAssignee(assigneeToRemove)}
                >
                  Remove
                </button>
                <button
                  className='px-6 py-2 border bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors'
                  onClick={() => setIsRemoveAssigneeModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FolderItem;
