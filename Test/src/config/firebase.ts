import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDCF3ucvMpVNQFhc3bYRZfPCL2T2a0esY",
  authDomain: "moenia-properties.firebaseapp.com",
  projectId: "moenia-properties",
  storageBucket: "moenia-properties.appspot.com",
  messagingSenderId: "546239193086",
  appId: "1:546239193086:web:8f9b5e9b0b0b0b0b0b0b0b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);