import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { toggleSearch } from '../utils/searchSlice'
import { changeLanguage } from '../utils/configSlice'

const Header = () => {

  const navigate  = useNavigate()

  const user = useSelector(store => store.user);

  const dispatch = useDispatch()

  const showSearch = useSelector((store) => store.search.showSearch)
  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error")
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user){
            const {uid, email,displayName, photoURL} = user;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
            navigate("/browse")
        }else{
            dispatch(removeUser());
            navigate("/")
        }
    })
    // unsubscribes when component unmounts
    return () => unsubscribe();
},[])

const handleSearchClick = () => {
  dispatch(toggleSearch());   
}

const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
}

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-44' src={LOGO}
        alt='logo' />
        { user && (<div className='flex p-2'>
          {showSearch && (<select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>)}
          <button className='py-2 px-4 mx-4 my-2 bg-slate-900 text-white rounded-lg' onClick={handleSearchClick}>{ showSearch ? "HomePage" : "Movie Search"}</button>
          <img src={user.photoURL} className='m-2 p-1 w-12 h-12' alt='usericon' />
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>)}
    </div>
  )
}

export default Header;