import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';

// Firebase setup
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiPbIRyQ4A2GjWpS8t6yM_xyTbhInRnwo",
  authDomain: "not-so-jolly-emporium.firebaseapp.com",
  projectId: "not-so-jolly-emporium",
  storageBucket: "not-so-jolly-emporium.appspot.com",
  messagingSenderId: "289922164067",
  appId: "1:289922164067:web:703f5c13ade5c50735df56"
};

const app = createApp(App);
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.use(router);
app.provide('db', db);
app.mount('#app');



