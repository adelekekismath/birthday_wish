// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB0BOxlcVNn3zotThHtVKPRIQ1vnSxKyrs",
    authDomain: "birthdaywish-f891f.firebaseapp.com",
    projectId: "birthdaywish-f891f",
    storageBucket: "birthdaywish-f891f.firebasestorage.app",
    messagingSenderId: "484605669443",
    appId: "1:484605669443:web:d49ac05fab230a796aa4f6",
    measurementId: "G-Y3EPQZSX8E"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);