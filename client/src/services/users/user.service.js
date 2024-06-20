import {
  getAuth,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../database/firebase-connection";

// fetch all users
export async function fetchAllUsers() {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const userList = querySnapshot.docs.map((doc) => doc.data());
    return userList;
  } catch (error) {
    throw error;
  }
}

// register a user
export async function registerUser(email, password, firstname, lastname, role) {
  try {
    const auth = getAuth();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    role = role || "Faculty";

    if (!querySnapshot.empty) {
      console.log("User already exists!");
      return false;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      firstname,
      lastname,
      email,
      role,
    });

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// login a user
export async function loginUser(email, password) {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "users", userCredential.user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User not found in the database");
    }

    const userData = userDoc.data();
    if (!userData.role) {
      throw new Error("User role is not defined in the database");
    }

    return userData;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function editUserDetails(uid, newEmail, newPassword, newFirstname, newLastname) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user.uid !== uid) {
      throw new Error("Unauthorized to edit this user");
    }

    const userRef = doc(db, "users", uid);

    if (newEmail && newEmail !== user.email) {
      await updateEmail(user, newEmail);
      await sendEmailVerification(user);
      console.log("Verification email sent to:", newEmail);

      // Temporarily store the new email in the user's document
      await updateDoc(userRef, {
        pendingEmail: newEmail,
      });

      return "Verification email sent. Please verify your new email address.";
    }

    if (newPassword) {
      await updatePassword(user, newPassword);
    }

    // Update other details only if email is not changed or after it's verified
    await updateDoc(userRef, {
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail || user.email,
    });

    return true;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
}

// log out a user
export async function logoutUser() {
  try {
    const auth = getAuth();
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

// delete a user account
export async function deleteUserAccount(uid) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user.uid !== uid) {
      throw new Error("Unauthorized to delete this user");
    }

    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
    await deleteUser(user);
    console.log("User account deleted successfully");
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw error;
  }
}
