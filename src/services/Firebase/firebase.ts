import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth';

import { getAnalytics } from "firebase/analytics";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5_Ny46zF3o1CKxz1wyqWc-CkRlQDA4HI",
  authDomain: "sps-web-shop-ctrinidad.firebaseapp.com",
  projectId: "sps-web-shop-ctrinidad",
  storageBucket: "sps-web-shop-ctrinidad.firebasestorage.app",
  messagingSenderId: "1011137979928",
  appId: "1:1011137979928:web:1afde838b6eb7417a8056d",
  measurementId: "G-QV035L0YE9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const facebookAuth = new FacebookAuthProvider();
export const googleAuth = new GoogleAuthProvider();

