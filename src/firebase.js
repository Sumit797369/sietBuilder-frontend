// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sitebuilder-e81e5.firebaseapp.com",
  projectId: "sitebuilder-e81e5",
  storageBucket: "sitebuilder-e81e5.firebasestorage.app",
  messagingSenderId: "159027743033",
  appId: "1:159027743033:web:4d14310a9d4eb05946c0e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider };
