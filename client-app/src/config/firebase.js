import firebaseApp from 'firebase/app';
import 'firebase/storage';
var firebaseConfig = {
    apiKey: " ",
    authDomain: " ",
    projectId: " ",
    storageBucket: " ",
    messagingSenderId: " ",
    appId: " ",
    measurementId: " "
};
// Initialize Firebase
firebaseApp.initializeApp(firebaseConfig)

let Storage = firebaseApp.storage();

export default Storage