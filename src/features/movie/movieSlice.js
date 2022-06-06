import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://notflixtv.herokuapp.com/api/v1";

const initialState = {
    allMovies: [],
    totalDocs: 0,
    limit: 15,
    totalPages: 5,
    page: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 2,
    category: "",
    isLoadingAllCar: false,
};

export const getAllMovies = createAsyncThunk(
    "/movie/getAllMovies",
    async (name, thunkAPI) => {
        let urlFetch = `${url}/movies`;
        if (typeof name !== "undefined") {
            urlFetch += name;
        }
        try {
            const resp = await axios(urlFetch);
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const movieSlice = createSlice({
    name: "movie",
    initialState,
    extraReducers: {
        [getAllMovies.pending]: (state) => {
            state.isLoadingAllCar = true;
        },
        [getAllMovies.fulfilled]: (state, action) => {
            // console.log(action);
            state.isLoadingAllCar = false;
            state.allMovies = action.payload.data.docs;
            state.totalDocs = action.payload.data.totalDocs;
            state.totalPages = action.payload.data.totalPages;
            state.page = action.payload.data.page;
            state.prevPage = action.payload.data.prevPage;
            state.nextPage = action.payload.data.nextPage;
            state.hasPrevPage = action.payload.data.hasPrevPage;
            state.hasNextPage = action.payload.data.hasNextPage;
        },
        [getAllMovies.rejected]: (state, action) => {
            // console.log(action);
            state.isLoadingAllCar = false;
        },
    },
});

export default movieSlice.reducer;
