import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../database/firebase-connection";

// Fetch folders with file counts
export const fetchFolders = async (parentId = null) => {
  try {
    const folderQuery = query(
      collection(db, "folders"),
      where("parentId", "==", parentId || null)
    );
    const folderSnapshot = await getDocs(folderQuery);
    const folders = await Promise.all(
      folderSnapshot.docs.map(async (doc) => {
        const folderData = {
          id: doc.id,
          ...doc.data(),
          subfolders: [], // Initialize subfolders array
          files: [], // Initialize files array
        };

        // Fetch subfolders recursively
        folderData.subfolders = await fetchFolders(doc.id);

        // Fetch files within this folder
        const fileQuery = query(
          collection(db, "files"),
          where("folderId", "==", doc.id)
        );
        const fileSnapshot = await getDocs(fileQuery);
        folderData.files = fileSnapshot.docs.map((fileDoc) => ({
          id: fileDoc.id,
          ...fileDoc.data(),
        }));

        return folderData;
      })
    );

    return folders;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

// Add folder with upload limit
export const addFolder = async (folderData) => {
  try {
    const docRef = await addDoc(collection(db, "folders"), {
      ...folderData,
      uploadLimit: folderData.uploadLimit || 10, // default upload limit if not specified
    });
    return { id: docRef.id, ...folderData, subfolders: [], fileCount: 0 };
  } catch (error) {
    console.error("Error adding folder:", error);
    throw error;
  }
};

// Delete folder
export const deleteFolder = async (folderId) => {
  try {
    await deleteDoc(doc(db, "folders", folderId));
  } catch (error) {
    console.error("Error deleting folder:", error);
    throw error;
  }
};

// Update folder name
export const updateFolderName = async (folderId, newName) => {
  try {
    const folderRef = doc(db, "folders", folderId);
    await updateDoc(folderRef, { name: newName });
  } catch (error) {
    console.error("Error updating folder name:", error);
    throw error;
  }
};

// Fetch folder details
export const fetchFolderDetails = async (folderId) => {
  try {
    const folderDocRef = doc(db, "folders", folderId);
    const folderDoc = await getDoc(folderDocRef);
    if (folderDoc.exists()) {
      return { id: folderDoc.id, ...folderDoc.data() };
    } else {
      console.log("No such folder!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching folder details:", error);
    throw error;
  }
};

export const processFolder = (folder) => {
  // Dummy calculation for usage percentage
  const totalFiles = folder.fileCount || 0; // Assume fileCount is available
  const maxFileCount = 100; // Example max count
  const usagePercentage = (totalFiles / maxFileCount) * 100;

  return {
    ...folder,
    usagePercentage: Math.min(usagePercentage, 100), // Cap at 100%
  };
};
