import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/helpers/auth.context";
import { dummyProfile } from "../../test/mocked-data/user";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
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

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

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
            onClick={openLogoutModal}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
          >
            Sign out
          </button>
        </div>
      </div>
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout your account?</p>
            <div className="flex justify-end">
              <button
                onClick={closeLogoutModal}
                className="mr-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
