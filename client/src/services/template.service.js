import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../database/firebase-connection';

// Higher-order function to create functions for any collection
export const createFirestoreFunctionsForCollection = (collectionName) => ({
  // Fetch documents from the collection
  fetchDocuments: async (parentId = null) => {
    const q = query(collection(db, collectionName), where('parentId', '==', parentId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      subfolders: [],
    }));
  },

  // Add a document to the collection
  addDocument: async (documentData) => {
    const docRef = await addDoc(collection(db, collectionName), documentData);
    return { id: docRef.id, ...documentData, subfolders: [] };
  },

  // Delete a document from the collection
  deleteDocument: async (documentId) => {
    await deleteDoc(doc(db, collectionName, documentId));
  },

  // Update a document in the collection
  updateDocumentDetails: async (documentId, newValues) => {
    const documentRef = doc(db, collectionName, documentId);
    await updateDoc(documentRef, newValues);
  },

  // Fetch a single document's details from the collection
  fetchDocumentDetails: async (documentId) => {
    const documentRef = doc(db, collectionName, documentId);
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      return { id: documentSnapshot.id, ...documentSnapshot.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  },
});
