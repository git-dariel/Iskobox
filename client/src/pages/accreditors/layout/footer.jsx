import React from "react";
import footer_bg_image from "../../../assets/exhibit/footer_bg_image.png";
import common from "@/configs/common.config";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  return (
    <footer
      className="relative w-full min-h-64 bg-cover bg-center text-white flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${footer_bg_image})` }}
    >
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
      <div className="relative z-10 text-center">
        <h2 className="text-base md:text-2xl font-bold">
          Polytechnic University of the Philippines - Lopez Campus
        </h2>
        <div className="flex justify-center space-x-4 my-4">
          {/* Icons */}
          {common.footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="text-white hover:text-gray-300"
              target={link.type === "external" ? "_blank" : "_self"}
              rel={link.type === "external" ? "noopener noreferrer" : ""}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-sm">Address: Yumul St. Burgos (Poblacion) 4316 Lopez, Quezon</p>
        <p className="text-sm">
          Academic Year {lastYear} - {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
