import React from "react";
import Divider from "./divider";
import { Link } from "react-router-dom";

const PortalSection = ({ sectionTitle, folderImage, portalLink }) => {
  return (
    <section className="relative flex flex-col w-full">
      <Divider sectionTitle={sectionTitle} />
      <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
        <div className="bg-gradient-to-r from-amber-300 to-yellow-50 rounded-lg p-4">
          {/* Dark Green Shape (Top Left) */}
          <div className="absolute top-0 left-0 w-36 md:w-40 h-36 md:h-40 bg-green-900 transform -rotate-12 rounded-full"></div>
          {/* Yellow Shape (Bottom Left) */}
          <div className="absolute bottom-0 left-0 w-56 md:w-72 h-20 md:h-32 bg-yellow-500 transform -rotate-12 rounded-full"></div>
          {/* Title Container */}
          <div className="flex justify-center items-center w-full h-full">
            <Link
              to={portalLink}
              className="flex items-center justify-center max-w-fit">
              <img
                src={folderImage}
                className="w-3/4 md:w-3/4 min-w-md rounded-lg z-10"
                alt="Folder"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalSection;
