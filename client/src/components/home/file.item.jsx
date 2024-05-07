import React from 'react';
import { getFileIcon } from '../../helpers/file-helpers'; // Import the helper function

const FileItem = ({ file, isGridView }) => {
  console.log('Rendering file:', file); // Debugging line to check what file is being rendered
  return (
    <div
      className={`${
        isGridView ? 'flex-col m-2 p-2 border' : 'w-full border-y'
      } text-sm flex items-center space-x-2 border-gray-200 hover:bg-gray-100`}
    >
      {getFileIcon(file.name)} {/* Use the getFileIcon function to display the correct icon */}
      <span className='truncate'>{file.name}</span>
    </div>
  );
};

export default FileItem;
