import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrGnNMt9dZ-E39OT9A4_pGEg4lmTq2jJ8",
  authDomain: "ecommerce-site-2a58f.firebaseapp.com",
  projectId: "ecommerce-site-2a58f",
  storageBucket: "ecommerce-site-2a58f.appspot.com",
  messagingSenderId: "236377096001",
  appId: "1:236377096001:web:d9f643ebfad3eebbed6bc0",
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
