// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeGTabK8LkrnAsFvd9mepKfz8c2-ydOGA",
    authDomain: "friendsbook-6404b.firebaseapp.com",
    databaseURL: "https://friendsbook-6404b-default-rtdb.firebaseio.com",
    projectId: "friendsbook-6404b",
    storageBucket: "friendsbook-6404b.appspot.com",
    messagingSenderId: "869197631060",
    appId: "1:869197631060:web:5937eb59677932a7c167c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };