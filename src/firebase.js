import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCukaOhBNALJAHCbx4LjhBi8dtBmjUWT7w",
    authDomain: "mern-whatsapp-ac4a3.firebaseapp.com",
    projectId: "mern-whatsapp-ac4a3",
    storageBucket: "mern-whatsapp-ac4a3.appspot.com",
    messagingSenderId: "712566100635",
    appId: "1:712566100635:web:f4496a5e39550cde75ac3e"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  export {app,auth,provider}