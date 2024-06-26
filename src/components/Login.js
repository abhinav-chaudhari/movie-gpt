import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/Validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BG_IMG_URL, PHOTOURL } from '../utils/constants'

const 
Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)

    const [errorMessage, setErrorMessage] = useState(null)

    const dispatch = useDispatch()

    

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null)

    const handleButtonClick = () => {
        // validate the form data
        const message = isSignInForm ? checkValidateData(email.current.value, password.current.value) : checkValidateData(email.current.value, password.current.value, name.current.value)
        
       setErrorMessage(message);
        // console.log(message)
        // console.log(email.current.value);
        // console.log(password.current.value);
        // console.log(name.current.value);

        if(message) return;

        // Sign In / Sign Up
        if(!isSignInForm){
            // Sign Up 
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user
                    updateProfile(user,{
                        displayName: name.current.value, photoURL: PHOTOURL
                    }).then(() => {
                        const {uid, email,displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
                        
                    }).catch((error) => {   
                        setErrorMessage(error.message)
                    })
                   
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - "+errorMessage)
                })
        }else{
            // Sign In
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+ " - "+errorMessage)
                })

        }


    }
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img className='h-screen object-cover md:h-auto' src={BG_IMG_URL}
            alt="background" />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='w-full md:w-3/12 absolute p-12 bg-black rounded-lg my-36 mx-auto right-0 left-0 text-white bg-opacity-85'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign in" : "Sign Up"}</h1>
            {!isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-900' />}
            <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-900' />
            <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-900' />
            <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg '  onClick={handleButtonClick}>{isSignInForm ? "Sign in" : "Sign Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up Now" : "Already Registered User Sign In Now "}</p>
        </form>
    </div>
  )
}

export default Login