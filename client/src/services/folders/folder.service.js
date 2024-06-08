import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  where,
  query,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../../database/firebase-connection';

// Fetch folders with file counts
export const fetchFolders = async (parentId = null) => {
  try {
    let folderQuery;
    if (parentId === undefined || parentId === null) {
      // Fetch root folders where parentId does not exist or is explicitly null
      folderQuery = query(collection(db, 'folders'), where('parentId', '==', null));
    } else {
      // Fetch subfolders where parentId matches
      folderQuery = query(collection(db, 'folders'), where('parentId', '==', parentId));
    }

    const folderSnapshot = await getDocs(folderQuery);
    let folders = folderSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      subfolders: [],
    }));

    // Sort folders by createdAt from oldest to newest
    folders = folders.sort((a, b) => a.createdAt - b.createdAt);

    return folders;
  } catch (error) {
    console.error('Error fetching folders:', error);
    throw error;
  }
};

// Add folder with upload limit
export const addFolder = async (folderData) => {
  try {
    if (!folderData.name || folderData.name.length > 24 || /[^a-zA-Z0-9 ]/.test(folderData.name)) {
      throw new Error(
        'Invalid folder name. Ensure it is no longer than 24 characters and contains only alphanumeric characters and spaces.'
      );
    }
    // Check if parentId is undefined and exclude it if so
    const folderPayload = {
      ...folderData,
      createdAt: serverTimestamp(),
    };
    if (folderData.parentId === undefined) {
      delete folderPayload.parentId;
    }

    const docRef = await addDoc(collection(db, 'folders'), folderPayload);
    return { id: docRef.id, ...folderPayload, subfolders: [] };
  } catch (error) {
    console.error('Error adding folder:', error);
    throw error;
  }
};

// Recursive delete for folders and their contents
export const deleteFolder = async (folderId) => {
  try {
    // Delete all files in the folder
    const fileQuery = query(collection(db, 'files'), where('folderId', '==', folderId));
    const fileSnapshot = await getDocs(fileQuery);
    const fileDeletions = fileSnapshot.docs.map((fileDoc) =>
      deleteDoc(doc(db, 'files', fileDoc.id))
    );
    await Promise.all(fileDeletions);

    // Recursively delete subfolders
    const subfolderQuery = query(collection(db, 'folders'), where('parentId', '==', folderId));
    const subfolderSnapshot = await getDocs(subfolderQuery);
    const subfolderDeletions = subfolderSnapshot.docs.map((subfolderDoc) =>
      deleteFolder(subfolderDoc.id)
    );
    await Promise.all(subfolderDeletions);

    // Delete the folder itself
    await deleteDoc(doc(db, 'folders', folderId));
  } catch (error) {
    console.error('Error deleting folder:', error);
    throw error;
  }
};

// Update folder details
export const handleUpdateFolder = async (folderId, updatedDetails) => {
  try {
    if (updatedDetails.name) {
      if (updatedDetails.name.length > 24 || /[^a-zA-Z0-9 ]/.test(updatedDetails.name)) {
        throw new Error(
          'Invalid folder name. Ensure it is no longer than 24 characters and contains only alphanumeric characters and spaces.'
        );
      }
    }

    const folderRef = doc(db, 'folders', folderId);
    await updateDoc(folderRef, updatedDetails);
    return { success: true };
  } catch (error) {
    console.error('Error updating folder:', error);
    throw error;
  }
};

// Fetch folder details
export const fetchFolderDetails = async (folderId) => {
  try {
    const folderDocRef = doc(db, 'folders', folderId);
    const folderDoc = await getDoc(folderDocRef);
    if (folderDoc.exists()) {
      const data = folderDoc.data();
      console.log('Folder Details:', data);
      return { id: folderDoc.id, ...data };
    } else {
      console.log('No such folder!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching folder details:', error);
    throw error;
  }
};

// Fetch folder details with upload limit
export const fetchFolderDetailsWithUploadLimit = async (folderId) => {
  try {
    const folderDocRef = doc(db, 'folders', folderId);
    const folderDoc = await getDoc(folderDocRef);
    if (folderDoc.exists()) {
      const data = folderDoc.data();
      console.log('Folder Details:', data);
      return { id: folderDoc.id, ...data };
    } else {
      console.log('No such folder!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching folder details:', error);
    throw error;
  }
};

export const processFolder = (folder) => {
  // Dummy calculation for usage percentage
  const totalFiles = folder.fileCount || 0;
  const maxFileCount = 100;
  const usagePercentage = (totalFiles / maxFileCount) * 100;

  return {
    ...folder,
    usagePercentage: Math.min(usagePercentage, 100),
  };
};

// Add an assignee to a folder
export const addAssigneeToFolder = async (folderId, assigneeData) => {
  try {
    const folderRef = doc(db, 'folders', folderId);
    await updateDoc(folderRef, {
      assignees: arrayUnion(assigneeData),
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding assignee to folder:', error);
    throw error;
  }
};

// Fetch folders assigned to a specific user
export const fetchFoldersForUser = async (userId) => {
  try {
    const folderQuery = query(collection(db, 'folders'));
    const folderSnapshot = await getDocs(folderQuery);
    const folders = folderSnapshot.docs.map((doc) => {
      const folderData = doc.data();
      const createdAt = folderData.createdAt
        ? new Date(folderData.createdAt.seconds * 1000)
        : new Date();
      return {
        id: doc.id,
        ...folderData,
        createdAt: createdAt,
      };
    });

    // Filter folders where assignees contain the userId
    const filteredFolders = folders.filter(
      (folder) =>
        folder.assignees && folder.assignees.some((assignee) => assignee.userId === userId)
    );

    console.log('Folders fetched for user:', filteredFolders);

    // Fetch files for these folders
    const files = [];
    for (const folder of filteredFolders) {
      const fileQuery = query(collection(db, 'files'), where('folderId', '==', folder.id));
      const fileSnapshot = await getDocs(fileQuery);
      const folderFiles = fileSnapshot.docs.map((doc) => {
        const fileData = doc.data();
        const fileCreatedAt = fileData.createdAt
          ? new Date(fileData.createdAt.seconds * 1000)
          : new Date();
        return {
          id: doc.id,
          ...fileData,
          createdAt: fileCreatedAt,
        };
      });
      files.push(...folderFiles);
    }

    return { folders: filteredFolders, files };

    return { folders: filteredFolders };
  } catch (error) {
    console.error('Error fetching folders for user:', error);
    throw error;
  }
};
