/* eslint-disable react/prop-types */
import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

function BookComponent({ title, author, date, onEdit, onDelete, isLogin }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">Author: {author}</p>
      <p className="text-gray-500">Date: {date}</p>
      {isLogin && (
        <div className="mt-4 flex space-x-4"> {/* Increased space between buttons */}
          <button onClick={onEdit} className="p-2 bg-blue-100 rounded-full">
            <Pencil color='blue' size={20} />
          </button>
          <button onClick={onDelete} className="p-2 bg-red-100 rounded-full">
            <Trash2 color='red' size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default BookComponent;
