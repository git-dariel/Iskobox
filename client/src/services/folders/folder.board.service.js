import { createFirestoreFunctionsForCollection } from "./folder.template.service";

// Create Board Collection
const boardFolderOperations = createFirestoreFunctionsForCollection("board-folder");

// Fetch Folders
export const fetchBoardFolders = async () => {
    const folders = await boardFolderOperations.fetchDocuments();
    console.log(folders);
}

// Add Board Folder
export const addNewBoardFolder = async (newFolderData) => {
    const newFolder = await boardFolderOperations.addDocument(newFolderData);
    console.log(newFolder);
}

// Delete Board Folder
export const deleteBoardFolder = async (folderId) => {
    await boardFolderOperations.deleteDocument(folderId);
}

// Update Board Folder
export const updateBoardFolder = async (folderId, newValues) => {
    await boardFolderOperations.updateDocumentDetails(folderId, newValues);
}

// Get Board Folder Details
export const getBoardFolderDetails = async (folderId) => {
    const folderDetails = await boardFolderOperations.getBoardFolderDetails(folderId);
    console.log(folderDetails);
}