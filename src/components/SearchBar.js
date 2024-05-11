import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import genAI from '../utils/gemini';
import { API_OPTIONS } from '../utils/constants';
import { addMovieResult } from '../utils/searchSlice';

const  SearchBar = () => {
    const language = useSelector(store => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();

    const searchMovieOnTMDB = async (movie) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS)

        const json = await data.json()
        return json.results;
    }

    const handleSearchClick = async () => {
        // console.log(searchText.current.value);
        // make an api call to AI to get movie results
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const prompt = "Act as a movie recommendation system and suggest some movies for the prompt"+searchText.current.value+". only give names of 5 movies and give results without numbering instead give comma seperated";

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        if (!text) return null;
        console.log(text);

        const movieList = text.split(",");
        // console.log(movieList);

        // for each movie search in TMDB API

        const promiseArray = movieList.map(movie => searchMovieOnTMDB(movie));

        const tmdbResults = await Promise.all(promiseArray);
        // console.log(tmdbResults);
        dispatch(addMovieResult({movieNames: movieList, movieResults: tmdbResults}))
    }
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2  bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-4 col-span-9'  placeholder={lang[language].searchPlaceholder} />
            <button className='py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg' onClick={handleSearchClick}>{lang[language].search}</button>
        </form>
    </div>
  )
}

export default SearchBar