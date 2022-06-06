const Movie = () => {
    return (
        <>
            {/* ======== START ::: HERO SECTION ======== */}
            <section className="pt-20 pb-10">
                <div className="layout relative">
                    <div
                        className="bg-[url('https://image.tmdb.org/t/p/w1280/caKZWDGmv5iW2U99skHs75MmOmU.jpg')] bg-cover bg-center h-96 lg:h-480px w-full"
                        style={{ borderRadius: "40px" }}
                    ></div>
                    <div className="absolute bottom-0 transform translate-y-1/2 bg-blurBg/[.9] rounded-3xl p-6 w-full lg:p-10 lg:w-560px lg:left-14">
                        <div className="space-x-3 text-primary-primary/200 mb-2">
                            <span>MovieApp</span>
                            <span>/</span>
                            <span>Movies</span>
                        </div>
                        <h1 className="text-3xl font-semibold text-gray-gray/50">
                            Ini Judul
                        </h1>
                    </div>
                </div>
            </section>
            {/* ======== END ::: HERO SECTION ======== */}
            {/* ======== START ::: DETAIL SECTION ======== */}
            <section className="py-16  lg:py-20 lg:px-14">
                <div className="layout flex flex-col-reverse md:grid grid-cols-2 gap-20">
                    <div className="">
                        <img
                            className="h-45 rounded-3xl"
                            src="https://image.tmdb.org/t/p/w500/uWcMgxO3p3qwVFUxsRz1HbTzGvT.jpg"
                            alt="poster 2"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl text-gray-gray/50 font-bold ">
                            Ini Judul
                        </h2>
                        <h3 className="text-lg text-gray-gray/300">
                            After the devastating events of Avengers: Infinity
                            War, the universe is in ruins due to the efforts of
                            the Mad Titan, Thanos. With the help of remaining
                            allies, the Avengers must assemble once more in
                            order to undo Thanos' actions and restore order to
                            the universe once and for all, no matter what
                            consequences may be in store.
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
                            <span className="text-warning-500">6.8</span>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg text-gray-gray/400">
                                Genres
                            </h4>
                            <h5 className="text-xl text-gray-gray/100">
                                Drama, Action
                            </h5>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg text-gray-gray/400">
                                Casts
                            </h4>
                            <ul className="text-xl text-gray-gray/100 list-disc ml-6">
                                <li>Harry Wismer</li>
                                <li>Lissa Bengston</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg text-gray-gray/400">
                                Added By
                            </h4>
                            <h5 className="text-xl text-gray-gray/100">
                                admin@gmail.com
                            </h5>
                        </div>
                    </div>
                </div>
            </section>
            {/* ======== END ::: DETAIL SECTION ======== */}
        </>
    );
};

export default Movie;
