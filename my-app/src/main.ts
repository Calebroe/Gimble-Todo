import { createApp } from 'vue'
import './style.css'
import App from './BaseView.vue'
import router from './router';

// Firebase setup
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDFxB_DM599rwUe-nDtICzllz0EH4KVm-o",
  authDomain: "gimble-7a784.firebaseapp.com",
  projectId: "gimble-7a784",
  storageBucket: "gimble-7a784.appspot.com",
  messagingSenderId: "521522350893",
  appId: "1:521522350893:web:2ee9b8bb62342284c561a4",
  measurementId: "G-DDP60ZXP78"
};

const app = createApp(App);
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.use(router);
app.provide('db', db);
app.mount('#app');



