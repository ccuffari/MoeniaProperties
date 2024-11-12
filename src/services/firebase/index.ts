import { getApps, initializeApp } from 'firebase/app';
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

// Initialize Firebase only if no apps exist
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);