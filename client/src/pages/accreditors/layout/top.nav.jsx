import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoChevronDownOutline } from "react-icons/io5";

const Navbar = ({ logo, navTitle, navItems }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRefs = useRef([]);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRefs.current[openDropdownIndex] &&
      !dropdownRefs.current[openDropdownIndex].contains(event.target)
    ) {
      setOpenDropdownIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownIndex]);

  return (
    <nav className="absolute w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-30">
      <div className="flex flex-wrap w-full items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="w-10 h-10 border rounded-full p-1" />
          <span className="self-center text-lg whitespace-nowrap dark:text-white">
            {navTitle}
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex relative flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navItems.map((item, index) => (
              <li key={index} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                    >
                      {item.name}
                      <IoChevronDownOutline className="ml-2" />
                    </button>
                    <div
                      ref={(el) => (dropdownRefs.current[index] = el)}
                      className={`${
                        openDropdownIndex === index ? "block" : "hidden"
                      } absolute right-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-400"
                        aria-labelledby={`dropdownNavbarLink-${index}`}
                      >
                        {item.items.map((dropdownItem, dropdownIndex) => (
                          <li key={dropdownIndex}>
                            <Link
                              to={dropdownItem.to}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {dropdownItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.to}
                    className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                      item.current
                        ? "bg-blue-700 text-white md:bg-transparent md:text-blue-700 dark:bg-blue-600 md:dark:bg-transparent md:dark:text-blue-500"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
