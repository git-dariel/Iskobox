import { createFirestoreFunctionsForCollection } from '../template.service';

// Create Non-Board Collection
const nonBoardFolderOperations = createFirestoreFunctionsForCollection('non-board-folder');

// Fetch Folders
export const fetchNonBoardFolders = async () => {
  const folders = await nonBoardFolderOperations.fetchDocuments();
  console.log(folders);
};

// Add Non-Board Folder
export const addNewNonBoardFolder = async (newFolderData) => {
  const newFolder = await nonBoardFolderOperations.addDocument(newFolderData);
  console.log(newFolder);
};

// Delete Non-Board Folder
export const deleteNonBoardFolder = async (folderId) => {
  await nonBoardFolderOperations.deleteDocument(folderId);
};

// Update Non-Board Folder
export const updateNonBoardFolder = async (folderId, newValues) => {
  await nonBoardFolderOperations.updateDocumentDetails(folderId, newValues);
};

// Get Non-Board Folder Details
export const getNonBoardFolderDetails = async (folderId) => {
  const folderDetails = await nonBoardFolderOperations.getBoardFolderDetails(folderId);
  console.log(folderDetails);
};
