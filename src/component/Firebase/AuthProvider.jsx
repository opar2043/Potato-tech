import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth from './Firebase.config';
export const AuthContext = createContext()
const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider()

  function handleGoogle() {
    setLoading(true);
    return signInWithPopup(auth, provider);
  }

  function handleLogout(){
    setLoading(true);
    return signOut(auth )
  }


  function handleRegister(email , pass){
      setLoading(true)
      return createUserWithEmailAndPassword(auth , email , pass)
  }

  function handleLogin(email , pass){
     setLoading(true)
     return signInWithEmailAndPassword(auth , email , pass)
  }
  useEffect(()=>{
     const unsub = onAuthStateChanged(auth , currentUser => {
          if(currentUser){
               setLoading(false)
               setUser(currentUser)
          }else{
               setLoading(true)
               setUser(null)
          }
     })

     return ()=> unsub()
  },[])

  const file = {
    handleGoogle,
    user,
    setUser,
    loading,
    setLoading,
    handleLogout,
    handleLogin,
    handleRegister
  };


     return <AuthContext.Provider value={file}>
                {children}
     </AuthContext.Provider>
}

export default AuthProvider