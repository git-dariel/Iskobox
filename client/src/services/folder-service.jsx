import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../database/firebase-connection";

export const fetchFolders = async (parentId = null) => {
  const q = query(collection(db, "folders"), where("parentId", "==", parentId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    subfolders: [],
  }));
};

export const addFolder = async (folderData) => {
  const docRef = await addDoc(collection(db, "folders"), folderData);
  return { id: docRef.id, ...folderData, subfolders: [] };
};

export const deleteFolder = async (folderId) => {
  await deleteDoc(doc(db, "folders", folderId));
};

export const updateFolderName = async (folderId, newName) => {
  const folderRef = doc(db, "folders", folderId);
  await updateDoc(folderRef, { name: newName });
};

export const fetchFolderDetails = async (folderId) => {
  const folderDocRef = doc(db, "folders", folderId);
  const folderDoc = await getDoc(folderDocRef);
  if (folderDoc.exists()) {
    return { id: folderDoc.id, ...folderDoc.data() };
  } else {
    console.log("No such folder!");
    return null;
  }
};