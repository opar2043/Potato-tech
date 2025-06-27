import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or an unexpected error occurred.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
