import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    axios
      // Back API URL for Login
      .post(`http://localhost:5555/login/`, data)
      .then((res) => {
        //   TODO: check response status and write operations
        console.log("Logged In successfully");
        console.log(res.json());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="min-h-screen flex items-center">
      <div className="w-full">
        <div className="flex justify-center bg-white p-10 rounded-lg shadow md:w-2/3 mx-auto lg:w-1/2">
          <form onSubmit={handleSubmit}>
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
                  className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
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
            <div className="p-4">
              <button className="block w-full bg-blue-500 text-white font-bold p-2 rounded-lg">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
