import React from 'react'
import SearchBar from './SearchBar'
import MovieSuggestion from './MovieSuggestion'
import { BG_IMG_URL } from '../utils/constants'

const Search = () => {
  return (
    <>
    <div className='fixed -z-10'>
            <img className='h-screen object-cover md:h-auto' src={BG_IMG_URL} alt='background' />
    </div>
    <div className=''>
        
        <SearchBar />
        <MovieSuggestion />
    </div>
    </>
  )
}

export default Search