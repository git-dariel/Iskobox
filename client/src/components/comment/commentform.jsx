import React from "react";
import CommentList from "./showcomment";
import CommentButton from "./commentbutton";



const CommentForm = () => {
  return (
    <div className="flex  select-none h-full border ">
      <div className="bg-white rounded-md  w-full max-w-sm lg:max-w-xl overflow-hidden">
        <div className="flex justify-between items-center gap-10 px-4 py-5 border-b border-gray-200 sm:px-6">
       
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
               Notes
              </h3>
            </div>

            <div >
              <CommentButton />
            </div>
          
        </div>
        <div className="overflow-y-scroll max-h-[400px]" style={{scrollbarWidth: "none"}}>
          <CommentList />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
