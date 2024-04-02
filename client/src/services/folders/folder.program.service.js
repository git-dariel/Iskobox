import { createFirestoreFunctionsForCollection } from "./folder.template.service";

// Create Program Collection
const programFolderOperations = createFirestoreFunctionsForCollection("program-folder");

// Fetch Folders
export const fetchProgramFolders = async () => {
    const folders = await programFolderOperations.fetchDocuments();
    console.log(folders);
}

// Add Program Folder
export const addNewProgramFolder = async (newFolderData) => {
    const newFolder = await programFolderOperations.addDocument(newFolderData);
    console.log(newFolder);
}

// Delete Program Folder
export const deleteProgramFolder = async (folderId) => {
    await programFolderOperations.deleteDocument(folderId);
}

// Update Program Folder
export const updateProgramFolder = async (folderId, newValues) => {
    await programFolderOperations.updateDocumentDetails(folderId, newValues);
}

// Get Program Folder Details
export const getProgramFolderDetails = async (folderId) => {
    const folderDetails = await programFolderOperations.getBoardFolderDetails(folderId);
    console.log(folderDetails);
}