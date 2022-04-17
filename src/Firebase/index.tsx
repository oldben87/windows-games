import {initializeApp} from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD9Ig2ZhTdQ3Qe41I-_pLAMCT48jZMaGvg",
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig, "Jedi Apps")
export const Auth = getAuth(firebase)

export const signUpUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(Auth, email, password)
}

export const listenForAuthState = (callback: (user: User | null) => void) => {
  onAuthStateChanged(Auth, callback)
}

export const logInUser = async (email: string, password: string) => {
  try {
    return signInWithEmailAndPassword(Auth, email, password).catch((error) => {
      throw new Error(error)
    })
  } catch (error) {
    throw new Error(error as string)
  }
}

export const logoutUser = async () => {
  signOut(Auth)
}
