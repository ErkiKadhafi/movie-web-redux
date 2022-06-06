import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="fixed w-full top-0 bg-gray-gray/900/[.8] py-4 z-20">
            <nav className="layout text-gray-gray/200 flex items-center justify-between">
                <Link to="/">
                    <img src="/images/logo.png" alt="movie" />
                </Link>
                <ul className="space-x-8 font-semibold lg:text-lg">
                    <a className="hover:text-primary-primary/300">Movies</a>
                    <a className="hover:text-primary-primary/300">Tv Shows</a>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
