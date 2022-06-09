import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./features/movie/movieSlice";
import userSlice from "./features/movie/userSlice";

export const store = configureStore({
    reducer: {
        movie: movieSlice,
        user: userSlice,
    },
});
