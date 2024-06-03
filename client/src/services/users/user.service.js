import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../database/firebase-connection';

// fetch all users
export async function fetchAllUsers() {
  try {
    const usersRef = collection(db, 'users');
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
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('User already exists!');
      return false;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, 'users', userCredential.user.uid);
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
    const userRef = doc(db, 'users', userCredential.user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      role: userData.role,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
