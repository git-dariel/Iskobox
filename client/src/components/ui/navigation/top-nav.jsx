import UserProfile from '@/pages/users/user-profile';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../search';

const TopNavigation = () => {
  return (
    <div className="bg-gray-100 shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-1 lg:px-2">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* can put some content here*/}
              
            </div>
            <div className="hidden sm:flex sm:items-center sm:ml-6 sm:space-x-8">
              {/* Navigation tabs */}
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-800">
                Home
              </Link>
              <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-800">
                Dashboard
              </Link>
              <Link to="/workspace" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-800">
                Workspace
              </Link>
            </div>
          </div>
          {/* Add any additional elements like user profile, notifications, etc. */}
          <SearchForm/>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <UserProfile/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;