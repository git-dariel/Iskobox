import React, { useEffect, useRef, useState } from 'react';
import OvalButton from '../common/buttons/reusable/oval.button';
import { IoClose } from 'react-icons/io5';
import CircleButton from '../common/buttons/reusable/circle.button';
import { Toaster, toast } from 'sonner';

const NewFolderForm = ({ onClose, onCreate, parentId = null }) => {
  const modalRef = useRef(null);
  const [folderName, setFolderName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [uploadLimit, setUploadLimit] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderName || !dueDate || !uploadLimit) {
      return toast.error('Please fill all fields');
    }
    if (onCreate) {
      try {
        await onCreate({
          name: folderName,
          dueDate: dueDate,
          uploadLimit: parseInt(uploadLimit, 10),
          parentId: parentId,
        });
        onClose();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      console.error('onCreate function is not defined');
      toast.error('Creation function not available');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const incrementUploadLimit = () => {
    setUploadLimit(uploadLimit + 1);
  };

  const decrementUploadLimit = () => {
    if (uploadLimit > 0) {
      setUploadLimit(uploadLimit - 1);
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out'>
      <Toaster />
      <div
        ref={modalRef}
        className='bg-white rounded-md shadow-lg max-w-sm lg:max-w-xl w-full overflow-hidden'
      >
        <div className='flex justify-between px-4 py-5 border-b border-gray-200 sm:px-6'>
          <h3 className='text-lg text-gray-60'>Create New Folder</h3>
          <CircleButton title={'Close modal'} icon={<IoClose />} onClick={handleCloseModal} />
        </div>

        <form onSubmit={handleSubmit} className='px-4 py-5 space-y-6 sm:p-6'>
          <div className='relative w-full min-w-[200px] h-10'>
            <input
              className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-900'
              type='text'
              id='folderName'
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder=' '
              required
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
              Folder name
            </label>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label htmlFor='dueDate' className='block text-sm font-medium text-gray-700'>
                Due Date
              </label>
              <input
                type='date'
                id='dueDate'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='uploadLimit' className='block text-sm font-medium text-gray-700'>
                Upload Limit
              </label>
              <div className='relative flex items-center'>
                <button
                  type='button'
                  onClick={decrementUploadLimit}
                  className='bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'
                >
                  <svg
                    className='w-3 h-3 text-gray-900 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 2'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M1 1h16'
                    />
                  </svg>
                </button>
                <input
                  type='text'
                  id='uploadLimit'
                  value={uploadLimit}
                  readOnly
                  className='bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <button
                  type='button'
                  onClick={incrementUploadLimit}
                  className='bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'
                >
                  <svg
                    className='w-3 h-3 text-gray-900 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 18'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 1v16M1 9h16'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <OvalButton text={'Create'} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFolderForm;
