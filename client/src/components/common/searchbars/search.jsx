import { searchItems } from '@/services/search/search.service';
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiMic } from 'react-icons/fi';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        const results = await searchItems(searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleClickOutside = (event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      if (searchResults.length > 0) {
        setSearchTerm(searchResults[0].name);
      }
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchResults]);

  return (
    <div className='flex flex-col items-center'>
      <form className='flex items-center mx-auto h-auto' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='voice-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <FiSearch className='w-4 h-4 text-gray-500 dark:text-gray-400' />
          </div>
          <input
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-w-56 ps-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
        </div>
      </form>

      <div className='w-full max-w-xl relative' ref={searchResultsRef}>
        {searchResults.length > 0 ? (
          <ul className='absolute z-30 w-full bg-white border border-gray-200 rounded-lg shadow-md py-2 px-1 dark:bg-gray-800 dark:border-gray-700'>
            {searchResults.map((result) => (
              <li
                key={result.id}
                className='p-2 border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 rounded-md'
              >
                {result.type === 'folder' ? '📁' : '📄'} {result.name}
              </li>
            ))}
          </ul>
        ) : searchTerm.trim() !== '' ? (
          <p className='absolute z-30 text-gray-500 dark:text-gray-400 text-sm'>No results found</p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchForm;
