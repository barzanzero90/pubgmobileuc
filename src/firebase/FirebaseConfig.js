import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBkuMbL8hQZ8GebUcQuc80JlwJlbqfIlUE",
    authDomain: "pubg-mobile-59a78.firebaseapp.com",
    projectId: "pubg-mobile-59a78",
    storageBucket: "pubg-mobile-59a78.appspot.com",
    messagingSenderId: "513140046025",
    appId: "1:513140046025:web:01202ec18e21421b3af518",
    measurementId: "G-D8K9PQDXVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };