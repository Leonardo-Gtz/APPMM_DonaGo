// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgIM4TumxFuOuOELUrzN9__JgDvl8n1h0",
  authDomain: "donago-65e03.firebaseapp.com",
  projectId: "donago-65e03",
  storageBucket: "donago-65e03.firebasestorage.app",
  messagingSenderId: "911492300778",
  appId: "1:911492300778:web:801daee058ef8fb7a53c93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };