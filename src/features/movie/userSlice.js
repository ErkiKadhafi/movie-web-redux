import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "https://notflixtv.herokuapp.com/api/v1";

const userState = JSON.parse(localStorage.getItem("movie-web"))
    ? JSON.parse(localStorage.getItem("movie-web"))
    : {};
const userAuthenticated = JSON.parse(localStorage.getItem("movie-web"))
    ? true
    : false;

const initialState = {
    authenticated: userAuthenticated,
    user: userState,
};

export const login = createAsyncThunk(
    "/users/login",
    async (payload, thunkAPI) => {
        let url = `${baseUrl}/users/login`;
        try {
            const resp = await axios.post(url, payload);
            if (resp.data.data.token) {
                localStorage.setItem(
                    "movie-web",
                    JSON.stringify(resp.data.data)
                );
            }
            return resp.data.data;
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

export const signup = createAsyncThunk("/users", async (payload, thunkAPI) => {
    let url = `${baseUrl}/users`;
    try {
        const resp = await axios.post(url, payload);
        if (resp.data.data.token) {
            localStorage.setItem("movie-web", JSON.stringify(resp.data.data));
        }
        return resp.data.data;
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
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("movie-web");
            state.authenticated = false;
            state.user = {};
        },
    },
    extraReducers: {
        [login.pending]: (state) => {},
        [login.fulfilled]: (state, { payload }) => {
            state.authenticated = true;
            state.user = payload;
        },
        [login.rejected]: (state, action) => {
            state.authenticated = false;
            state.user = {};
        },
        [signup.pending]: (state) => {},
        [signup.fulfilled]: (state, { payload }) => {
            state.authenticated = true;
            state.user = payload;
        },
        [signup.rejected]: (state, action) => {
            state.authenticated = false;
            state.user = {};
        },
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
