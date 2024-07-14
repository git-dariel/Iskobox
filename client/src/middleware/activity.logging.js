import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  orderBy,
  query,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../database/firebase-connection";
import { getAuth } from "firebase/auth";

// Middleware to log user activity
export const logActivity = async (action, details) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not logged in");
    }

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User not found in the database");
    }

    const userData = userDoc.data();
    const activityLog = {
      userId: user.uid,
      email: user.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      action,
      details,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "activityLogs"), activityLog);
    console.log("Activity logged:", activityLog);
  } catch (error) {
    console.error("Error logging activity:", error);
    throw error;
  }
};

// export const getAllActivityLogs = async () => {
//   try {
//     // Fetch the activity logs ordered by timestamp
//     const logsQuery = query(collection(db, "activityLogs"), orderBy("timestamp", "asc"));
//     const querySnapshot = await getDocs(logsQuery);
//     const logs = [];
//     querySnapshot.forEach((doc) => {
//       logs.push({ id: doc.id, ...doc.data() });
//     });
//     return logs;
//   } catch (error) {
//     console.error("Error fetching activity logs:", error);
//     throw error;
//   }
// };
export const getAllActivityLogs = async (lastVisible = null, pageSize = 20, emailFilter = "") => {
  try {
    console.log("Fetching logs with parameters:", { lastVisible, pageSize, emailFilter });

    let logsQuery = collection(db, "activityLogs");

    if (emailFilter) {
      const endEmailFilter = emailFilter + "\uf8ff"; // '\uf8ff' is a high Unicode character
      logsQuery = query(
        logsQuery,
        where("email", ">=", emailFilter),
        where("email", "<=", endEmailFilter),
        orderBy("email"),
        orderBy("timestamp", "asc"),
        limit(pageSize)
      );
    } else {
      logsQuery = query(logsQuery, orderBy("timestamp", "asc"), limit(pageSize));
    }

    if (lastVisible) {
      logsQuery = query(logsQuery, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(logsQuery);
    const logs = [];
    querySnapshot.forEach((doc) => {
      logs.push({ id: doc.id, ...doc.data() });
    });
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    console.log("Fetched logs:", logs);
    return { logs, lastDoc };
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    throw error;
  }
};

export const deleteActivityLog = async (logId) => {
  try {
    await deleteDoc(doc(db, "activityLogs", logId));
    console.log("Activity log deleted:", logId);
  } catch (error) {
    console.error("Error deleting activity log:", error);
    throw error;
  }
};
