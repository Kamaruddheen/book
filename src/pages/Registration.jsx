import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../hooks/useAuthContext";

const Registration = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const baseUrl = "http://localhost:3000";
    const { user, dispatch } = useAuthContext();

    if (user) {
        // If the user is authenticated, redirect to /home
        navigate("/");
    }

    const onSubmit = async (data) => {
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${baseUrl}/api/auth/register`,
                {
                    username: data.username,
                    password: data.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: response.data.username,
                    token: response.data.token,
                })
            );
            alert("User registered successfully");
            dispatch({ type: "LOGIN", payload: response.data });
        } catch (err) {
            console.error("Error during registration:", err);
            setError(error.response.data.message);
        } finally {
            setError("");
            setLoading(false);
        }
    };

    const registerGoogleAuth = () => {
        setError("");
        setLoading(true);
        try {
            window.location.href =
                "https://nodewithdb.onrender.com/google/auth";
        } catch (err) {
            console.error("Error during Google login:", err);
            setError(
                "An error occurred during login with Google. Please try again."
            );
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center">
            <div className="w-full">
                <div className="flex flex-col justify-center items-center bg-white p-5 md:p-10 rounded-lg shadow md:w-2/3 mx-auto lg:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-center text-blue-400 font-bold text-2xl uppercase my-5">
                            Registration Form
                        </h2>
                        <div className="bg-white p-4 rounded-lg">
                            <div className="relative bg-inherit">
                                <input
                                    type="text"
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                    className={`peer bg-transparent h-10 w-72 rounded-lg text-emerald-950 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 ${
                                        errors.username ? "ring-red-500" : ""
                                    }`}
                                    placeholder="Username"
                                />
                                <label
                                    htmlFor="username"
                                    className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                                >
                                    Username
                                </label>
                                {errors.username && (
                                    <p className="text-red-500 text-sm">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <div className="relative bg-inherit">
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    className={`peer bg-transparent h-10 w-72 rounded-lg text-emerald-950 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 ${
                                        errors.password ? "ring-red-500" : ""
                                    }`}
                                    placeholder="Password"
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                                >
                                    Password
                                </label>
                                {errors.password && (
                                    <p className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <div className="relative bg-inherit">
                                <input
                                    type="password"
                                    {...register("confirm_password", {
                                        required:
                                            "Please confirm your password",
                                        validate: (value) =>
                                            value === watch("password") ||
                                            "Passwords do not match",
                                    })}
                                    className={`peer bg-transparent h-10 w-72 rounded-lg text-emerald-950 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 ${
                                        errors.confirm_password
                                            ? "ring-red-500"
                                            : ""
                                    }`}
                                    placeholder="Confirm Password"
                                />
                                <label
                                    htmlFor="confirm_password"
                                    className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                                >
                                    Confirm Password
                                </label>
                                {errors.confirm_password && (
                                    <p className="text-red-500 text-sm">
                                        {errors.confirm_password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        {error && (
                            <div className="text-red-500 text-center">
                                {error}
                            </div>
                        )}
                        <div className="p-4">
                            <button
                                type="submit"
                                className="block w-full bg-blue-500 text-white font-bold p-2 rounded-lg"
                            >
                                {loading
                                    ? "Crafting your account.."
                                    : "Register"}
                            </button>
                        </div>
                    </form>
                    <div className="relative w-full sm:w-1/2 md:w-2/3 lg:w-1/2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white font-bold px-2">OR</span>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/4 md:w-2/4 lg:w-1/2 mx-auto flex flex-col justify-center items-center mt-4">
                        <button
                            className="w-full bg-black text-white font-bold p-2 rounded-lg"
                            onClick={registerGoogleAuth}
                        >
                            <span> Continue with &nbsp;</span>
                            <FcGoogle className="inline-block" size={24} />
                        </button>
                    </div>
                    <div className="m-auto mt-6 w-fit md:mt-4">
                        <span className="flex max-sm:flex-col justify-center items-center text-center m-auto">
                            Already have an account? &nbsp;
                            <Link
                                className="font-semibold text-indigo-600"
                                to="/login"
                            >
                                Login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;
