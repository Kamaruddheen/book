import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clears previous error message
    setError("");

    // Basic input validation
    if (!email || !password) {
      setError("Please enter both email and password!!!");
      return;
    }

    // Start loading
    setLoading(true);

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:5555/login/", data);

      if (response.status === 200) {
        console.log("Logged in successfully");
        console.log(response.data);
        // Redirect to the home page
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center">
      <div className="w-full">
        <div className="flex flex-col justify-center bg-white p-10 rounded-lg shadow md:w-2/3 mx-auto lg:w-1/2">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <h2 className="text-center text-blue-400 font-bold text-2xl uppercase my-5">
              Login Form
            </h2>
            <div className="bg-white p-4 rounded-lg">
              <div className="relative bg-inherit">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="passowrd"
                  id="passowrd"
                  name="passowrd"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer bg-transparent h-10 w-72 rounded-lg text-emerald-950 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 color-red"
                  placeholder="Passowrd"
                />
                <label
                  htmlFor="passowrd"
                  className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >
                  Passowrd
                </label>
              </div>
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <div className="p-4">
              <button className="block w-full bg-blue-500 text-white font-bold p-2 rounded-lg">
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <div className="flex justify-center text-sm mt-4">
            <button className="flex items-center justify-center w-2/3 bg-black text-white font-bold p-2 rounded-lg">
              <span>Or Continue with &nbsp;</span>
              <FcGoogle size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
