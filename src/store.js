import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./features/movie/movieSlice";

export const store = configureStore({
    reducer: {
        movie: movieSlice,
    },
});
