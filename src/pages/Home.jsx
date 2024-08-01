/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookComponent from '../Components/BookComponent'; // Ensure the path is correct
import Navbar from '../Components/Navbar';
import { Plus } from 'lucide-react'; // Assuming the Lucide React icon library is used
import { useSelector } from 'react-redux';

function Home() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const baseBackendURL = "https://nodewithdb.onrender.com";
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${baseBackendURL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (title) => {
    navigate(`/edit/${title}`);
  };

  const handleDelete = async (title) => {
    try {
      await axios.delete(`${baseBackendURL}/books/${title}`);
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleAddBook = () => {
    navigate('/add'); // Navigate to the edit page for adding a new book
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      {error && <p className="text-red-500">Error fetching data: {error.message}</p>}

      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <BookComponent
            key={book._id}
            title={book.title}
            author={book.author}
            date={book.date}
            onEdit={() => handleEdit(book.title)}
            onDelete={() => handleDelete(book.title)}
            isLogin={isLogin}
          />
        ))}
      </div>

      {/* Plus icon button */}
      {isLogin && (
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
          onClick={handleAddBook}
        >
          <Plus size={24} color='white' />
        </button>
      )}
    </div>
  );
}

export default Home;
