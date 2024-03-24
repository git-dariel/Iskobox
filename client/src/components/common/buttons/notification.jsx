import React from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";

function Notification({ hasNotification }) {
  return (
    <div className="relative">
      <div className="flex flex-col h-10 w-10 items-center justify-center text-gray-500">
        <HiOutlineBellAlert size={23} />
        {!hasNotification && ( //temporarily added ! to see stylings
          <div className="absolute top-[4px] right-[5px] bg-red-500 rounded-full h-[7px] w-[7px]"></div>
        )}
      </div>
    </div>
  );
}

export default Notification;
