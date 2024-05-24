import React from "react";
import CommentList from "./showcomment";
import CommentButton from "./commentbutton";

const CommentForm = () => {
  return (
    <div className="flex items-center justify-center select-none h-full">
      <div className="bg-white rounded-md   max-w-sm lg:max-w-xl min-w-[300px] overflow-hidden">
        <div className="flex justify-between items-center gap-10 px-4 py-5 border-b border-gray-200 sm:px-6">
       
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
               Notes
              </h3>
            </div>

            <div>
              <CommentButton />
            </div>
          
        </div>
        <div>
          <CommentList />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
