import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebase-connection';

// register a user
export async function registerUser(email, password, firstname, lastname) {
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
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
