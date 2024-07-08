import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clears previous error message
    setError("");

    // Basic input validation
    if (!username || !password || !confirm_password) {
      setError("Please enter both username and password!!!");
      return;
    }
    if (password != confirm_password) {
      setError("Password didn't match!! Re-enter Password");
      return;
    }

    // Start loading
    setLoading(true);

    const data = {
      username,
      password,
    };

    try {
      // Create a new user account
      const response = await axios.post(
        "http://localhost:2000/user/register",
        data
      );

      if (response.status === 200) {
        console.log("Registration successfully");
        console.log(response.data);
        // Redirect to the home page
        navigate("/");
      } else {
        setError("Something went wrong while registering");
      }
    } catch (err) {
      console.error("Error during registeration:", err);
      setError("An error occurred during register. Please try again.");
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    // Clears previous error message
    setError("");

    // Start loading
    setLoading(true);

    try {
      // TODO: Google backend call goes here

      // Redirect to the home page
      navigate("/");
    } catch (err) {
      console.error("Error during Google register:", err);
      setError(
        "An error occurred during register with Google. Please try again."
      );
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center">
      <div className="w-full">
        <div className="flex flex-col justify-center items-center bg-white p-5 md:p-10 rounded-lg shadow md:w-2/3 mx-auto lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-blue-400 font-bold text-2xl uppercase my-5">
              Registration Form
            </h2>
            <div className="bg-white p-4 rounded-lg">
              <div className="relative bg-inherit">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="peer bg-transparent h-10 w-72 rounded-lg text-emerald-950 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                  placeholder="Username"
                />
                <label
                  htmlFor="username"
                  className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >
                  Username
                </label>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="relative bg-inherit">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer bg-transparent h-10 w-72 rounded-lg text-emerald-950 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 color-red"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="relative bg-inherit">
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="peer bg-transparent h-10 w-72 rounded-lg text-emerald-950 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 color-red"
                  placeholder="Confirm Password"
                />
                <label
                  htmlFor="confirm_password"
                  className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >
                  Confirm password
                </label>
              </div>
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <div className="p-4">
              <button className="block w-full bg-blue-500 text-white font-bold p-2 rounded-lg">
                {loading ? "Crafting your account.." : "Register"}
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
              onClick={handleGoogleAuth}
            >
              <span> Continue with &nbsp;</span>
              <FcGoogle className="inline-block" size={24} />
            </button>
          </div>
          <div className="m-auto mt-6 w-fit md:mt-4">
            <span className="flex max-sm:flex-col justify-center items-center text-center m-auto">
              Already have an account? &nbsp;
              <Link className="font-semibold text-indigo-600" to="/login">
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
