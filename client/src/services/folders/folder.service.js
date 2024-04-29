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
    const folders = folderSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      subfolders: [],
      fileCount: 0, // Initialize file count
    }));

    // Fetch all files and count them per folder
    const fileQuery = query(collection(db, "files"));
    const fileSnapshot = await getDocs(fileQuery);
    const fileCounts = {};
    fileSnapshot.forEach(file => {
      const folderId = file.data().folderId;
      if (folderId in fileCounts) {
        fileCounts[folderId]++;
      } else {
        fileCounts[folderId] = 1;
      }
    });

    // Assign file counts to folders
    folders.forEach(folder => {
      folder.fileCount = fileCounts[folder.id] || 0;
    });

    return folders;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

// // Fetch folders
// export const fetchFolders = async (parentId = null) => {
//   try {
//     const q = query(
//       collection(db, "folders"),
//       where("parentId", "==", parentId || null)
//     );
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//       subfolders: [], // Initialize subfolders as an empty array
//     }));
//   } catch (error) {
//     console.error("Error fetching folders:", error);
//     throw error;
//   }
// };

// Add folder
export const addFolder = async (folderData) => {
  try {
    const docRef = await addDoc(collection(db, "folders"), folderData);
    return { id: docRef.id, ...folderData, subfolders: [] }; // Initialize subfolders as an empty array
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
    usagePercentage: Math.min(usagePercentage, 100) // Cap at 100%
  };
};
