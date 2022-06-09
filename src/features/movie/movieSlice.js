import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = "https://notflixtv.herokuapp.com/api/v1";

const initialState = {
    allMovies: [],
    singleMovie: {
        casts: [],
        genres: [],
        reviews: [],
    },
    totalDocs: 0,
    limit: 15,
    totalPages: 5,
    page: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 2,
    category: "",
    isLoadingAllMovies: false,
    isLoadingSingleMovie: false,
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
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.dismiss();
            toast.error(message);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const getSingleMovie = createAsyncThunk(
    "/movie/getSingleMovie",
    async (id, thunkAPI) => {
        let urlFetch = `${url}/movies/${id}`;
        try {
            const resp = await axios(urlFetch);
            return resp.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.dismiss();
            toast.error(message);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const submitReview = createAsyncThunk(
    "/review/create",
    async (payload, thunkAPI) => {
        const { user } = thunkAPI.getState().user;
        const postUrl = `${url}/reviews/${payload.id}/create`;
        try {
            const resp = await axios.post(
                postUrl,
                {
                    rating: payload.rating,
                    title: payload.title,
                    content: payload.content,
                },
                {
                    headers: { Authorization: "Bearer " + user.token },
                }
            );
            // console.log(resp);
            return resp.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.dismiss();
            toast.error(message);
            console.log(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        clearSingleMovie: (state) => {
            state.singleMovie = { casts: [], genres: [], reviews: [] };
        },
    },
    extraReducers: {
        [getAllMovies.pending]: (state) => {
            state.isLoadingAllMovies = true;
        },
        [getAllMovies.fulfilled]: (state, action) => {
            // console.log(action);
            state.isLoadingAllMovies = false;
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
            state.isLoadingAllMovies = false;
        },
        [getSingleMovie.pending]: (state) => {
            state.isLoadingSingleMovie = true;
        },
        [getSingleMovie.fulfilled]: (state, { payload }) => {
            state.isLoadingSingleMovie = false;
            state.singleMovie = payload.data;
            state.singleMovie.trailer = payload.data.trailer
                .split("/")
                .pop()
                .split("=")
                .pop();
            // console.log(state.singleMovie.trailer);
        },
        [getSingleMovie.rejected]: (state, action) => {
            state.isLoadingSingleMovie = false;
        },
        [submitReview.pending]: (state) => {},
        [submitReview.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.singleMovie.reviews.push(payload.data);
        },
        [submitReview.rejected]: (state, action) => {},
    },
});

export const { clearSingleMovie } = movieSlice.actions;

export default movieSlice.reducer;
