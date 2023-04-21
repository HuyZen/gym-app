import firebase from 'firebase/compat/app';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

  // Configure Firebase.
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = getAuth();
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
}
export const signin=async(email,pass)=>{
  return await signInWithEmailAndPassword(auth,email,pass);
}
export const signup=async(email,pass)=>{
  return await createUserWithEmailAndPassword(auth,email,pass);
}
export const logout=async()=>{
  return signOut(auth);
}
// Change profile 
const storage=getStorage();
export async function upload (file,currentUser,setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Upload file success")
}
export { auth,storage };