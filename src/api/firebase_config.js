import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD67_W3EsLSBpZft9EpZkVaMhGR-3ZNLhE",
  authDomain: "taskmanager-4af9e.firebaseapp.com",
  projectId: "taskmanager-4af9e",
  storageBucket: "taskmanager-4af9e.appspot.com",
  messagingSenderId: "632105388224",
  appId: "1:632105388224:web:5a9c8417c7d15914dbc525",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(app);
