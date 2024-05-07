import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/Validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const 
Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)

    const [errorMessage, setErrorMessage] = useState(null)

    const dispatch = useDispatch()

    const navigate = useNavigate();

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
                        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/122730733?v=4"
                    }).then(() => {
                        const {uid, email,displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
                        navigate("/browse");
                    }).catch((error) => {   
                        setErrorMessage(error.message)
                    })
                    console.log(user);
                    navigate("/browse");
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
                    console.log(user);
                    navigate("/browse");
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
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/d253acf4-a1e2-4462-a416-f78802dc2d85/f04bf88c-f71c-4d02-82ed-adb870b8f8db/IN-en-20240429-POP_SIGNUP_TWO_WEEKS-perspective_WEB_658a042e-62cf-473d-8da0-7b875f23e2ef_small.jpg'
            alt="background" />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className=' w-3/12 absolute p-12 bg-black rounded-lg my-36 mx-auto right-0 left-0 text-white bg-opacity-85'>
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