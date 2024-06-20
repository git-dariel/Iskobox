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
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../database/firebase-connection";

export const fetchFolders = async (parentId = null) => {
  try {
    let folderQuery;
    if (parentId === undefined || parentId === null) {
      folderQuery = query(collection(db, "folders"), where("parentId", "==", null));
    } else {
      folderQuery = query(collection(db, "folders"), where("parentId", "==", parentId));
    }

    const folderSnapshot = await getDocs(folderQuery);
    let folders = folderSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      subfolders: [],
    }));

    folders = folders.sort((a, b) => a.createdAt - b.createdAt);
    return folders;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

export const addFolder = async (folderData) => {
  try {
    if (!folderData.name || folderData.name.length > 24 || /[^a-zA-Z0-9 ]/.test(folderData.name)) {
      throw new Error(
        "Invalid folder name. Ensure it is no longer than 24 characters and contains only alphanumeric characters and spaces."
      );
    }
    const folderPayload = {
      ...folderData,
      createdAt: serverTimestamp(),
    };
    if (folderData.parentId === undefined) {
      delete folderPayload.parentId;
    }

    const docRef = await addDoc(collection(db, "folders"), folderPayload);
    return { id: docRef.id, ...folderPayload, subfolders: [] };
  } catch (error) {
    console.error("Error adding folder:", error);
    throw error;
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const fileQuery = query(collection(db, "files"), where("folderId", "==", folderId));
    const fileSnapshot = await getDocs(fileQuery);
    const fileDeletions = fileSnapshot.docs.map((fileDoc) =>
      deleteDoc(doc(db, "files", fileDoc.id))
    );
    await Promise.all(fileDeletions);

    const subfolderQuery = query(collection(db, "folders"), where("parentId", "==", folderId));
    const subfolderSnapshot = await getDocs(subfolderQuery);
    const subfolderDeletions = subfolderSnapshot.docs.map((subfolderDoc) =>
      deleteFolder(subfolderDoc.id)
    );
    await Promise.all(subfolderDeletions);
    await deleteDoc(doc(db, "folders", folderId));
  } catch (error) {
    console.error("Error deleting folder:", error);
    throw error;
  }
};

export const handleUpdateFolder = async (folderId, updatedDetails) => {
  try {
    if (updatedDetails.name) {
      if (updatedDetails.name.length > 24 || /[^a-zA-Z0-9 ]/.test(updatedDetails.name)) {
        throw new Error(
          "Invalid folder name. Ensure it is no longer than 24 characters and contains only alphanumeric characters and spaces."
        );
      }
    }

    const folderRef = doc(db, "folders", folderId);
    await updateDoc(folderRef, updatedDetails);
    return { success: true };
  } catch (error) {
    console.error("Error updating folder:", error);
    throw error;
  }
};

export const fetchFolderDetails = async (folderId) => {
  try {
    const folderDocRef = doc(db, "folders", folderId);
    const folderDoc = await getDoc(folderDocRef);
    if (!folderDoc.exists()) {
      console.log("No such folder!");
      return null;
    }
    const data = folderDoc.data();
    const folderDetails = { id: folderDoc.id, ...data };

    if (folderDetails.parentId) {
      const parentDetails = await fetchFolderDetails(folderDetails.parentId);
      folderDetails.parent = parentDetails;
    }

    return folderDetails;
  } catch (error) {
    console.error("Error fetching folder details:", error);
    throw error;
  }
};

