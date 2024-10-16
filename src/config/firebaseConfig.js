import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAUeOyMTWw1obIUkRFxkFoPNJUBMrCjAQM",
  authDomain: "gaming-club-5ee5b.firebaseapp.com",
  projectId: "gaming-club-5ee5b",
  storageBucket: "gaming-club-5ee5b.appspot.com",
  messagingSenderId: "150338001978",
  appId: "1:150338001978:android:57881c047b48af9e696903",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Auth com persistência usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializa o Firestore
const db = getFirestore(app);

export { db, auth };
