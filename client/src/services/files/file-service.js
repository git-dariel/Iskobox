import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../database/firebase-connection";

export const fetchAllFiles = async () => {
  const q = query(collection(db, "files"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const uploadFile = async (file, folderId) => {
  const storageRef = ref(storage, `folders/${folderId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  const filesCollectionRef = collection(db, "files");
  const docRef = await addDoc(filesCollectionRef, {
    name: file.name,
    folderId: folderId,
    url: url,
  });
  return {
    id: docRef.id,
    name: file.name,
    folderId: folderId,
    url: url,
  };
};

export const deleteFile = async (fileId) => {
  await deleteDoc(doc(db, "files", fileId));
};