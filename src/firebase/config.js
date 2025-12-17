import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMSXHPy_mUqI91ZiXzwSzNjzbNJxa-7Zc",
  authDomain: "tennis-tracker-a90ed.firebaseapp.com",
  projectId: "tennis-tracker-a90ed",
  storageBucket: "tennis-tracker-a90ed.firebasestorage.app",
  messagingSenderId: "631959513233",
  appId: "1:631959513233:web:7cc35849805304cb767730",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
