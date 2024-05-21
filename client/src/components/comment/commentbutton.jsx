import { addNewComment } from "@/services/comments/comments.service";
import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa6";

const CommentButton = () => {
  const [commentText, setCommentText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCommentSubmit = () => {
    const newCommentData = { text: commentText };
    addNewComment(newCommentData)
      .then((newComment) => {
        console.log("New comment added:", newComment);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
    setCommentText("");
    setShowModal(false); // Close the modal after submitting a comment
  };

  return (
    <div className="select-none">
      <div className="border-2 rounded-full h-auto bg-white hover:bg-blue-700 p-1 pt-1 ">
        <button
          onClick={() => setShowModal(true)}
          className="w-4 h-4 rounded-full flex justify-center items-center"
          title="Comment" 
        >
          <FaRegComment />
        </button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out">
              <div className="bg-white rounded-md shadow-lg max-w-sm lg:max-w-xl w-full overflow-hidden">
                <div className="flex justify-between px-4 py-5 border-b border-gray-200 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Comment
                  </h3>
                  {/* <CircleButton title={'Close modal'} icon={<IoClose />} onClick={handleCloseModal} /> */}
                </div>
                <div className="px-4 py-5 space-y-6 sm:p-6">
                  <div className="relative w-full min-w-[200px] h-auto">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-900"
                      placeholder=" "
                      required
                    ></textarea>
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
                      Write your comment here
                    </label>
                  </div>
                  <div className="gap-2 flex flex-row-reverse">
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl mt-2 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCommentSubmit}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentButton;
