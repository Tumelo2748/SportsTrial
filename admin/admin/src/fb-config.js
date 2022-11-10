import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-RorHb2TC1FqFgD1f1g8Zi6vi6-RZbnM",
  authDomain: "sports-trial.firebaseapp.com",
  projectId: "sports-trial",
  storageBucket: "sports-trial.appspot.com",
  messagingSenderId: "651047124831",
  appId: "1:651047124831:web:d7cc3dc40b174fc04c80ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
// connection to storage
export const storage = getStorage(app)
