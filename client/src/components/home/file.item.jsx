import React, { useState, useEffect, useRef } from 'react';
import { getFileIcon, getFileType } from '../../helpers/file-helpers';
import { deleteFile, getFileUrl } from '../../services/files/file-service';
import { Toaster, toast } from 'sonner';
import CircleButton from '../common/buttons/reusable/circle.button';
import { MdDelete, MdDownload, MdMoreVert } from 'react-icons/md';
import { useUpdate } from '@/helpers/update.context';

const FileItem = ({ file, isGridView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { triggerUpdate } = useUpdate();

  useEffect(() => {
    if (isModalOpen) {
      const fetchUrl = async () => {
        const url = await getFileUrl(file.id);
        setPreviewUrl(url);
      };
      fetchUrl();
    }
  }, [isModalOpen, file.id]);

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

  const handleDelete = async () => {
    toast.promise(deleteFile(file.id), {
      loading: 'Deleting file...',
      success: () => {
        toast.success('File deleted successfully');
        triggerUpdate();
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
        return 'File deleted successfully';
      },
      error: (err) => {
        console.error('Error deleting file:', err);
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
        return `Failed to delete file. Please try again. ${err.message}`;
      },
    });
  };

  const handleDownload = async () => {
    const url = await getFileUrl(file.id);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.name);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenMedia = async () => {
    toast.promise(getFileUrl(file.id), {
      loading: 'Opening media...',
      success: (url) => {
        window.open(url, '_blank');
        return 'Media opened successfully';
      },
      error: (err) => {
        console.error('Error opening media:', err);
        return `Failed to open media. Please try again. ${err.message}`;
      },
    });
  };

  const renderFileContent = () => {
    const fileType = getFileType(file.name);

    switch (fileType) {
      case 'image':
        return (
          <img
            src={previewUrl}
            alt={file.name}
            style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
          />
        );
      case 'pdf':
      case 'docx':
      case 'pptx':
      case 'xlsx':
        return (
          <iframe
            src={
              fileType === 'pdf'
                ? previewUrl
                : `https://docs.google.com/gview?url=${encodeURIComponent(
                    previewUrl
                  )}&embedded=true`
            }
            className='w-full h-[90vh]'
            frameBorder='0'
          />
        );
      default:
        return <p>File format not supported for preview.</p>;
    }
  };

  return (
    <>
      <Toaster richColors />
      <div
        className={`${
          isGridView ? 'flex-col m-2 p-2 border' : 'w-full border-y'
        } text-sm flex items-center p-1 justify-between space-x-2 border-gray-200 hover:bg-gray-100 cursor-pointer`}
        onClick={() => {
          const fileType = getFileType(file.name);
          if (fileType === 'image' || fileType === 'pdf' || fileType === 'docx') {
            setIsModalOpen(true);
          } else if (fileType === 'video' || fileType === 'audio') {
            handleOpenMedia();
          } else {
            toast.error('File format not supported for preview.');
          }
        }}
      >
        {getFileIcon(file.name)}
        <span className='truncate flex-grow'>{file.name}</span>
        <div className={`relative ${isGridView ? 'self-end' : ''}`} ref={dropdownRef}>
          <MdMoreVert
            size={20}
            className={`cursor-pointer hover:bg-gray-300 rounded-full transition-all duration-150 ${
              isGridView ? 'mt-[-3.4rem]' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          />
          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
              <button
                className='flex items-center w-full px-4 pt-2 pb-3 text-sm text-red-600 hover:bg-gray-100'
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(true);
                }}
              >
                <MdDelete size={20} className='mr-2' />
                Delete
              </button>
              <button
                className='flex items-center w-full px-4 pt-2 pb-3 text-sm text-blue-600 hover:bg-gray-100'
                onClick={handleDownload}
              >
                <MdDownload size={20} className='mr-2' />
                Download
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div
            className={`bg-slate-500 rounded-lg shadow-xl overflow-auto ${
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
              className='absolute top-4 right-4 text-lg p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors hover:text-red-500'
            >
              ✖
            </button>
            {renderFileContent()}
            <div className='flex justify-center my-2 space-x-4'>
              <button
                onClick={() => window.open(previewUrl, '_blank')}
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
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='bg-gray-300 p-8 rounded-lg shadow-2xl'>
            <h2 className='text-xl font-semibold mb-6'>Delete File</h2>
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
          </div>
        </div>
      )}
    </>
  );
};

export default FileItem;
