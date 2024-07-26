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
  arrayRemove,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable, deleteObject, getBlob } from "firebase/storage";
import { db, storage } from "../../database/firebase-connection";
import { logActivity } from "@/middleware/activity.logging";

export const fetchAllFiles = async () => {
  const q = query(collection(db, "files"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const fetchFilesInFolder = async (folderId) => {
  const q = query(collection(db, "files"), where("folderId", "==", folderId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const uploadFile = async (file, folderId, onProgress) => {
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
    const nameParts = fileName.split(".");
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
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Calculate progress percentage
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(Math.round(progress));
    },
    (error) => {
      console.error("Error uploading file:", error);
      throw error;
    },
    () => {
      // Upload completed successfully, handle other operations if needed
    }
  );

  // Await upload completion
  await uploadTask;

  // Get download URL for the uploaded file
  const url = await getDownloadURL(storageRef);

  // Add file metadata to Firestore
  const docRef = await addDoc(filesCollectionRef, {
    name: fileName,
    folderId: folderId,
    url: url,
    createdAt: serverTimestamp(),
  });

  // Log activity for the file upload
  await logActivity("Upload file", { fileId: docRef.id, fileName: fileName, folderId: folderId });

  // Return file metadata
  return {
    id: docRef.id,
    name: fileName,
    folderId: folderId,
    url: url,
    createdAt: serverTimestamp(),
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

export const removeTagsFromFile = async (fileId, tags) => {
  if (!fileId) {
    throw new Error("File ID is required");
  }
  const filesRef = doc(db, "files", fileId);
  await updateDoc(filesRef, {
    tags: arrayRemove(...tags),
  });
};

export const getFileTags = async (fileId) => {
  if (!fileId) {
    throw new Error("File ID is required");
  }
  const fileRef = doc(db, "files", fileId);
  const fileSnapshot = await getDoc(fileRef);
  if (!fileSnapshot.exists()) {
    throw new Error("File not found");
  }
  const fileData = fileSnapshot.data();
  return fileData.tags || [];
};

export const searchFilesByTag = async (tagFilter) => {
  try {
    console.log("Searching files with tag filter:", tagFilter);

    const filesQuery = query(collection(db, "files"), where("tags", "array-contains", tagFilter));

    const querySnapshot = await getDocs(filesQuery);
    const files = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Found files:", files);
    return files;
  } catch (error) {
    console.error("Error searching files by tag:", error);
    throw error;
  }
};

export const renameFile = async (fileId, newName) => {
  const fileRef = doc(db, "files", fileId);
  const fileSnapshot = await getDoc(fileRef);
  if (!fileSnapshot.exists()) {
    throw new Error("File not found");
  }
  const fileData = fileSnapshot.data();
  const oldPath = `folders/${fileData.folderId}/${fileData.name}`;
  const newPath = `folders/${fileData.folderId}/${newName}`;

  // Rename the file in Firebase Storage
  const oldStorageRef = ref(storage, oldPath);
  const newStorageRef = ref(storage, newPath);
  await getBlob(oldStorageRef)
    .then((blob) => {
      return uploadBytesResumable(newStorageRef, blob);
    })
    .catch((error) => {
      console.error("Error moving file in storage:", error);
      throw error;
    });
  await deleteObject(oldStorageRef).catch((error) => {
    console.error("Error deleting old file in storage:", error);
    throw error;
  });

  // Get the new download URL for the renamed file
  const newUrl = await getDownloadURL(newStorageRef);

  // Update the file name and URL in Firestore
  await updateDoc(fileRef, { name: newName, url: newUrl }).catch((error) => {
    console.error("Error updating document:", error);
    throw error;
  });

  // Log activity for the file rename
  await logActivity("Rename file", { fileId: fileId, oldName: fileData.name, newName: newName });

  return newName;
};
