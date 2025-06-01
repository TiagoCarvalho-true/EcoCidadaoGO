import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "ecocidadaogo.firebaseapp.com",
  projectId: "ecocidadaogo",
  storageBucket: "ecocidadaogo.appspot.com",
  messagingSenderId: "370101011794",
  appId: "1:370101011794:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };