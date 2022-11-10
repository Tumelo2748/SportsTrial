// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore";

//Firebase configuration
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore();
export const users = collection(db, "User")
export const storage = getStorage()

