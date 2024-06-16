import React from "react";
import footer_bg_image from "../../../assets/exhibit/footer_bg_image.png";
import {
  FaGlobe,
  FaFacebook,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer
      className="relative w-full h-64 bg-cover bg-center text-white flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${footer_bg_image})` }}
    >
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
      <div className="relative z-10 text-center">
        <h2 className="text-2xl font-bold">
          Polytechnic University of the Philippines - Lopez Branch
        </h2>
        <div className="flex justify-center space-x-4 my-4">
          {/* Icons */}
          <a href="#" className="text-white hover:text-gray-300">
            <FaGlobe size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <FaMapMarkerAlt size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <FaEnvelope size={24} />
          </a>
        </div>
        <p className="text-sm">
          Address: Yumul St. Burgos (Poblacion) 4316 Lopez, Quezon
        </p>
        <p className="text-sm">Academic Year 2022 - 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
