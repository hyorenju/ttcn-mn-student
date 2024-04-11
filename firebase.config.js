// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgirpCsDz0SkVA_2cyWj7cK5cTOKVfeW0",
  authDomain: "student-eadd0.firebaseapp.com",
  projectId: "student-eadd0",
  storageBucket: "student-eadd0.appspot.com",
  messagingSenderId: "199780889954",
  appId: "1:199780889954:web:60ee6743fd68427e64a83b",
  measurementId: "G-VQRL704396"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);