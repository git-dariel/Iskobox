import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { db, storage } from "../../database/firebase-connection";
import { logActivity } from "@/middleware/activity.logging";

export const fetchAllFiles = async () => {
  const q = query(collection(db, "files"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchFilesInFolder = async (folderId) => {
  const q = query(collection(db, "files"), where("folderId", "==", folderId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const uploadFile = async (file, folderId) => {
  let fileName = file.name;
  const filesCollectionRef = collection(db, "files");

  // Check if a file with the same name exists
  let existingFilesQuery = query(
    filesCollectionRef,
    where("folderId", "==", folderId),
    where("name", "==", fileName)
  );
  let existingFilesSnapshot = await getDocs(existingFilesQuery);

  let counter = 1;
  while (!existingFilesSnapshot.empty) {
    // Increment the file name
    const nameParts = file.name.split(".");
    const extension = nameParts.pop();
    fileName = `${nameParts.join(".")} (${counter}).${extension}`;

    // Check again with the new file name
    existingFilesQuery = query(
      filesCollectionRef,
      where("folderId", "==", folderId),
      where("name", "==", fileName)
    );
    existingFilesSnapshot = await getDocs(existingFilesQuery);
    counter++;
  }

  const storageRef = ref(storage, `folders/${folderId}/${fileName}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  const docRef = await addDoc(filesCollectionRef, {
    name: fileName,
    folderId: folderId,
    url: url,
  });

  await logActivity("Upload file", { fileId: docRef.id, fileName: fileName, folderId: folderId });

  return {
    id: docRef.id,
    name: fileName,
    folderId: folderId,
    url: url,
  };
};

export const deleteFile = async (fileId) => {
  const fileRef = doc(db, "files", fileId);
  const fileSnapshot = await getDoc(fileRef);
  if (!fileSnapshot.exists()) {
    throw new Error("File not found");
  }
  const fileData = fileSnapshot.data();
  const filePath = `folders/${fileData.folderId}/${fileData.name}`;

  // Delete the file from Firebase Storage
  const storageRef = ref(storage, filePath);
  await deleteObject(storageRef).catch((error) => {
    console.error("Error deleting from storage:", error);
    throw error;
  });

  // Delete the document from Firestore
  await deleteDoc(fileRef);
  await logActivity("Delete file", {
    fileId: fileId,
    fileName: fileData.name,
    folderId: fileData.folderId,
  });
};

export const getFileUrl = async (fileId) => {
  const fileRef = doc(db, "files", fileId);
  const fileSnapshot = await getDoc(fileRef);
  if (!fileSnapshot.exists()) {
    throw new Error("File not found");
  }
  const fileData = fileSnapshot.data();
  return fileData.url;
};

export const countAllFiles = async () => {
  try {
    const q = query(collection(db, "files"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error counting files:", error);
    throw error;
  }
};

export const addTagsToFile = async (fileId, tags) => {
  if (!fileId) {
    throw new Error("File ID is required");
  }
  const filesRef = doc(db, "files", fileId);
  await updateDoc(filesRef, {
    tags: arrayUnion(...tags),
  });
};
