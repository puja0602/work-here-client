import React, { createContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signOut, onAuthStateChanged, GithubAuthProvider } from 'firebase/auth';
import {auth} from '../Firebase/firebase.config'
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    // console.log(loader)
    // console.log(user);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    const loginUser = (email,password) =>{
        setLoader(true);
    return signInWithEmailAndPassword(auth, email, password)
    }

    const registerUser = (email,password) =>{
        setLoader(true);
     return createUserWithEmailAndPassword(auth, email, password)
    
    }

    const googleLogin = () =>{
        setLoader(true);
        return signInWithPopup(auth, googleProvider)
    }

    const githubLogin = () =>{
        setLoader(true);
        return signInWithPopup(auth, githubProvider);
    }

    const logout = () =>{ 
        setUser(null)
        signOut(auth);
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setLoader(false);
            }
            });
        return ()=> unsubscribe();
    },[])

   const updateUserProfile = (name,photoURL)=>{
    return updateProfile(auth.currentUser, {
        displayName: name, 
        photoURL: photoURL
      })
   } 
   const updateProfileFromUser = (name,photoURL)=>{
    return updateProfile(auth.currentUser,{
        displayName: name,
        photoURL: photoURL
    })
   }
    const authInfo = {
        loginUser,
        registerUser,
        googleLogin,
        setUser,
        user,
        logout,
        updateUserProfile,
        loader,
        setLoader,
        updateProfileFromUser,
        githubLogin
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;