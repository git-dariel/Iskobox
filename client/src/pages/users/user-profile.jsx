import dummyProfile from '@/dummy-data/data';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router


const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, email, menuItems } = dummyProfile;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
        {/* Toggle Profile */}
      <button
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
      >
        <img src="https://scontent.fmnl3-2.fna.fbcdn.net/v/t39.30808-1/418782011_3598003387134419_4388420038133548678_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFP0-u_t7dUJQSe3c0K738bDyyzb0mVKZUPLLNvSZUplfJ-9_LgR3S91HgQ0QQnbuMX4EDNRGVVHiGELeTRJgO5&_nc_ohc=WKQqnmH3fB8AX9i7IGj&_nc_ht=scontent.fmnl3-2.fna&oh=00_AfAyd-zioGG21hZHTfL6_p_TpFJmF0Gs0NgaC4UnPJMpQg&oe=65EFCD07"
        alt="User dropdown"
        className='rounded-full' />
      </button>

      {/* Dropdown menu */}
      <div
        id="userDropdown"
        className={`z-10 absolute top-full right-0 mt-2 ${isOpen ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{name}</div>
          <div className="text-sm truncate">{email}</div>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.link} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="py-1">
          <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
