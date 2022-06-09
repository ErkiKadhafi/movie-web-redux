import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    clearSingleMovie,
    getSingleMovie,
    submitReview,
} from "../features/movie/movieSlice";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Movie = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleMovie, isLoadingSingleMovie } = useSelector(
        (store) => store.movie
    );
    const { authenticated, user } = useSelector((store) => store.user);

    const [movieRating, setMovieRating] = useState(0);

    useEffect(() => {
        dispatch(clearSingleMovie());
        dispatch(getSingleMovie(id));
    }, []);

    const initialValues = {
        title: "",
        content: "",
        rating: 5,
    };

    const validationSchema = () => {
        const validationObject = {
            title: Yup.string().required("Review title is required"),
            rating: Yup.number()
                .min(1, "min 1")
                .max(10, "max 10")
                .required("Required"),
            content: Yup.string().required("Review content is required"),
        };
        return Yup.object().shape(validationObject);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            // console.log(values);
            // console.log(movieRating);
            const payload = {
                id,
                ...values,
            };
            // console.log(payload);
            toast.loading("Submiting . . .");
            dispatch(submitReview(payload))
                .unwrap()
                .then(() => {
                    resetForm();
                    toast.dismiss();
                    toast.success("Thanks for your review!");
                });
        },
    });

    return (
        <>
            {/* ======== START ::: HERO SECTION ======== */}
            <section className="pt-20 pb-10">
                <div className="layout relative">
                    <div
                        className="h-96 lg:h-480px w-full"
                        style={{ borderRadius: "40px" }}
                    >
                        <iframe
                            className="w-full h-full rounded-3xl"
                            src={`https://www.youtube.com/embed/${singleMovie.trailer}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="absolute bottom-0 transform translate-y-1/2 bg-blurBg/[.9] rounded-3xl p-6 w-full lg:p-10 lg:w-560px lg:left-14">
                        <div className="space-x-3 text-primary-primary/200 mb-2">
                            <span>MovieApp</span>
                            <span>/</span>
                            <span>Movies</span>
                        </div>
                        <h1 className="text-3xl font-semibold text-gray-gray/50">
                            {isLoadingSingleMovie
                                ? "Movie Title"
                                : singleMovie.title}
                        </h1>
                    </div>
                </div>
            </section>
            {/* ======== END ::: HERO SECTION ======== */}
            {/* ======== START ::: DETAIL SECTION ======== */}
            <section className="py-16 lg:pt-20 lg:pb-16 lg:px-14">
                <div className="layout flex flex-col-reverse md:grid grid-cols-2 gap-10">
                    <div className="md:flex justify-center items-center">
                        <img
                            className="h-560px rounded-3xl"
                            src={`https://image.tmdb.org/t/p/w500${singleMovie.poster}`}
                            alt="poster 2"
                        />
                    </div>
                    <div className="space-y-6">
                        <div className="relative py-1 flex items-center ">
                            <h2 className="header-block text-2xl text-gray-gray/50 font-bold ">
                                {isLoadingSingleMovie
                                    ? "Movie Title"
                                    : singleMovie.title}
                            </h2>
                        </div>
                        <h3 className="text-lg text-gray-gray/300">
                            {isLoadingSingleMovie
                                ? "Movie Synopsis"
                                : singleMovie.synopsis}
                        </h3>
                        {/* ======== ratings ======== */}
                        <div className="bg-black-black/50 flex items-center space-x-2 p-2 w-min rounded-lg">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.15327 2.33999L10.3266 4.68666C10.4866 5.01333 10.9133 5.32666 11.2733 5.38666L13.3999 5.73999C14.7599 5.96666 15.0799 6.95333 14.0999 7.92666L12.4466 9.57999C12.1666 9.85999 12.0133 10.4 12.0999 10.7867L12.5733 12.8333C12.9466 14.4533 12.0866 15.08 10.6533 14.2333L8.65994 13.0533C8.29994 12.84 7.70661 12.84 7.33994 13.0533L5.34661 14.2333C3.91994 15.08 3.05327 14.4467 3.42661 12.8333L3.89994 10.7867C3.98661 10.4 3.83327 9.85999 3.55327 9.57999L1.89994 7.92666C0.926606 6.95333 1.23994 5.96666 2.59994 5.73999L4.72661 5.38666C5.07994 5.32666 5.50661 5.01333 5.66661 4.68666L6.83994 2.33999C7.47994 1.06666 8.51994 1.06666 9.15327 2.33999Z"
                                    stroke="#FFAD49"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="text-warning-500">
                                {isLoadingSingleMovie
                                    ? "0.0"
                                    : singleMovie.rating}
                            </span>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg text-gray-gray/400">
                                Genres
                            </h4>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-xl text-gray-gray/100">
                                {!isLoadingSingleMovie &&
                                    singleMovie.genres.map((genre, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2  text-sm text-center rounded-full text-white  bg-indigo-500 "
                                        >
                                            {genre}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ======== END ::: DETAIL SECTION ======== */}
            {/* ======== START ::: CASTS SECTION ======== */}
            <section className="pb-16 lg:pb-20 lg:px-14">
                <div className="layout">
                    <div className="relative py-1 flex items-center mb-6">
                        <h2 className="header-block text-2xl text-gray-gray/50 font-bold ">
                            Top Cast
                        </h2>
                    </div>
                    {singleMovie.casts.length > 0 ? (
                        <>
                            {!isLoadingSingleMovie && (
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 lg:gap-y-6">
                                    {singleMovie.casts.map((cast, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-4"
                                            >
                                                <div
                                                    href="#"
                                                    className="block relative"
                                                >
                                                    <img
                                                        alt="profil"
                                                        src={
                                                            cast.profile_path
                                                                ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                                                                : "/images/avatar_placeholder.png"
                                                        }
                                                        className="mx-auto object-cover rounded-full h-16 w-16 "
                                                    />
                                                </div>
                                                <div className="">
                                                    <h3 className="text-gray-gray/50 font-bold">
                                                        {cast.original_name}
                                                    </h3>
                                                    <h3 className="text-gray-gray/400">
                                                        as {cast.character}
                                                    </h3>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        <h1 className="text-xl text-gray-gray/400 font-bold text-center mt-16">
                            No Casts is listed in this movie
                        </h1>
                    )}
                </div>
            </section>
            {/* ======== END ::: CASTS SECTION ======== */}
            {/* ======== START ::: GIVE MOVIE REVIEW SECTION ======== */}
            <section className="pb-16 lg:pb-20 lg:px-14">
                <div className="layout">
                    <div className="relative py-1 flex items-center mb-6">
                        <h2 className="header-block text-2xl text-gray-gray/50 font-bold ">
                            Give Your Review
                        </h2>
                    </div>
                    {authenticated ? (
                        <form onSubmit={formik.handleSubmit}>
                            <div className="space-y-3.5 w-full bg-black-black/30 px-2 py-4 rounded-lg border border-gray-gray/700">
                                <div className=" flex justify-between space-x-1">
                                    <div className="flex space-x-3.5 items-start">
                                        <div className="block relative">
                                            <img
                                                alt="profil"
                                                src={
                                                    user.profile_path
                                                        ? `https://image.tmdb.org/t/p/w500/${user.profile_path}`
                                                        : "/images/avatar_placeholder.png"
                                                }
                                                className="object-cover rounded-full h-12 w-12 "
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center ">
                                            {/* prettier-ignore */}
                                            <h1 className="text-gray-gray/50">{user.first_name} {user.last_name}</h1>
                                            {/* prettier-ignore */}
                                            <h1 className="text-gray-gray/300">{user.email}</h1>
                                        </div>
                                    </div>
                                    <div className="space-y-1 ">
                                        <div className="flex space-x-1 justify-between">
                                            <p className="text-gray-gray/50">
                                                <span className="hidden md:inline">
                                                    Movie
                                                </span>{" "}
                                                Rating
                                            </p>
                                            <p>
                                                {" "}
                                                {formik.touched.rating &&
                                                    formik.errors.rating && (
                                                        <>
                                                            <p className="text-red-400 hidden md:block">
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .rating
                                                                }
                                                            </p>
                                                        </>
                                                    )}
                                            </p>
                                        </div>
                                        <div className="flex bg-black-black/50 rounded-lg w-min">
                                            <div
                                                type="button"
                                                className="flex space-x-1 items-center p-2 "
                                            >
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="stroke-star"
                                                >
                                                    <path
                                                        d="M9.15327 2.33999L10.3266 4.68666C10.4866 5.01333 10.9133 5.32666 11.2733 5.38666L13.3999 5.73999C14.7599 5.96666 15.0799 6.95333 14.0999 7.92666L12.4466 9.57999C12.1666 9.85999 12.0133 10.4 12.0999 10.7867L12.5733 12.8333C12.9466 14.4533 12.0866 15.08 10.6533 14.2333L8.65994 13.0533C8.29994 12.84 7.70661 12.84 7.33994 13.0533L5.34661 14.2333C3.91994 15.08 3.05327 14.4467 3.42661 12.8333L3.89994 10.7867C3.98661 10.4 3.83327 9.85999 3.55327 9.57999L1.89994 7.92666C0.926606 6.95333 1.23994 5.96666 2.59994 5.73999L4.72661 5.38666C5.07994 5.32666 5.50661 5.01333 5.66661 4.68666L6.83994 2.33999C7.47994 1.06666 8.51994 1.06666 9.15327 2.33999Z"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <input
                                                    type="number"
                                                    placeholder="5"
                                                    name="rating"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.rating}
                                                    className="border w-24 md:w-44 border-gray-gray/700 placeholder-gray-gray/600 rounded px-1 bg-black-black/50 text-gray-gray/300 text-base focus:outline-none focus:ring-2 focus:ring-star focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.title}
                                        placeholder="Review Title"
                                        className="w-full rounded-lg  flex-1 border border-gray-gray/700 py-2 px-2 bg-black-black/10 text-gray-gray/300 placeholder-gray-gray/600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    />
                                    {formik.touched.title &&
                                        formik.errors.title && (
                                            <p className="text-red-400">
                                                {formik.errors.title}
                                            </p>
                                        )}
                                </div>
                                <div>
                                    <textarea
                                        rows="4"
                                        name="content"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.content}
                                        placeholder="Review Content"
                                        className="w-full rounded-lg  flex-1 border border-gray-gray/700 py-2 px-2 bg-black-black/10 text-gray-gray/300 placeholder-gray-gray/600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    ></textarea>
                                    {formik.touched.content &&
                                        formik.errors.content && (
                                            <p className="text-red-400">
                                                {formik.errors.content}
                                            </p>
                                        )}
                                </div>
                                <button
                                    type="submit"
                                    className="py-2 px-6 bg-primary-primary/400 hover:bg-indigo-700 focus:ring-indigo-700 focus:ring-offset-indigo-500 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    ) : (
                        <h1 className="text-xl text-gray-gray/400 font-bold text-center mt-16">
                            Please Login to give reviews
                        </h1>
                    )}
                </div>
            </section>
            {/* ======== END ::: GIVE MOVIE REVIEW SECTION ======== */}
            {/* ======== START ::: MOVIE REVIEWS SECTION ======== */}
            <section className="pb-16 lg:pb-20 lg:px-14">
                <div className="layout">
                    <div className="relative py-1 flex items-center mb-6">
                        <h2 className="header-block text-2xl text-gray-gray/50 font-bold ">
                            Movie Reviews
                        </h2>
                    </div>
                    {singleMovie.reviews.length > 0 ? (
                        <>
                            {!isLoadingSingleMovie && (
                                <div className="space-y-4">
                                    {singleMovie.reviews.map(
                                        (review, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="space-y-3.5 w-full bg-black-black/30 px-2 py-4 rounded-lg border border-gray-gray/700"
                                                >
                                                    <div className=" flex justify-between space-x-1">
                                                        <div className="flex space-x-3.5">
                                                            <div className="block relative">
                                                                <img
                                                                    alt="profil"
                                                                    src={
                                                                        review
                                                                            .reviewer
                                                                            .profile_path
                                                                            ? `https://image.tmdb.org/t/p/w500/${review.reviewer.profile_path}`
                                                                            : "/images/avatar_placeholder.png"
                                                                    }
                                                                    className="object-cover rounded-full h-12 w-12 "
                                                                />
                                                            </div>
                                                            <div className="flex flex-col justify-center ">
                                                                {/* prettier-ignore */}
                                                                <h1 className="text-gray-gray/50">{review.reviewer.first_name} {review.reviewer.last_name}</h1>
                                                                {/* prettier-ignore */}
                                                                <h1 className="text-gray-gray/300">{review.reviewer.email}</h1>
                                                            </div>
                                                        </div>
                                                        <div className="bg-black-black/50 flex items-center space-x-2 p-2 w-min rounded-lg">
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M9.15327 2.33999L10.3266 4.68666C10.4866 5.01333 10.9133 5.32666 11.2733 5.38666L13.3999 5.73999C14.7599 5.96666 15.0799 6.95333 14.0999 7.92666L12.4466 9.57999C12.1666 9.85999 12.0133 10.4 12.0999 10.7867L12.5733 12.8333C12.9466 14.4533 12.0866 15.08 10.6533 14.2333L8.65994 13.0533C8.29994 12.84 7.70661 12.84 7.33994 13.0533L5.34661 14.2333C3.91994 15.08 3.05327 14.4467 3.42661 12.8333L3.89994 10.7867C3.98661 10.4 3.83327 9.85999 3.55327 9.57999L1.89994 7.92666C0.926606 6.95333 1.23994 5.96666 2.59994 5.73999L4.72661 5.38666C5.07994 5.32666 5.50661 5.01333 5.66661 4.68666L6.83994 2.33999C7.47994 1.06666 8.51994 1.06666 9.15327 2.33999Z"
                                                                    stroke="#FFAD49"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                            <span className="text-warning-500">
                                                                {review.rating}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-gray/50 text-lg">
                                                        {review.title}
                                                    </div>
                                                    <textarea
                                                        rows="4"
                                                        disabled
                                                        className="w-full rounded-lg  flex-1 border border-gray-gray/700 py-2 px-2 bg-black-black/10 text-gray-gray/300 placeholder-gray-gray/600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                        defaultValue={
                                                            review.content
                                                        }
                                                    ></textarea>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <h1 className="text-xl text-gray-gray/400 font-bold text-center mt-16">
                            There are no reviews
                        </h1>
                    )}
                </div>
            </section>
            {/* ======== END ::: MOVIE REVIEWS SECTION ======== */}
        </>
    );
};

export default Movie;
