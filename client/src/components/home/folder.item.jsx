import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcFolder } from "react-icons/fc";
import CircleButton from '../common/buttons/reusable/circle.button';
import { MdDelete } from 'react-icons/md';
import { deleteFolder } from '../../services/folders/folder.service';
import { Toaster, toast } from 'sonner';

const FolderItem = ({ folder, isGridView, onDoubleClick, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDoubleClick = () => {
    onDoubleClick(folder.id);
  };

  const handleDelete = async () => {
    try {
      await deleteFolder(folder.id);
      toast.success('Folder removed');
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error deleting folder:', error);
    } finally {
      setIsModalOpen(false);
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
          className={`cursor-default px-1 py-2 ${
            isGridView ? "flex-col m-2 p-2 border" : "flex w-full border-b"
          } text-sm flex items-center space-x-2 border-gray-200 hover:bg-gray-100`}
          onDoubleClick={handleDoubleClick}
        >
          <FcFolder size={30} />
          <span className="truncate">{folder.name}</span>
          <span className="ml-auto">{displayLimit}</span>
          <CircleButton title={'Remove'} icon={<MdDelete size={18} />} onClick={openModal} />
        </div>
      </Link>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Delete Folder</h2>
            <p>Are you sure you want to delete the folder "{folder.name}"?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FolderItem;