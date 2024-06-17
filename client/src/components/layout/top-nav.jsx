import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchForm from '../common/searchbars/search';
import UserProfile from '@/components/users/user-profile';
import Notification from '../common/buttons/notification';

const tabs = [
  { path: '/home', text: 'Home' },
  { path: '/dashboard', text: 'Dashboard' },
];

const TopNavigation = ({ navigateToRoot, currentFolderId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleHomeClick = (event) => {
    event.preventDefault();
    if (location.pathname !== '/home' || currentFolderId !== null) {
      navigateToRoot();
    }
  };

  return (
    <div className='bg-[#f8fafd]'>
      <div className='min-w-full mx-auto px-4 sm:px-1 lg:px-2'>
        <div className='flex justify-between h-15 items-center'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>{/* Content */}</div>
          </div>
          <SearchForm onSearch={handleSearch} />
          <div className='flex items-center ml-6'>
            <Notification />
            <UserProfile />
          </div>
        </div>
        {searchResults.length > 0 && (
          <div className='absolute bg-white w-full shadow-md rounded-lg mt-2 p-4 z-20'>
            <ul>
              {searchResults.map((result) => (
                <li key={result.id} className='border-b py-2'>
                  {result.type === 'folder' ? '📁' : '📄'} {result.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavigation;
