import React, { useState, useEffect } from "react";
import { deleteComment, fetchComments } from "@/services/comments/comments.service";
import {toast} from 'sonner';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId)
      .then(() => {
        console.log("Comment deleted successfully");
        toast.success("Comment deleted successfully");
        setShowModal(false); 
        fetchComments().then((fetchedComments) => {
          setComments(fetchedComments);
        });
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        toast.error("Error deleting comment");
      });
  };

  useEffect(() => {
    fetchComments().then((fetchedComments) => {
      setComments(fetchedComments);
    });
  }, []);

  const handleCommentClick = (comment) => {
    setSelectedComment(comment);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-md max-w-sm lg:max-w-xl w-full overflow-hidden px-4 py-5">
      <div>
        {comments.map((comment, index) => (
          <div
            key={index}
            className="bg-gray-100 p-2 rounded mb-2"
            onClick={() => handleCommentClick(comment)}
          >
            <div>
              <h2>• {comment.folder}</h2>
              <div>
                <p className="pl-4">{comment.dateTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1>{selectedComment.folder}</h1>
            <p>{selectedComment.text}</p>
            <p>{selectedComment.dateTime}</p>

            <button onClick={() => handleDeleteComment(selectedComment.id)}>Delete</button>

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;
