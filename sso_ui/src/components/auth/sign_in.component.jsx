import React, { useState } from 'react';
import logo from './../../assets/veryown-admin.png';

const SignInForm = ({ isAdmin, serviceDetails, handleSubmit, handleChange, formData }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg transform transition-all hover:scale-105 duration-300">
        <div className="flex justify-center mb-6 relative">
          {/* Placeholder or loading spinner */}
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
              <svg className="w-8 h-8 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2zm10 8a10 10 0 0010-10h-2a8 8 0 01-8 8v2z"></path>
              </svg>
            </div>
          )}
          <img
            src={isAdmin ? logo : serviceDetails?.serviceImageURL}
            alt="Header Image"
            className={`w-32 h-32 object-cover rounded-full shadow-lg border-4 border-gray-200 transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            onError={handleImageError} // Fallback in case of image load error
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="./signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
