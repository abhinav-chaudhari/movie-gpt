// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "moviegpt-2cfd2.firebaseapp.com",
  projectId: "moviegpt-2cfd2",
  storageBucket: "moviegpt-2cfd2.appspot.com",
  messagingSenderId: "659872271328",
  appId: "1:659872271328:web:5a5e169e8531dc2e58f985",
  measurementId: "G-9EZQGV3DVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();