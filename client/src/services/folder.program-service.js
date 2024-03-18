import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../database/firebase-connection";

// get the program folders
export const fetchFoldersProgram = async (parentId = null) => {
    const q = query(collection(db, "programs-folder"), where("parentId", "==", parentId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        subfolders: [],
    }));
}

// add folder to program
export const addFolderProgram = async (folderData) => {
    const docRef = await addDoc(collection(db, "programs-folder"), folderData);
    return { id: docRef.id, ...folderData, subfolders: [] };
}

// delete folder for program
export const deleteFolderProgram = async (folderId) => {
    await deleteDoc(doc, "programs-folder", folderId);
}

// update the program folder
export const updateFolderProgramDetails = async (folderId, newName) => {
    const folderRef = doc(db, "programs-folder", folderId);
    await updateDoc(folderRef, { name: newName });
}

// get the program folder details
export const fetchFolderProgramDetails = async (folderId) => {
    const folderDocRef = doc(db, "programs-folder", folderId);
    const folderDoc = await getDoc(folderDocRef);
    if (folderDoc.exists()) {
        return { id: folderDoc.id, ...folderDoc.data() };
    } else {
        console.log("No such folder!");
        return null;
    }
}