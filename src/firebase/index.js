import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from '@firebase/firestore'
import { getAnalytics, logEvent } from "firebase/analytics";


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider()

export const auth = getAuth(app);

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result)=> {
      console.log('Signed')
    })
    .catch((error) => {
      console.log(error)
    })
  }
export const db = getFirestore(app);

export const registerEvent = (event) => {
  logEvent(analytics, event);
}