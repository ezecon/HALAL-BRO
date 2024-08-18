import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAh6FVWRSfOmvgLr1no7nmG1kmzwY9ueFs",
    authDomain: "halal-bro.firebaseapp.com",
    projectId: "halal-bro",
    storageBucket: "halal-bro.appspot.com",
    messagingSenderId: "242011085168",
    appId: "1:242011085168:web:5717f3c152699cbf9217b5",
    measurementId: "G-ZWYZBQQ0FS"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Auth Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export the auth and provider objects
export { auth, provider };