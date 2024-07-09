import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseBackendURL = "http://localhost:2000";

function AddBookPage() {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${baseBackendURL}/books/`, data);
            if (response.status === 200) {
                navigate('/'); // Navigate back to the book list after successful edit
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // If book already present
                alert("Book already exists");
                reset();
            } else {
                console.error("Error saving book:", error);
                alert("Some error in saving book");
            }
        }
    };

    const handleCancel = () => {
        navigate('/'); // Redirect to the book list page on cancel
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Add Book</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id='bookTitle'
                        {...register('title')}
                        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        required={true}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Author</label>
                    <input type="text" {...register('author')} className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500" required={true} />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <input type="date" {...register('date')} className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500" required={true} />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"> Save </button>
                    <button type="button" className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 focus:outline-none" onClick={handleCancel}>Cancel </button>
                </div>
            </form>
        </div>
    );
}

export default AddBookPage;
