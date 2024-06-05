// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { /* connectFirestoreEmulator, */ getFirestore } from 'firebase/firestore';
// import { isDev } from '../isDev';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAbCYuMI6QlR4cTzn5ilKdajpJqS8_WQic',
    authDomain: 'miniext-project.firebaseapp.com',
    projectId: 'miniext-project',
    storageBucket: 'miniext-project.appspot.com',
    messagingSenderId: '1086947359487',
    appId: '1:1086947359487:web:7b276ce1a131292a84aaca',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
export const baseBucketName = 'BaseBucket';

/* if (isDev) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8081);
} */
