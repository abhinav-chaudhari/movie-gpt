import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        showSearch: false,
        movieResults: null,
        movieNames: null

    },
    reducers: {
        toggleSearch: (state) =>{
            state.showSearch = !state.showSearch;
        },
        addMovieResult: (state, action) => {
            const {movieNames, movieResults} = action.payload
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        }
    }
})

export const {toggleSearch, addMovieResult} = searchSlice.actions;

export default searchSlice.reducer;