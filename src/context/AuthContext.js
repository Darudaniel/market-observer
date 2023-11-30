import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
  
  const [user, setUser] = useState(null)


  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
  const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })
  return () => unsuscribe()
  }, [user])

  return (
    <AuthContext.Provider value={{user, googleSignIn, logOut}}>
      {children}
    </AuthContext.Provider>
  )

}

export const UserAuth = () => {
  return useContext(AuthContext)
}