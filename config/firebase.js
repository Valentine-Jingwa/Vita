// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABmty0kc9T9wurbYzokcWH-WnUomcKl-Y",
  authDomain: "vita-fcb81.firebaseapp.com",
  projectId: "vita-fcb81",
  storageBucket: "vita-fcb81.appspot.com",
  messagingSenderId: "1012793317257",
  appId: "1:1012793317257:web:3a43073bf777ad72beb358",
  measurementId: "G-3890MKN199"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();