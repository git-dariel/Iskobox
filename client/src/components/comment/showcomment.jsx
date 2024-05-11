import React, { useState, useEffect } from 'react';
import { fetchComments } from '@/services/comments/comments.service';

const CommentList = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments().then((fetchedComments) => {
            setComments(fetchedComments);
        });
    }, []);

s
    return (
        <div>
            <h2 className="text-lg font-bold mb-2">Comments:</h2>
            {comments && comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded mb-2">{comment.text}</div>
            ))}a
        </div>
    );
}

export default CommentList;