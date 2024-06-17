import React from "react";
import Divider from "./divider";
import { Link } from "react-router-dom";

const PortalSection = ({ sectionTitle, folderImage, portalLink }) => {
  return (
    <section className="flex flex-col w-full">
      <Divider sectionTitle={sectionTitle} />
      <div>
        <div className="relative w-full bg-gradient-to-r from-amber-300 to-yellow-50 overflow-hidden">
          {/* Dark Green Shape (Top Left) */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-green-900 transform -rotate-12"></div>
          {/* Yellow Shape (Bottom Left) */}
          <div className="absolute top-16 left-0 w-72 h-40 bg-yellow-500 transform -rotate-12"></div>
          {/* Title Container */}
          <div className="flex justify-center items-center w-full h-full p-5 pb-0">
            <Link
              to={portalLink}
              className="flex items-center justify-center max-w-fit"
            >
              <img src={folderImage} className="w-3/4 min-w-md" alt="Folder" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalSection;
