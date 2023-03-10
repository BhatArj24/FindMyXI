import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBfGCrRtXi1iPXOEILL138pntVbT8wqVgM",
    authDomain: "findmyxi.firebaseapp.com",
    projectId: "findmyxi",
    storageBucket: "findmyxi.appspot.com",
    messagingSenderId: "600911320872",
    appId: "1:600911320872:web:9dade50f3a015563f9e21d",
    measurementId: "G-136DP4DQN9"
  };
  
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
