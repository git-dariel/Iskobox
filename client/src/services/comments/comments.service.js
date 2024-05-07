import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../database/firebase-connection';

// Create a new comment
export const addNewComment = async (commentData) => {
  try {
    const docRef = await addDoc(collection(db, 'comments'), commentData);
    return { id: docRef.id, ...commentData };
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Fetch all comments
export const fetchComments = async () => {
  try {
    const commentsSnapshot = await getDocs(collection(db, 'comments'));
    return commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    await deleteDoc(doc(db, 'comments', commentId));
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

// Update a comment
export const updateComment = async (commentId, updateData) => {
  try {
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, updateData);
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

// Fetch a single comment details
export const fetchCommentDetails = async (commentId) => {
  try {
    const commentDocRef = doc(db, 'comments', commentId);
    const commentDoc = await getDoc(commentDocRef);
    if (commentDoc.exists()) {
      return { id: commentDoc.id, ...commentDoc.data() };
    } else {
      console.log('No such comment!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching comment details:', error);
    throw error;
  }
};
