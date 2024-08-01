import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const baseBackendURL = "https://nodewithdb.onrender.com";

function EditBookPage() {
  const { title } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the book details to populate the form
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${baseBackendURL}/books/${title}`);
        reset(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [title, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`${baseBackendURL}/books/${title}`, data);
      navigate('/'); // Navigate back to the book list after successful edit
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the book list page on cancel
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title')}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            {...register('author')}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...register('date')}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 focus:outline-none"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBookPage;
