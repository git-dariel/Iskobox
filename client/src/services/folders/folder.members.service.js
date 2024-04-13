import { addDoc, collection, db } from '../../database/firebase-connection'

// Add a member to a folder
export const addMemberToFolder = async (folderId, memberData) => {
  const folderMembersCollection = collection(db, 'folders', folderId, 'members')
  const docRef = await addDoc(folderMembersCollection, [memberData])
  return { id: docRef.id, ...memberData }
}

// Add a member to a specific type of folder (e.g., 'folders', 'boards')
export const addMemberToSpecificFolder = async (folderType, folderId, memberData) => {
  const folderMembersCollection = collection(db, folderType, folderId, 'members')
  const docRef = await addDoc(folderMembersCollection, memberData)
  return { id: docRef.id, ...memberData }
}

// For a regular folder
//addMemberToFolder("folders", "folderId123", { name: "John Doe", role: "Editor" });

// For a board folder
//addMemberToSpecificFolder("boards", "boardId456", { name: "Jane Smith", role: "Viewer" });
