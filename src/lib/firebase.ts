// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDaMiwUMNt9lU8RVuBcC60CCwyjw9vM9U8',
  authDomain: 'vpcmc-intern-project.firebaseapp.com',
  projectId: 'vpcmc-intern-project',
  storageBucket: 'vpcmc-intern-project.appspot.com',
  messagingSenderId: '239198289181',
  appId: '1:239198289181:web:1ae35cde441eb294cfb5f4',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
