import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({ folders }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500">
      <Link to="/">Home</Link>
      {folders.map((folder, index) => (
        <React.Fragment key={folder.id}>
          <FiChevronRight />
          <Link to={`/folders/${folder.id}`}>{folder.name}</Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
