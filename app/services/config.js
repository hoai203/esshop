// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ8EeT9V0BXcKLPe28DLZWeLmv-R7p_kI",
  authDomain: "ecmascript-412cd.firebaseapp.com",
  databaseURL: "https://ecmascript-412cd-default-rtdb.firebaseio.com",
  projectId: "ecmascript-412cd",
  storageBucket: "ecmascript-412cd.appspot.com",
  messagingSenderId: "357311991734",
  appId: "1:357311991734:web:6ebf1815ea8d8f094f7b17",
  measurementId: "G-NFVYS8J6YH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app);
