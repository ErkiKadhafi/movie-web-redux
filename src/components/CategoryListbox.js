import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const categories = [
    { name: "Crime" },
    { name: "Thriller" },
    { name: "Drama" },
    { name: "Animation" },
    { name: "Family" },
    { name: "Action" },
    { name: "Science Fiction" },
    { name: "Adventure" },
    { name: "Fantasy" },
    { name: "Romance" },
    { name: "Comedy" },
    { name: "Horror" },
    { name: "Mystery" },
    { name: "TV Movie" },
    { name: "War" },
    { name: "History" },
    { name: "Documentary" },
    { name: "Music" },
];

const CategoryListbox = () => {
    const location = useLocation();
    const history = useHistory();
    const [firstRender, setFirstRender] = useState(true);
    let genre;
    if ("genre" in queryString.parse(location.search)) {
        genre = {
            name: queryString.parse(location.search).genre,
        };
    } else genre = { name: "Select Categories" };
    const [selected, setSelected] = useState(genre);

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
            return;
        }
        if (selected.name === "Select Categories") return;

        // console.log(selected.name);
        const queryParsed = queryString.parse(location.search);
        queryParsed.genre = selected.name;

        const queryStringified = queryString.stringify(queryParsed);
        location.search = queryStringified;
        history.push({
            pathname: "/home",
            search: location.search,
        });
    }, [selected]);

    return (
        <div className="w-full md:w-72 ">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-black-black/10 text-gray-gray/300 py-3 pl-3 pr-10 text-left focus:outline-none border border-gray-gray/700">
                        <span className="block truncate">{selected.name}</span>
                        {/* ======== chevron up and down ======== */}
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.2902 14.2899L12.0002 18.5899L7.71019 14.2899C7.52188 14.1016 7.26649 13.9958 7.00019 13.9958C6.73388 13.9958 6.47849 14.1016 6.29019 14.2899C6.10188 14.4782 5.99609 14.7336 5.99609 14.9999C5.99609 15.2662 6.10188 15.5216 6.29019 15.7099L11.2902 20.7099C11.3831 20.8037 11.4937 20.8781 11.6156 20.9288C11.7375 20.9796 11.8682 21.0057 12.0002 21.0057C12.1322 21.0057 12.2629 20.9796 12.3848 20.9288C12.5066 20.8781 12.6172 20.8037 12.7102 20.7099L17.7102 15.7099C17.8034 15.6167 17.8774 15.506 17.9278 15.3842C17.9783 15.2624 18.0043 15.1318 18.0043 14.9999C18.0043 14.8681 17.9783 14.7375 17.9278 14.6157C17.8774 14.4939 17.8034 14.3832 17.7102 14.2899C17.6169 14.1967 17.5063 14.1227 17.3844 14.0723C17.2626 14.0218 17.132 13.9958 17.0002 13.9958C16.8683 13.9958 16.7378 14.0218 16.6159 14.0723C16.4941 14.1227 16.3834 14.1967 16.2902 14.2899V14.2899ZM7.71019 9.70994L12.0002 5.40994L16.2902 9.70994C16.3831 9.80367 16.4937 9.87806 16.6156 9.92883C16.7375 9.9796 16.8682 10.0057 17.0002 10.0057C17.1322 10.0057 17.2629 9.9796 17.3848 9.92883C17.5066 9.87806 17.6172 9.80367 17.7102 9.70994C17.8039 9.61698 17.8783 9.50638 17.9291 9.38452C17.9798 9.26266 18.006 9.13195 18.006 8.99994C18.006 8.86793 17.9798 8.73722 17.9291 8.61536C17.8783 8.4935 17.8039 8.3829 17.7102 8.28994L12.7102 3.28994C12.6172 3.19621 12.5066 3.12182 12.3848 3.07105C12.2629 3.02028 12.1322 2.99414 12.0002 2.99414C11.8682 2.99414 11.7375 3.02028 11.6156 3.07105C11.4937 3.12182 11.3831 3.19621 11.2902 3.28994L6.29019 8.28994C6.10188 8.47824 5.99609 8.73364 5.99609 8.99994C5.99609 9.26624 6.10188 9.52164 6.29019 9.70994C6.47849 9.89824 6.73388 10.004 7.00019 10.004C7.26649 10.004 7.52188 9.89824 7.71019 9.70994Z"
                                    fill="#8E95A9"
                                />
                            </svg>
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="z-10 absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-gray-gray/900 py-1 text-base border border-gray-gray/700 focus:outline-none">
                            {categories.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-gray-300 text-gray-gray/300"
                                                : "text-gray-gray/300"
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M7.75 12L10.58 14.83L16.25 9.17004"
                                                            stroke="#8E95A9"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default CategoryListbox;
