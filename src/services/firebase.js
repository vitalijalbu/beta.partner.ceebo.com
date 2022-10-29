import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAU1B7Ymn1fVY4JWoDBvWQ8A1AP097xsSQ",
  authDomain: "ceebo-278012.firebaseapp.com",
  databaseURL: "https://ceebo-278012.firebaseio.com",
  projectId: "ceebo-278012",
  storageBucket: "ceebo-278012.appspot.com",
  messagingSenderId: "80460230296",
  appId: "1:80460230296:web:06d7a73cc82d9d6159eaed",
  measurementId: "G-5KTG24PP2T"
};




// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getDatabase();
