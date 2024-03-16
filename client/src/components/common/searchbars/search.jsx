import React from 'react';
import { FiSearch, FiMic } from 'react-icons/fi';

const SearchForm = () => {
  return (
    <form className="flex items-center max-w-max mx-auto h-16">   
      <label htmlFor="voice-search" className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <FiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
          <FiMic className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
        </button>
      </div>
      <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-xs font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <FiSearch className="w-4 h-4 me-2" />
        Search
      </button>
    </form>
  );
};

export default SearchForm;
