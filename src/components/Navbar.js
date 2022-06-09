import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../features/movie/userSlice";

const Navbar = () => {
    const { authenticated } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out!");
        history.push("/home");
    };
    return (
        <header className="fixed w-full top-0 bg-gray-gray/900/[.8] py-4 z-20">
            <nav className="layout text-gray-gray/200 flex items-center justify-between">
                <Link to="/">
                    <img src="/images/logo.png" alt="movie" />
                </Link>
                <ul className="flex items-center space-x-8 font-semibold lg:text-lg">
                    {!authenticated && (
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    type="submit"
                                    className="w-24 py-2 px-4 bg-black-black/10 border-2 border-primary-primary/400 hover:bg-primary-primary/200 focus:ring-indigo-700 focus:ring-offset-indigo-500 text-primary-primary/400 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signup"
                                    type="submit"
                                    className="w-24 py-2 px-4 bg-primary-primary/400 hover:bg-indigo-700 focus:ring-indigo-700 focus:ring-offset-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                    {authenticated && (
                        <>
                            <li>
                                <Link className="hover:text-primary-primary/300 transition">
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-24 py-2 px-4 bg-primary-primary/400 hover:bg-indigo-700 focus:ring-indigo-700 focus:ring-offset-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
