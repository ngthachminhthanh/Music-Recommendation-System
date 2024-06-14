// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyADgA3fZ0Rp2ldy1FYjLiDJ5sbwZH5ij-Q",
    authDomain: "recommendation-system-1e255.firebaseapp.com",
    databaseURL: "https://recommendation-system-1e255-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "recommendation-system-1e255",
    storageBucket: "recommendation-system-1e255.appspot.com",
    messagingSenderId: "655731418970",
    appId: "1:655731418970:web:7588550201ef0aa322f563"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
