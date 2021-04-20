import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBflbPWV6tRkMhzoXNwkGPzxASTg5PXygM",
    authDomain: "copy-machine-be0af.firebaseapp.com",
    projectId: "copy-machine-be0af",
    storageBucket: "copy-machine-be0af.appspot.com",
    messagingSenderId: "865060031492",
    appId: "1:865060031492:web:d8f580b434b3543a00b951",
    measurementId: "G-NESZJ752MZ"
  };
   // Initialize Firebase
var Firebase = firebase.initializeApp(firebaseConfig);


export default Firebase;