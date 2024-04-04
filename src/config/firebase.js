// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD13EkLUI3cZOvX41E-45fkCHYMCx1XBF0',
  authDomain: 'deeppulmo.firebaseapp.com',
  databaseURL: 'https://deeppulmo-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'deeppulmo',
  storageBucket: 'deeppulmo.appspot.com',
  messagingSenderId: '1088591745290',
  appId: '1:1088591745290:web:3818aa4418c5c52af3eaf3',
  measurementId: 'G-DDLDMQDQY4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//auth
const auth = getAuth(app);
export { app, analytics, auth };

export default { app };
