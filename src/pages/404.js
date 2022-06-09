import { Link } from "react-router-dom";
import UndrawSvg from "../components/UndrawSvg";

const Page404 = () => {
    return (
        <section className="">
            <div className="layout flex flex-col justify-center items-center min-h-screen overflow-clip">
                <div className="h-64 mb-10">
                    <UndrawSvg />
                </div>
                <div className="mt-10 flex flex-col items-center text-center space-y-8">
                    <h1 className="text-5xl text-gray-gray/50 font-bold">
                        Lost your way?
                    </h1>
                    <p className="text-gray-gray/300 ">
                        Oops! This is awkward. You are looking for something
                        that doesn't actually exist.
                    </p>
                    <Link
                        to="/home"
                        className="w-32 py-4 px-4 bg-primary-primary/400 hover:bg-indigo-700 focus:ring-indigo-700 focus:ring-offset-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Page404;