export const fetchFolderDetailsWithUploadLimit = async (folderId) => {
  try {
    const folderDocRef = doc(db, "folders", folderId);
    const folderDoc = await getDoc(folderDocRef);
    if (folderDoc.exists()) {
      const data = folderDoc.data();
      console.log("Folder Details:", data);
      return { id: folderDoc.id, ...data };
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
  const totalFiles = folder.fileCount || 0;
  const maxFileCount = 100;
  const usagePercentage = (totalFiles / maxFileCount) * 100;

  return {
    ...folder,
    usagePercentage: Math.min(usagePercentage, 100),
  };
};

export const addAssigneeToFolder = async (folderId, assigneeData) => {
  try {
    const folderRef = doc(db, "folders", folderId);
    await updateDoc(folderRef, {
      assignees: arrayUnion(assigneeData),
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding assignee to folder:", error);
    throw error;
  }
};

export const removeAssigneeFromFolder = async (folderId, assigneeData) => {
  try {
    const folderRef = doc(db, "folders", folderId);
    await updateDoc(folderRef, {
      assignees: arrayRemove(assigneeData),
    });
    return { success: true };
  } catch (error) {
    console.error("Error removing assignee from folder:", error);
    throw error;
  }
};

// export const fetchFoldersForUser = async (userId, parentId = null) => {
//   try {
//     const folderQuery = query(collection(db, 'folders'), where('parentId', '==', parentId));
//     const folderSnapshot = await getDocs(folderQuery);
//     const folders = folderSnapshot.docs.map((doc) => {
//       const folderData = doc.data();
//       const createdAt = folderData.createdAt
//         ? new Date(folderData.createdAt.seconds * 1000)
//         : new Date();
//       return {
//         id: doc.id,
//         ...folderData,
//         createdAt: createdAt,
//       };
//     });

//     const filteredFolders = folders.filter(
//       (folder) =>
//         folder.assignees && folder.assignees.some((assignee) => assignee.userId === userId)
//     );

//     const files = [];
//     if (parentId) {
//       const fileQuery = query(collection(db, 'files'), where('folderId', '==', parentId));
//       const fileSnapshot = await getDocs(fileQuery);
//       const folderFiles = fileSnapshot.docs.map((doc) => {
//         const fileData = doc.data();
//         const fileCreatedAt = fileData.createdAt
//           ? new Date(fileData.createdAt.seconds * 1000)
//           : new Date();
//         return {
//           id: doc.id,
//           ...fileData,
//           createdAt: fileCreatedAt,
//         };
//       });
//       files.push(...folderFiles);
//     }

//     return { folders: filteredFolders, files };
//   } catch (error) {
//     console.error('Error fetching folders for user:', error);
//     throw error;
//   }
// };

export const fetchFoldersForUser = async (userId, parentId = null) => {
  try {
    const allFoldersQuery = query(collection(db, "folders"));
    const allFoldersSnapshot = await getDocs(allFoldersQuery);
    let allFolders = allFoldersSnapshot.docs.map((doc) => {
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

    allFolders = allFolders.sort((a, b) => a.createdAt - b.createdAt);

    // Filter to include only those folders where the user is an assignee
    let userFolders = allFolders.filter(
      (folder) =>
        folder.assignees && folder.assignees.some((assignee) => assignee.userId === userId)
    );

    // Include parent folders of assigned subfolders to maintain hierarchy
    const parentIds = userFolders
      .filter((folder) => folder.parentId && !userFolders.some((f) => f.id === folder.parentId))
      .map((folder) => folder.parentId);

    const parentFolders = allFolders.filter((folder) => parentIds.includes(folder.id));
    userFolders = [...userFolders, ...parentFolders];

    // If parentId is null, return only root folders; otherwise, return only the subfolders of the specified parent
    if (parentId === null) {
      userFolders = userFolders.filter((folder) => !folder.parentId);
    } else {
      userFolders = userFolders.filter((folder) => folder.parentId === parentId);
    }

    // Fetch files for these folders if parentId is specified
    const files = [];
    if (parentId) {
      const fileQuery = query(collection(db, "files"), where("folderId", "==", parentId));
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

    return { folders: userFolders, files };
  } catch (error) {
    console.error("Error fetching folders for user:", error);
    throw error;
  }
};

export const countAllFolders = async () => {
  try {
    const q = query(collection(db, "folders"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error counting folders:", error);
    throw error;
  }
};

export const countPendingFilesInFolders = (callback) => {
  const folderQuery = query(collection(db, "folders"));
  const unsubscribe = onSnapshot(
    folderQuery,
    async (folderSnapshot) => {
      let totalPendingFiles = 0;

      const checks = folderSnapshot.docs.map(async (folderDoc) => {
        const folderId = folderDoc.id;
        const fileQuery = query(collection(db, "files"), where("folderId", "==", folderId));
        const fileSnapshot = await getDocs(fileQuery);

        if (fileSnapshot.empty) {
          totalPendingFiles++;
        }
      });

      await Promise.all(checks);
      callback(totalPendingFiles);
    },
    (error) => {
      console.error("Error tracking pending files in folders:", error);
    }
  );

  return unsubscribe;
};

export const countCompletedFilesInFolders = (callback) => {
  const folderQuery = query(collection(db, "folders"));
  const unsubscribe = onSnapshot(
    folderQuery,
    async (folderSnapshot) => {
      let totalCompletedFiles = 0;

      const checks = folderSnapshot.docs.map(async (folderDoc) => {
        const folderId = folderDoc.id;
        const fileQuery = query(collection(db, "files"), where("folderId", "==", folderId));
        const fileSnapshot = await getDocs(fileQuery);

        if (!fileSnapshot.empty) {
          totalCompletedFiles++;
        }
      });

      await Promise.all(checks);
      callback(totalCompletedFiles);
    },
    (error) => {
      console.error("Error tracking pending files in folders:", error);
    }
  );

  return unsubscribe;
};

export const calculateOverallProgress = async () => {
  try {
    const folderQuery = query(collection(db, "folders"));
    const folderSnapshot = await getDocs(folderQuery);
    const totalFolders = folderSnapshot.size;
    let completedFolders = 0;

    const folderChecks = folderSnapshot.docs.map(async (folderDoc) => {
      const folderId = folderDoc.id;
      const fileQuery = query(collection(db, "files"), where("folderId", "==", folderId));
      const fileSnapshot = await getDocs(fileQuery);
      if (!fileSnapshot.empty) {
        completedFolders++;
      }
    });

    await Promise.all(folderChecks);

    const progressPercentage = (completedFolders / totalFolders) * 100;
    return {
      totalFolders,
      completedFolders,
      progressPercentage: progressPercentage.toFixed(2) + "%",
    };
  } catch (error) {
    console.error("Error calculating overall progress:", error);
    throw error;
  }
};

// Helper function to count files in a folder and its subfolders
async function countFilesInFolderAndSubfolders(folderId, allFolders) {
  let totalFiles = 0;
  const fileSnapshot = await getDocs(
    query(collection(db, "files"), where("folderId", "==", folderId))
  );
  totalFiles += fileSnapshot.size;

  const subfolders = allFolders.filter((folder) => folder.parentId === folderId);
  for (const subfolder of subfolders) {
    totalFiles += await countFilesInFolderAndSubfolders(subfolder.id, allFolders);
  }

  return totalFiles;
}

export const countFilesInRootFolders = async () => {
  try {
    const allFoldersSnapshot = await getDocs(collection(db, "folders"));
    const allFolders = allFoldersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const rootFolders = allFolders.filter((folder) => !folder.parentId);
    const rootFolderFileCounts = await Promise.all(
      rootFolders.map(async (rootFolder) => {
        const totalFiles = await countFilesInFolderAndSubfolders(rootFolder.id, allFolders);
        return {
          folderName: rootFolder.name,
          totalFiles,
        };
      })
    );

    return rootFolderFileCounts;
  } catch (error) {
    console.error("Error counting files in root folders:", error);
    throw error;
  }
};

export const fetchEmptySubfoldersPerRootFolder = async () => {
  try {
    const allFoldersSnapshot = await getDocs(collection(db, "folders"));
    const allFolders = allFoldersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const rootFolders = allFolders.filter((folder) => !folder.parentId);
    const subFolders = allFolders.filter((folder) => folder.parentId);

    const emptySubfolders = await Promise.all(
      rootFolders.map(async (rootFolder) => {
        const subfoldersOfRoot = subFolders.filter(
          (subFolder) => subFolder.parentId === rootFolder.id
        );
        const emptySubfolders = [];

        for (const subfolder of subfoldersOfRoot) {
          const fileSnapshot = await getDocs(
            query(collection(db, "files"), where("folderId", "==", subfolder.id))
          );
          if (fileSnapshot.empty) {
            emptySubfolders.push(subfolder.name);
          }
        }

        return {
          rootFolderName: rootFolder.name,
          emptySubfolders: emptySubfolders,
        };
      })
    );

    return emptySubfolders.filter((item) => item.emptySubfolders.length > 0);
  } catch (error) {
    console.error("Error fetching empty subfolders per root folder:", error);
    throw error;
  }
};

export const fetchSubfoldersWithFilesPerRootFolder = async () => {
  try {
    const allFoldersSnapshot = await getDocs(collection(db, "folders"));
    const allFolders = allFoldersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const rootFolders = allFolders.filter((folder) => !folder.parentId);
    const subFolders = allFolders.filter((folder) => folder.parentId);

    const subfoldersWithFiles = await Promise.all(
      rootFolders.map(async (rootFolder) => {
        const subfoldersOfRoot = subFolders.filter(
          (subFolder) => subFolder.parentId === rootFolder.id
        );
        const subfoldersWithFiles = [];

        for (const subfolder of subfoldersOfRoot) {
          const fileSnapshot = await getDocs(
            query(collection(db, "files"), where("folderId", "==", subfolder.id))
          );
          if (!fileSnapshot.empty) {
            subfoldersWithFiles.push(subfolder.name);
          }
        }

        return {
          rootFolderName: rootFolder.name,
          subfoldersWithFiles: subfoldersWithFiles,
        };
      })
    );

    return subfoldersWithFiles.filter((item) => item.subfoldersWithFiles.length > 0);
  } catch (error) {
    console.error("Error fetching subfolders with files per root folder:", error);
    throw error;
  }
};
