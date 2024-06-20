import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/helpers/auth.context";
import { dummyProfile } from "../../test/mocked-data/user";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { menuItems, avatarSrc } = dummyProfile;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {}
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="relative ml-4" ref={dropdownRef}>
      {/* Toggle Profile */}
      <button id="avatarButton" type="button" onClick={toggleDropdown}>
        <img
          src={avatarSrc}
          alt="User dropdown"
          className="rounded-full min-w-10 min-h-10 border-gray-300 border-4 hover:border-blue-200 transition-all ease-in-out duration-150 active:border-blue-300"
        />
      </button>

      {/* Dropdown menu */}
      <div
        id="userDropdown"
        className={`z-20 absolute top-full right-0 mt-2 ${
          isOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>
            {currentUser.firstname} {currentUser.lastname}
          </div>
          <div className="text-sm truncate">{currentUser.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="py-1">
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
