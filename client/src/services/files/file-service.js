import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { db, storage } from '../../database/firebase-connection';

export const fetchAllFiles = async () => {
  const q = query(collection(db, 'files'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchFilesInFolder = async (folderId) => {
  const q = query(collection(db, 'files'), where('folderId', '==', folderId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const uploadFile = (file, folderId, onProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `folders/${folderId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const filesCollectionRef = collection(db, 'files');
        const docRef = await addDoc(filesCollectionRef, {
          name: file.name,
          folderId: folderId,
          url: url,
        });
        resolve({
          id: docRef.id,
          name: file.name,
          folderId: folderId,
          url: url,
        });
      }
    );
  });
};

export const deleteFile = async (fileId) => {
  const fileRef = doc(db, 'files', fileId);
  const fileSnapshot = await getDoc(fileRef);
  if (!fileSnapshot.exists()) {
    throw new Error('File not found');
  }
  const fileData = fileSnapshot.data();
  const filePath = `folders/${fileData.folderId}/${fileData.name}`;

  // Delete the file from Firebase Storage
  const storageRef = ref(storage, filePath);
  await deleteObject(storageRef).catch((error) => {
    console.error('Error deleting from storage:', error);
    throw error;
  });

  // Delete the document from Firestore
  await deleteDoc(fileRef);
};

export const getFileUrl = async (fileId) => {
  const fileRef = doc(db, 'files', fileId);
  const fileSnapshot = await getDoc(fileRef);
  if (!fileSnapshot.exists()) {
    throw new Error('File not found');
  }
  const fileData = fileSnapshot.data();
  return fileData.url;
};

export const countAllFiles = async () => {
  try {
    const q = query(collection(db, 'files'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error counting files:', error);
    throw error;
  }
};
