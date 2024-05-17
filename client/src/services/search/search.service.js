import { query, collection, getDocs, where } from 'firebase/firestore';
import { db } from '../../database/firebase-connection';

// Search both folders and files by name
export const searchItems = async (searchTerm) => {
  try {
    // Search in folders
    const folderQuery = query(
      collection(db, 'folders'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );
    const folderSnapshot = await getDocs(folderQuery);
    const folders = folderSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      type: 'folder',
    }));

    // Search in files
    const fileQuery = query(
      collection(db, 'files'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );
    const fileSnapshot = await getDocs(fileQuery);
    const files = fileSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      type: 'file',
    }));

    // Combine results
    return [...folders, ...files];
  } catch (error) {
    console.error('Error searching items:', error);
    throw error;
  }
};
