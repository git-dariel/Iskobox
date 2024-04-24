import { createFirestoreFunctionsForCollection } from '../template.service';

const commentOperations = createFirestoreFunctionsForCollection('comments');

// Fetch Comments
export const fetchComments = async () => {
  const comments = await commentOperations.fetchDocuments();
  console.log(comments);
};

// Add Comment
export const addNewComment = async (newCommentData) => {
  const newComment = await commentOperations.addDocument(newCommentData);
  console.log(newComment);
};

// Update Comment
export const updateComment = async (commentId, newValue) => {
  const updatedComment = await commentOperations.updateDocument(commentId, newValue);
  console.log(updatedComment);
};

// Delete Comment
export const deleteComment = async (commentId) => {
  await commentOperations.deleteDocument(commentId);
};
