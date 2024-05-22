import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcFolder } from 'react-icons/fc';
import TicketModal from '../notification/addticket/ticketmodal';
import CommentButton from '../comment/commentbutton';
import CircleButton from '../common/buttons/reusable/circle.button';
import { MdDelete } from 'react-icons/md';
import { deleteFolder } from '../../services/folders/folder.service';
import { Toaster, toast } from 'sonner';
import { useUpdate } from '@/helpers/update.context';
import { bouncy } from 'ldrs';

const FolderItem = ({ folder, onDoubleClick, isGridView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { triggerUpdate } = useUpdate();
  const [loading, setLoading] = useState(false);
  bouncy.register();

  const handleDoubleClick = () => {
    onDoubleClick(folder.id);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteFolder(folder.id);
      toast.success('Folder removed');
      triggerUpdate();
    } catch (error) {
      console.error('Error deleting folder:', error);
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
          className={`cursor-default px-1 py-2 ${
            isGridView ? 'flex-col m-2 p-2 border' : 'flex w-full border-b'
          } text-sm flex items-center space-x-2 border-gray-200 hover:bg-gray-100`}
          onDoubleClick={handleDoubleClick}
        >
          <FcFolder size={30} />
          <div className='flex flex-row w-full justify-between items-center'>
            <div className=' gap-1'>
              <span className='truncate'>{folder.name + ' '}</span>
              <span className='ml-auto'>{displayLimit}</span>
              <CircleButton title={'Remove'} icon={<MdDelete size={18} />} onClick={openModal} />
            </div>
            <div className='flex gap-1 mr-10'>
              {/* <div>
                <TicketModal />
              </div> */}
              <div>
                <CommentButton />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='bg-gray-100 p-8 rounded-lg shadow-2xl'>
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
                    className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'
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
    </>
  );
};

export default FolderItem;
