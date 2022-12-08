import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvTcCBMNvvrzGpWAUDlUWYKCr_GEY2wlw",
  authDomain: "taskmanager-f1cdf.firebaseapp.com",
  projectId: "taskmanager-f1cdf",
  storageBucket: "taskmanager-f1cdf.appspot.com",
  messagingSenderId: "874395024875",
  appId: "1:874395024875:web:69ce00e7d4895b849d2dae"
};

// Initialize Firebase
export const firebaseDB = initializeApp(firebaseConfig);