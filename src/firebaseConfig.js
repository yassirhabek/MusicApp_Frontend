 import { initializeApp } from "firebase/app";
 import { getStorage } from 'firebase/storage';

 // Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyCxtbhlE_IPvGvliGwOty2PizU-cQtv4dk",
    authDomain: "react-6810b.firebaseapp.com",
    projectId: "react-6810b",
    storageBucket: "react-6810b.appspot.com",
    messagingSenderId: "994986053525",
    appId: "1:994986053525:web:ed2a762c96aa9227eff09c",
    measurementId: "G-FRFSG3B54M"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;