// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
  
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe-aK_CWq7kaMj69-_W-Ggx1bmmsFmBUk",
  authDomain: "crudjs-5e36f.firebaseapp.com",
  databaseURL: "https://crudjs-5e36f-default-rtdb.firebaseio.com",
  projectId: "crudjs-5e36f",
  storageBucket: "crudjs-5e36f.appspot.com",
  messagingSenderId: "1014878080442",
  appId: "1:1014878080442:web:57f55eb8aba0552504a183",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveUser = ( name, flastname, slastname, phone, email, description) => {
  addDoc(collection(db, "Users"), {
    name,
    flastname,
    slastname,
    phone,
    email,
    description,
  });
};

export const getUsers = () => getDocs(collection(db,'Users'))

export const onGetUsers = (callback) => onSnapshot(collection(db, 'Users'), callback)

export const deleteUser = id => deleteDoc(doc(db, 'Users', id))

export const getUser = id => getDoc(doc(db, 'Users', id))

export const updateUser = (id, newFields) => updateDoc(doc(db, 'Users', id), newFields)