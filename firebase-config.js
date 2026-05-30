// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase config (keep yours)
const firebaseConfig = {
  apiKey: "AIzaSyBcTWT-ZamWEYLVvxXGNXWwNroL0gbPRWE",
  authDomain: "to-do-daily-list.firebaseapp.com",
  projectId: "to-do-daily-list",
  storageBucket: "to-do-daily-list.firebasestorage.app",
  messagingSenderId: "175405594075",
  appId: "1:175405594075:web:486b71566afbbfd2e723fe",
  measurementId: "G-861SKF7MB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
