import React from "react";
import { MdLink } from "react-icons/md";

const CopyLinkButton = () => {
  return (
    <>
      <button
        type="button"
        className="flex py-2.5 px-4 text-sm font-medium text-gray-800 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
      >
        <MdLink size={20} />
        <span className="ms-2">Copy link</span>
      </button>
    </>
  );
};

export default CopyLinkButton;
