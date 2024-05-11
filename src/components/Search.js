import React from 'react'
import SearchBar from './SearchBar'
import MovieSuggestion from './MovieSuggestion'
import { BG_IMG_URL } from '../utils/constants'

const Search = () => {
  return (
    <div>
        <div className='fixed -z-10'>
            <img src={BG_IMG_URL} alt='background' />
        </div>
        <SearchBar />
        <MovieSuggestion />
    </div>
  )
}

export default Search