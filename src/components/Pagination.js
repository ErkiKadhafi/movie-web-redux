import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

const Pagination = () => {
    const { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage, page } =
        useSelector((store) => store.movie);
    const location = useLocation();
    const history = useHistory();

    const handleNavPage = (
        toGoPage = false,
        goNext = false,
        goPrev = false
    ) => {
        const queryParsed = queryString.parse(location.search);
        if (goNext) {
            queryParsed.page = nextPage;
        } else if (goPrev) {
            queryParsed.page = prevPage;
        } else {
            if (toGoPage === page) return;
            queryParsed.page = toGoPage;
        }

        const queryStringified = queryString.stringify(queryParsed);
        location.search = queryStringified;
        history.push({
            pathname: "/home",
            search: location.search,
        });
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="flex ">
                {hasPrevPage && (
                    <li>
                        <button
                            onClick={() => {
                                handleNavPage(false, false, true);
                            }}
                            className="py-3 px-3 ml-0 leading-tight bg-black-black/10 text-gray-gray/300  rounded-l-lg border border-gray-gray/700 hover:bg-gray-300 "
                        >
                            Prev
                        </button>
                    </li>
                )}
                {[...Array(totalPages)].map((item, index) => {
                    return (
                        <li key={index}>
                            <button
                                onClick={() => {
                                    handleNavPage(index + 1, false, false);
                                }}
                                className={`py-3 px-3 leading-tight bg-black-black/10 text-gray-gray/300  border border-gray-gray/700  ${
                                    page === index + 1
                                        ? "bg-gray-300"
                                        : "hover:bg-gray-300"
                                }`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    );
                })}
                {hasNextPage && (
                    <li>
                        <button
                            onClick={() => {
                                handleNavPage(false, true, false);
                            }}
                            className="py-3 px-3 leading-tight bg-black-black/10 text-gray-gray/300  rounded-r-lg border border-gray-gray/700 hover:bg-gray-300 "
                        >
                            Next
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
