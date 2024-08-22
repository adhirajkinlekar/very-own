import React from 'react'; 
import logo from './../../assets/veryown-admin.png'
const SignInForm = ({isAdmin, serviceDetails, handleSubmit, handleChange, formData }) => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
  <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg transform transition-all hover:scale-105 duration-300">
    <div className="flex justify-center mb-6">
      <img
        src={isAdmin ? logo : serviceDetails?.serviceImageURL}
        alt="Header Image"
        className="w-32 h-32 object-cover rounded-full shadow-md"
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
      <a href="/signup" className="text-indigo-600 hover:underline">
        Sign up
      </a>
    </p>
  </div>
</div>



);

export default SignInForm;
