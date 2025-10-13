// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 🔥 Firestore uchun
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDm5CRpYpkiQLSDjAMgKRsUn21DC2aoIpc",
  authDomain: "ilmalogiya.firebaseapp.com",
  projectId: "ilmalogiya",
  storageBucket: "ilmalogiya.firebasestorage.app",
  messagingSenderId: "157089587775",
  appId: "1:157089587775:web:3f261d58068a2c20224e8a",
  measurementId: "G-TDPH6SV5Z2"
};

// Firebase ilovasini ishga tushirish
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 🔹 Firestore’ni yaratamiz va eksport qilamiz
export const db = getFirestore(app);
