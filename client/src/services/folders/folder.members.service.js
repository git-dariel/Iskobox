import { addDoc, collection, db, deleteDoc } from '../../database/firebase-connection';

// Add a assignee to a folder
export const addAssigneeToFolder = async (folderId, assigneeData) => {
  const folderAssigneeCollection = collection(db, 'folders', folderId, 'assignees');
  const docRef = await addDoc(folderAssigneeCollection, [assigneeData]);
  return { id: docRef.id, ...assigneeData };
};

// Add a assignee to a specific type of folder (e.g., 'folders', 'boards')
export const addMemberToSpecificFolder = async (folderType, folderId, assigneeData) => {
  const folderAssigneeCollection = collection(db, folderType, folderId, 'assignees');
  const docRef = await addDoc(folderAssigneeCollection, assigneeData);
  return { id: docRef.id, ...assigneeData };
};

// Remove an assignee from a folder
export const removeAssigneeFromFolder = async (folderId, assigneeId) => {
  const assigneeDocRef = doc(db, 'folders', folderId, 'assignees', assigneeId);
  await deleteDoc(assigneeDocRef);
};

// For a regular folder
//addAssigneeToFolder("folders", "folderId123", { name: "John Doe", role: "Editor" });

// For a board folder
//addMemberToSpecificFolder("boards", "boardId456", { name: "Jane Smith", role: "Viewer" });

// Example usage of removeAssigneeFromFolder
//removeAssigneeFromFolder("folderId123", "assigneeId789");
