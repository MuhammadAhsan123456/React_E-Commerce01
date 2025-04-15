// src/firebase.js

// Firebase SDK v9+ imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHPbfdF97LhsGkb1sf_Sd61X01aVf3yw0",
  authDomain: "react-e-commerce-434ac.firebaseapp.com",
  projectId: "react-e-commerce-434ac",
  storageBucket: "react-e-commerce-434ac.appspot.com",
  messagingSenderId: "388586357419",
  appId: "1:388586357419:web:64178f8ec6af7a1afaedee",
  measurementId: "G-3NQLCKDSS5",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Firestore Database
const db = getFirestore(app);

// Export db to use it in other files
export { db };
