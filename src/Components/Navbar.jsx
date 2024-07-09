import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { setLogin } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Navbar() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = getCookie("isLoggedIn");

      if (isLoggedIn === "true") {
        dispatch(setLogin(true));
      } else {
        dispatch(setLogin(false));
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  const handleLogout = async () => {
    dispatch(setLogin(false));
    const response = await axios.get("http://localhost:2000/google/logout")
    if (response.status===200) {
      console.log("logout successfully");
      deleteCookie("isLoggedIn");
    }
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Book App</div>
        <div className="flex space-x-8">
          <NavLink to="/" className="text-white hover:text-gray-300">Books</NavLink>
          {isLogin ? (
            <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
          ) : (
            <NavLink to="/login" className="text-white hover:text-gray-300">Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
