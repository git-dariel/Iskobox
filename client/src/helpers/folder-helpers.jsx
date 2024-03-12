import { collection, query, where, getDocs } from 'firebase/firestore';

export const handleFolderDoubleClick = async (folder, setCurrentFolder, setFolderPath, db, setFiles) => {
    setFolderPath((currentFolderPath) => {
        if (setCurrentFolder) {
            return [...currentFolderPath, folder.name];
        } else {
            return [
                ...currentFolderPath,
                { id: folder.id, name: folder.name },
            ];
        }
    });
    setCurrentFolder(folder);

    const foldersCollectionRef = collection(db, "folders");
    const q = query(foldersCollectionRef, where("parentId", "==", folder.id));
    const querySnapshot = await getDocs(q);
    const subfoldersArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        subfolders: [],
    }));

    setCurrentFolder((prevState) => ({
        ...prevState,
        subfolders: subfoldersArray,
    }));

    const filesCollectionRef = collection(db, "files");
    const qFiles = query(filesCollectionRef, where("folderId", "==", folder.id));
    const querySnapshotFiles = await getDocs(qFiles);
    const filesArray = querySnapshotFiles.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    setFiles(filesArray);
};
  
  export const handleBreadcrumbClick = async (index, folderPath, setCurrentFolder, setFolderPath, setFiles, fetchFolders, updateFolderUsageChartData, fetchAllFiles, handleFetchFolderDetails) => {
    if (index === 0) {
      setCurrentFolder(null);
      setFolderPath([]);
      setFiles([]);
      await fetchFolders();
      updateFolderUsageChartData();
      await fetchAllFiles();
      return;
    }

    const newPath = folderPath.slice(0, index + 1);
    setFolderPath(newPath);
  
    const clickedFolderId = newPath[index].id;
    const clickedFolderDetails = await handleFetchFolderDetails(
      clickedFolderId
    );
    if (clickedFolderDetails) {
      setCurrentFolder(clickedFolderDetails);
    } else {
      console.error("Failed to fetch folder details.");
    }
  };