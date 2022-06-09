import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CategoryListbox from "../components/CategoryListbox";
import Pagination from "../components/Pagination";
import { clearSingleMovie, getAllMovies } from "../features/movie/movieSlice";
import queryString from "query-string";
import { Link } from "react-router-dom";

const Home = () => {
    const { allMovies, isLoadingAllMovies, totalDocs } = useSelector(
        (store) => store.movie
    );
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [firstRender, setFirstRender] = useState(true);
    const [searchMovie, setSearchMovie] = useState(
        "search" in queryString.parse(location.search)
            ? queryString.parse(location.search).search
            : ""
    );

    useEffect(() => {
        dispatch(clearSingleMovie());
        dispatch(getAllMovies(location.search));
        setFirstRender(false);
    }, [location.search]);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (!firstRender) {
                const queryParsed = queryString.parse(location.search);
                if (searchMovie === "") delete queryParsed.search;
                else queryParsed.search = searchMovie;

                const queryStringified = queryString.stringify(queryParsed);
                location.search = queryStringified;
                history.push({
                    pathname: "/home",
                    search: location.search,
                });
            }
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [searchMovie]);

    const handleChange = (e) => {
        setSearchMovie(e.target.value);
    };

    return (
        <>
            {/* ======== START ::: HERO SECTION ======== */}
            <section className="pt-40 pb-10">
                <div className="layout ">
                    <div className="w-full md:w-2/3 lg:w-1/2 mb-6">
                        <h1 className="mb-4 text-gray-gray/50 text-5xl lg:text-64px font-semibold tracking-tight ">
                            MaileHereko
                        </h1>
                        <p className="text-sm md:text-base text-gray-gray/300">
                            List of movies and TV Shows, I,{" "}
                            <span className="text-primary-primary/300">
                                Pramod Poudel
                            </span>{" "}
                            have watched till date. Explore what I have watched
                            and also feel free to make a suggestion. 😉
                        </p>
                    </div>
                    <div>
                        <div className="w-full md:w-2/3 lg:w-1/3 flex relative ">
                            <span className="rounded-l-lg inline-flex items-center px-3 border-t bg-black-black/10 border-l border-b border-gray-gray/700 text-gray-gray/600 shadow-sm text-sm">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                        stroke="#475069"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M22 22L20 20"
                                        stroke="#475069"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <input
                                value={searchMovie}
                                onChange={handleChange}
                                type="text"
                                name="searchMovie"
                                id="rounded-email"
                                className="w-full rounded-r-lg  flex-1 border-r border-t border-b border-gray-gray/700 py-3 px-4 bg-black-black/10 text-gray-gray/300 placeholder-gray-gray/600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Search movies or tv shows"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* ======== END ::: HERO SECTION ======== */}
            {/* ======== START ::: MOVIE LIST SECTION ======== */}
            <section className="py-4 lg:py-6">
                <div className="layout">
                    <div className="md:flex justify-between items-center mb-6 space-y-6 lg:space-y-0">
                        <h2 className="text-gray-gray/400 text-4xl font-semibold">
                            {"genre" in queryString.parse(location.search)
                                ? queryString.parse(location.search).genre
                                : "All"}{" "}
                            <span className="text-base">({totalDocs})</span>
                        </h2>
                        <Pagination />
                        <CategoryListbox />
                    </div>
                    {!isLoadingAllMovies && allMovies.length === 0 && (
                        <div
                            className="flex justify-center items-center text-center"
                            style={{ height: "50vh" }}
                        >
                            <h1 className="text-gray-gray/400 font-bold text-5xl">
                                No Movies
                            </h1>
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4 gap-y-5 lg:gap-x-6 lg:gap-y-5">
                        {isLoadingAllMovies &&
                            [...Array(15)].map((item, index) => (
                                <div
                                    key={index}
                                    className=" bg-gray-800 rounded-xl px-2 pt-2 pb-4 transform hover:scale-105 transition"
                                >
                                    <div className="relative mb-4 bg-blurBg/[.08] cursor-pointer h-96 ">
                                        <div className="h-full w-full animate-pulse bg-gray-gray/300"></div>
                                        {/* ======== ratings ======== */}
                                        <div className="absolute top-2 left-2 bg-black-black/50 flex items-center space-x-2 p-2 w-min rounded-lg w-12 h-6"></div>
                                    </div>
                                    <p className="font-semibold text-lg mx-2 text-gray-gray/200 animate-pulse bg-gray-gray/200">
                                        plaeholder
                                    </p>
                                </div>
                            ))}
                        {!isLoadingAllMovies &&
                            allMovies.map((movie, index) => {
                                return (
                                    <Link
                                        key={index}
                                        to={`/movies/${movie._id}`}
                                    >
                                        <div className=" bg-gray-800 rounded-xl px-2 pt-2 pb-4 transform hover:scale-105 transition">
                                            <div className="relative mb-4 bg-blurBg/[.08] cursor-pointer h-96 ">
                                                <div
                                                    className={`h-full w-full`}
                                                >
                                                    <img
                                                        className="h-full w-full object-cover"
                                                        src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                                                    />
                                                </div>
                                                {/* ======== ratings ======== */}
                                                <div className="absolute top-2 left-2 bg-black-black/50 flex items-center space-x-2 p-2 w-min rounded-lg">
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
                                                        {movie.rating}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-lg mx-2 text-gray-gray/50">
                                                {movie.title}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </section>
            {/* ======== END ::: MOVIE LIST SECTION ======== */}
        </>
    );
};

export default Home;
