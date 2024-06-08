import { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const CustomNavLink = () => {
  return (
    <>
      <RouterNavLink to="/homepage">Home</RouterNavLink>
      <RouterNavLink to="/about">About PUP Lopez</RouterNavLink>
      <RouterNavLink to="/certificate">Certificate of Authenticity</RouterNavLink>
      <RouterNavLink to="/programs">Programs Under Survey</RouterNavLink>
      <RouterNavLink to="/exhibits">Exhibit</RouterNavLink>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`min-w-[200px] w-full flex justify-end ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="hidden md:flex w-full">
          <CustomNavLink />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <FaTimes /> : <FaBars />}</button>
        </div>
      </nav>

      {isOpen && (
        <div className="flex flex-col fixed top-0 left-0 w-[40%] h-full border-r-gray-900">
          <CustomNavLink className="p-4 border-b-2"/>
        </div>
      )}
    </>
  );
};

export default Nav;