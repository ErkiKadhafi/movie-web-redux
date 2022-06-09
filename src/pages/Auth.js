import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { login, signup } from "../features/movie/userSlice";

const Auth = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);
    const initialValues = {
        email: "",
        password: "",
    };
    if (location.pathname === "/signup") {
        initialValues.first_name = "";
        initialValues.last_name = "";
        initialValues.password_confirmation = "";
    }

    const validationSchema = () => {
        const validationObject = {
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is Required"),
            password: Yup.string().required("Password is Required"),
        };
        if (location.pathname === "/signup") {
            validationObject.first_name = Yup.string().required(
                "First Name is Required"
            );
            validationObject.last_name = Yup.string().required(
                "Last Name is Required"
            );
            validationObject.password_confirmation = Yup.string()
                .required("Password Confirmation is Required")
                .oneOf([Yup.ref("password"), null], "Passwords doesn't match");
        }
        // console.log(validationObject);
        return Yup.object().shape(validationObject);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if (location.pathname === "/login") {
                toast.loading("Signing in . . .");
                dispatch(login(values))
                    .unwrap()
                    .then(() => {
                        toast.dismiss();
                        toast.success("Login success!");
                        history.push("/home");
                    });
            } else if (location.pathname === "/signup") {
                toast.loading("Signing up . . .");
                dispatch(signup(values))
                    .unwrap()
                    .then(() => {
                        toast.dismiss();
                        toast.success("Sign up success!");
                        history.push("/home");
                    });
            }
        },
    });

    const OpenEyeIcon = () => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z"
                stroke="#475069"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.0001 20.27C15.5301 20.27 18.8201 18.19 21.1101 14.59C22.0101 13.18 22.0101 10.81 21.1101 9.39997C18.8201 5.79997 15.5301 3.71997 12.0001 3.71997C8.47009 3.71997 5.18009 5.79997 2.89009 9.39997C1.99009 10.81 1.99009 13.18 2.89009 14.59C5.18009 18.19 8.47009 20.27 12.0001 20.27Z"
                stroke="#475069"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
    const CloseEyeIcon = () => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z"
                stroke="#475069"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77"
                stroke="#475069"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.41992 19.5299C9.55992 20.0099 10.7699 20.2699 11.9999 20.2699C15.5299 20.2699 18.8199 18.1899 21.1099 14.5899C22.0099 13.1799 22.0099 10.8099 21.1099 9.39993C20.7799 8.87993 20.4199 8.38993 20.0499 7.92993"
                stroke="#475069"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52"
                stroke="#475069"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.47 14.53L2 22"
                stroke="#475069"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22 2L14.53 9.47"
                stroke="#475069"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
    const handleShowPasswordConfirmation = (e) => {
        e.preventDefault();
        setShowPasswordConfirmation(!showPasswordConfirmation);
    };
    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <section className="h-screen">
            <div className="layout h-full flex justify-center lg:justify-between items-center lg:space-x-32">
                <div className="hidden lg:block">
                    <img src="/images/auth.png" />
                </div>
                <form
                    className="lg:w-2/5"
                    method="POST"
                    onSubmit={formik.handleSubmit}
                >
                    <h1 className="text-5xl lg:text-6xl text-gray-gray/100 mb-10 font-semibold">
                        {location.pathname === "/login" ? "Login" : "Sign Up"}
                    </h1>
                    {/* ======== first name and last name field ======== */}
                    {location.pathname === "/signup" && (
                        <>
                            {/* ======== first name field ======== */}
                            <div className=" relative mb-6 space-y-2">
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.first_name}
                                    className="w-full rounded-lg  flex-1 border border-gray-gray/700 py-5 px-4 bg-black-black/10 text-gray-gray/300 placeholder-gray-gray/600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="First Name"
                                />
                                {formik.touched.first_name &&
                                    formik.errors.first_name && (
                                        <p className="text-red-400">
                                            {formik.errors.first_name}
                                        </p>
                                    )}
                            </div>
                            {/* ======== last name field ======== */}
                            <div className=" relative mb-6 space-y-2">
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.last_name}
                                    className="w-full rounded-lg  flex-1 border border-gray-gray/700 py-5 px-4 bg-black-black/10 text-gray-gray/300 placeholder-gray-gray/600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Last Name"
                                />
                                {formik.touched.last_name &&
                                    formik.errors.last_name && (
                                        <p className="text-red-400">
                                            {formik.errors.last_name}
                                        </p>
                                    )}
                            </div>
                        </>
                    )}
                    {/* ======== email field ======== */}
                    <div className="mb-6 space-y-2">
                        <div className=" flex relative ">
                            <span className="rounded-l-lg inline-flex items-center px-3 border-t bg-black-black/10 border-l border-b border-gray-gray/700 text-gray-gray/300 shadow-sm text-sm">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                                        stroke="#475069"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                                        stroke="#475069"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="w-full rounded-r-lg  flex-1 border border-gray-gray/700 py-5 px-4 bg-black-black/10 text-gray-gray/300 placeholder-gray-gray/600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Email"
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-400">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>
                    {/* ======== password field ======== */}
                    <div className="mb-6 space-y-2">
                        <div className=" flex relative ">
                            <span className="rounded-l-lg inline-flex items-center px-3 border bg-black-black/10  border-gray-gray/700 text-gray-gray/300 shadow-sm text-sm">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                        stroke="#475069"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M16.28 13.6099C15.15 14.7399 13.53 15.0899 12.1 14.6399L9.50995 17.2199C9.32995 17.4099 8.95995 17.5299 8.68995 17.4899L7.48995 17.3299C7.08995 17.2799 6.72995 16.8999 6.66995 16.5099L6.50995 15.3099C6.46995 15.0499 6.59995 14.6799 6.77995 14.4899L9.35995 11.9099C8.91995 10.4799 9.25995 8.85989 10.39 7.72989C12.01 6.10989 14.65 6.10989 16.28 7.72989C17.9 9.33989 17.9 11.9799 16.28 13.6099Z"
                                        stroke="#475069"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.4501 16.2799L9.6001 15.4199"
                                        stroke="#475069"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13.3944 10.7H13.4034"
                                        stroke="#475069"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className="w-full  flex-1  border-t border-b border-gray-gray/700 py-5 px-4 bg-black-black/10 text-gray-gray/300 placeholder-gray-gray/600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="password"
                            />
                            <button
                                onClick={handleShowPassword}
                                className="rounded-r-lg inline-flex items-center px-3 border-t bg-black-black/10 border-r border-b border-gray-gray/700 text-gray-gray/300 shadow-sm text-sm"
                            >
                                {showPassword ? (
                                    <OpenEyeIcon />
                                ) : (
                                    <CloseEyeIcon />
                                )}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-400">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>
                    {/* ======== confirmation password field ======== */}
                    {location.pathname === "/signup" && (
                        <div className="mb-6 space-y-2">
                            <div className=" flex relative ">
                                <span className="rounded-l-lg inline-flex items-center px-3 border bg-black-black/10 border-gray-gray/700 text-gray-gray/300 shadow-sm text-sm">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                            stroke="#475069"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M16.28 13.6099C15.15 14.7399 13.53 15.0899 12.1 14.6399L9.50995 17.2199C9.32995 17.4099 8.95995 17.5299 8.68995 17.4899L7.48995 17.3299C7.08995 17.2799 6.72995 16.8999 6.66995 16.5099L6.50995 15.3099C6.46995 15.0499 6.59995 14.6799 6.77995 14.4899L9.35995 11.9099C8.91995 10.4799 9.25995 8.85989 10.39 7.72989C12.01 6.10989 14.65 6.10989 16.28 7.72989C17.9 9.33989 17.9 11.9799 16.28 13.6099Z"
                                            stroke="#475069"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10.4501 16.2799L9.6001 15.4199"
                                            stroke="#475069"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M13.3944 10.7H13.4034"
                                            stroke="#475069"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <input
                                    type={
                                        showPasswordConfirmation
                                            ? "text"
                                            : "password"
                                    }
                                    id="rounded-email"
                                    name="password_confirmation"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password_confirmation}
                                    className="w-full  flex-1  border-t border-b border-gray-gray/700 py-5 px-4 bg-black-black/10 text-gray-gray/300 placeholder-gray-gray/600 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="password_confirmation"
                                />
                                <button
                                    onClick={handleShowPasswordConfirmation}
                                    className="rounded-r-lg inline-flex items-center px-3 border-t bg-black-black/10 border-r border-b border-gray-gray/700 text-gray-gray/300 shadow-sm text-sm"
                                >
                                    {showPasswordConfirmation ? (
                                        <OpenEyeIcon />
                                    ) : (
                                        <CloseEyeIcon />
                                    )}
                                </button>
                            </div>
                            {formik.touched.password_confirmation &&
                                formik.errors.password_confirmation && (
                                    <p className="text-red-400">
                                        {formik.errors.password_confirmation}
                                    </p>
                                )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-10 py-4 px-4 bg-primary-primary/400 hover:bg-indigo-700 focus:ring-indigo-700 focus:ring-offset-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                        {location.pathname === "/login" ? "Login" : "Sign Up"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Auth;
