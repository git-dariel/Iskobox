import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { constants } from '@/configs/constant';

const firebaseConfig = {
  apiKey: constants.FIREBASE.API_KEY || process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: constants.FIREBASE.AUTH_DOMAIN || process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: constants.FIREBASE.PROJECT_ID || process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: constants.FIREBASE.STORAGE_BUCKET || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    constants.FIREBASE.MESSAGING_SENDER_ID || process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: constants.FIREBASE.APP_ID || process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Firestore
const db = getFirestore(app);

export { db, storage };
