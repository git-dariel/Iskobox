// Add this code to your commentbutton.jsx file
import { addNewComment } from '@/services/comments/comments.service';

import React, { useState } from 'react';

const CommentButton = () => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleCommentSubmit = () => {
        const newCommentData = { text: commentText };
        addNewComment(newCommentData).then((newComment) => {
            console.log('New comment added:', newComment);
        }).catch((error) => {
            console.error('Error adding comment:', error);
        });
        setCommentText('');
        setShowModal(false); // Close the modal after submitting a comment
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Comment</button>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="block w-full h-32 bg-gray-100 mt-2 p-2 rounded"
                            placeholder="Write your comment here"
                        ></textarea>
                        <button onClick={handleCommentSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Submit</button>
                    </div>
                </div>
            )}
            <div>
                <h2 className="text-lg font-bold mb-2">Comments:</h2>
                {comments.map((comment, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded mb-2">{comment.text}</div>
                ))}
            </div>
        </div>
    );
}

export default CommentButton;