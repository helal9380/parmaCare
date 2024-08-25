/** @format */

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const axiosPublic = useAxiosPublic()


  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // const updateUser = () => {
  //   return updateProfile(auth, {

  //   })
  // }

  const gooleSignIn = () => {
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const  unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        const userInfo = {email: currentUser?.email}
        console.log(userInfo);
        axiosPublic.post('/jwt', userInfo)
        .then(res => {
          if(res.data.token) {
            localStorage.setItem('access-token', res.data.token);
            setLoading(false)
          }
        })
      }
      else {
        // remove token
        localStorage.removeItem('access-token')
      }
      setUser(currentUser)
      setLoading(false)
      console.log( 'user ace',currentUser);

    })
    return () => {
      unSubscribe()
    }
  },[axiosPublic])
  const authInfo = {
    createUser,
    signIn,
    loading,
    logOut,
    user,
    gooleSignIn
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
