import React, { useState, useEffect } from 'react';
import { getFileIcon, getFileType } from '../../helpers/file-helpers';
import { deleteFile, getFileUrl } from '../../services/files/file-service';
import { Toaster, toast } from 'sonner';
import CircleButton from '../common/buttons/reusable/circle.button';
import { MdDelete, MdDownload } from 'react-icons/md';
import { useUpdate } from '@/helpers/update.context';
import { bouncy } from 'ldrs';

const FileItem = ({ file, isGridView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { triggerUpdate } = useUpdate();
  bouncy.register();

  useEffect(() => {
    if (isModalOpen) {
      const fetchUrl = async () => {
        const url = await getFileUrl(file.id);
        setPreviewUrl(url);
      };
      fetchUrl();
    }
  }, [isModalOpen, file.id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteFile(file.id);
      toast.success('File deleted successfully');
      triggerUpdate();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file. Please try again.');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleDownload = async () => {
    const url = await getFileUrl(file.id);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    const fileType = getFileType(file.name);
    let url;
    if (fileType === 'docx') {
      url = `https://docs.google.com/gview?url=${encodeURIComponent(previewUrl)}&embedded=true`;
    } else {
      url = previewUrl;
    }
    window.open(url, '_blank');
  };

  const renderFileContent = () => {
    const fileType = getFileType(file.name);

    switch (fileType) {
      case 'image':
        return <img src={previewUrl} alt={file.name} className='max-w-full max-h-full' />;
      case 'pdf':
      case 'docx':
        return (
          <iframe
            src={
              fileType === 'pdf'
                ? previewUrl
                : `https://docs.google.com/gview?url=${encodeURIComponent(
                    previewUrl
                  )}&embedded=true`
            }
            className='w-full h-[80vh]'
            frameBorder='0'
          />
        );
      default:
        return <p>File format not supported for preview.</p>;
    }
  };

  const openDeleteModal = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Toaster />
      <div
        className={`${
          isGridView ? 'flex-col m-2 p-2 border' : 'w-full border-y'
        } text-sm flex items-center space-x-2 border-gray-200 hover:bg-gray-100`}
        onClick={() => {
          const fileType = getFileType(file.name);
          if (fileType === 'image' || fileType === 'pdf' || fileType === 'docx') {
            setIsModalOpen(true);
          } else {
            toast.error('File format not supported for preview.');
          }
        }}
      >
        {getFileIcon(file.name)}
        <span className='truncate'>{file.name}</span>
        <CircleButton
          title={'Delete'}
          icon={<MdDelete size={20} />}
          onClick={(e) => {
            e.stopPropagation();
            openDeleteModal(e);
          }}
        />
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div
            className={`bg-gray-200 p-4 rounded-lg shadow-xl overflow-auto ${
              getFileType(file.name) === 'image'
                ? 'max-w-3xl max-h-3xl'
                : 'w-full h-full max-w-none max-h-none'
            }`}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setPreviewUrl(null);
              }}
              className='absolute top-4 right-4 text-lg p-2 bg-gray-200 rounded-full hover:bg-gray-300  transition-colors hover:text-red-500'
            >
              ✖
            </button>
            {loading ? (
              <div className='flex justify-center items-center'>
                <l-bouncy size='40' color='black'></l-bouncy>
              </div>
            ) : (
              <>
                {renderFileContent()}
                <div className='flex justify-center mt-4 space-x-4'>
                  <button
                    onClick={handleOpenInNewTab}
                    className='px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800'
                  >
                    Open in New Tab
                  </button>
                  <button
                    onClick={handleDownload}
                    className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
                  >
                    Download
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='bg-gray-300 p-8 rounded-lg shadow-2xl'>
            <h2 className='text-xl font-semibold mb-6'>Delete File</h2>
            {loading ? (
              <div className='flex justify-center items-center'>
                <l-bouncy size='40' color='black'></l-bouncy>
              </div>
            ) : (
              <>
                <p className='mb-4'>Are you sure you want to delete the file "{file.name}"?</p>
                <div className='flex justify-end space-x-4'>
                  <button
                    onClick={closeDeleteModal}
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
    </>
  );
};

export default FileItem;
