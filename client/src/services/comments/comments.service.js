import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../database/firebase-connection";
import { logActivity } from "@/middleware/activity.logging";

// Create a new comment
export const addNewComment = async (commentData) => {
  try {
    if (
      !commentData.folder ||
      commentData.folder.length > 24 ||
      /[^a-zA-Z0-9 ]/.test(commentData.folder)
    ) {
      throw new Error(
        "Invalid folder name. Ensure it is no longer than 24 characters and contains only alphanumeric characters and spaces."
      );
    }

    if (!commentData.text || commentData.text.length > 200) {
      throw new Error("Comment text too long. Ensure it is no longer than 200 characters.");
    }
    const docRef = await addDoc(collection(db, "comments"), commentData);
    await logActivity("Add comment", { commentId: docRef.id, folder: commentData.folder });
    return { id: docRef.id, ...commentData };
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Fetch all comments
export const fetchComments = async () => {
  try {
    const commentsSnapshot = await getDocs(collection(db, "comments"));
    const sortedComments = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return sortedComments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    await deleteDoc(doc(db, "comments", commentId));
    await logActivity("Delete comment", { commentId });
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

// Update a comment
export const updateComment = async (commentId, updateData) => {
  try {
    if (
      updateData.folder &&
      (updateData.folder.length > 24 || /[^a-zA-Z0-9 ]/.test(updateData.folder))
    ) {
      throw new Error(
        "Invalid folder name. Ensure it is no longer than 24 characters and contains only alphanumeric characters and spaces."
      );
    }
    if (updateData.text && updateData.text.length > 200) {
      throw new Error("Comment text too long. Ensure it is no longer than 200 characters.");
    }

    const commentRef = doc(db, "comments", commentId);
    await updateDoc(commentRef, updateData);
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

// Fetch a single comment details
export const fetchCommentDetails = async (commentId) => {
  try {
    const commentDocRef = doc(db, "comments", commentId);
    const commentDoc = await getDoc(commentDocRef);
    if (commentDoc.exists()) {
      return { id: commentDoc.id, ...commentDoc.data() };
    } else {
      console.log("No such comment!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching comment details:", error);
    throw error;
  }
};
