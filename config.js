import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/auth';


const AuthConfig = {
  apiKey: "AIzaSyDIZ8yweg2hWIsVnvp4NryB0MgPaQ_9UEM",
  authDomain: "userside-32ed4.firebaseapp.com",
  projectId: "userside-32ed4",
  storageBucket: "userside-32ed4.appspot.com",
  messagingSenderId: "253924604992",
  appId: "1:253924604992:web:7691842fb9812adf82b3a5",
  measurementId: "G-7QB9R6XCFB"
};


  const adminConfig = {
    apiKey: "AIzaSyDNfmMXNGtEnKLMoHEPSuJWDCajKkc2pgE",
    authDomain: "adminapp-5fda7.firebaseapp.com",
    projectId: "adminapp-5fda7",
    storageBucket: "adminapp-5fda7.appspot.com",
    messagingSenderId: "960700266566",
    appId: "1:960700266566:web:1f32ccb9453663925a7247",
    measurementId: "G-5XHH37J9P0"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(AuthConfig); // Initialize Firebase for user authentication
    firebase.initializeApp(adminConfig, 'adminApp'); // Initialize Firebase for admin functionality
  } else {
    firebase.app('adminApp'); // Retrieve the admin app if already initialized
  }
  
  export const auth = firebase.auth(); // User authentication
  export const firestore = firebase.firestore(); 
  export const storage = firebase.storage();// General Firestore access
  export const adminDb = firebase.app('adminApp').firestore(); // Admin-specific Firestore
  export const touristRef = adminDb.collection('touristSpots'); //
  export {firebase,};