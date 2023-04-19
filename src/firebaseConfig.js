import firebase from 'firebase/compat/app';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

  // Configure Firebase.
  const firebaseConfig = {
    apiKey: "AIzaSyCcaGlGB9yVFM_r-4eW9yqaHrKaNCuH4yE",
    authDomain: "gym-exercises-app-25f23.firebaseapp.com",
    projectId: "gym-exercises-app-25f23",
    storageBucket: "gym-exercises-app-25f23.appspot.com",
    messagingSenderId: "933926849086",
    appId: "1:933926849086:web:19e78bffc6376a880f1f6f"
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
export const upload = async (file,currentUser,setLoading) =>{
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  // setLoading(false);
}
export { auth,storage };