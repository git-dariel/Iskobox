import React from 'react';
import { FaListUl } from 'react-icons/fa6';
import { IoGrid } from 'react-icons/io5';

const ToggleViewButton = ({ isGridView, toggleView }) => {
  return (
    <button
      className='flex flex-row items-center justify-center text-sm px-3 py-1 border rounded bg-transparent hover:bg-gray-200 active:bg-blue-100'
      onClick={toggleView}
    >
      {isGridView ? (
        <>
          <FaListUl className='mr-1' />
          <span>List</span>
        </>
      ) : (
        <>
          <IoGrid className='mr-1' />
          <span>Grid</span>
        </>
      )}
    </button>
  );
};

export default ToggleViewButton;
