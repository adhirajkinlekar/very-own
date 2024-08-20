import React from 'react';
import { FaGraduationCap, FaVideo, FaStore } from 'react-icons/fa';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center shadow-lg">
        <h1 className="text-5xl font-bold tracking-wide">Veryown</h1>
        <p className="mt-4 text-xl max-w-2xl mx-auto">
          Create your very own services like Academy, Streaming service, Store, and more. Everything you need to launch and manage your business online.
        </p>
      </header>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-12 text-indigo-800">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Streaming Service */}
            <div style={{ opacity: 0.8, pointerEvents: 'none' }} className="bg-white shadow-2xl rounded-lg p-8 text-center hover:transform hover:scale-105 transition-transform duration-300">
              <FaVideo className="text-red-500 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Streaming</h3>
              <p className="text-gray-700 mb-6">
                Start your own streaming service for video content, with seamless playback, subscriptions, and user engagement features.
              </p>
              <small style={{color: 'red', fontSize: '14px'}}>(coming soon)</small>

              {/* <a  className="text-indigo-600 hover:text-indigo-400 font-semibold">Learn More</a> */}
            </div>

             {/* Academy Service */}
             <div className="bg-white shadow-2xl rounded-lg p-8 text-center hover:transform hover:scale-105 transition-transform duration-300">
              <FaGraduationCap className="text-blue-600 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Academy</h3>
              <p className="text-gray-700 mb-6">
                Launch your own online learning platform, complete with courses, quizzes, and certification options. Perfect for educators and institutions.
              </p>
              {/* <a className="text-indigo-600 hover:text-indigo-400 font-semibold">Learn More</a> */}
            </div>


            {/* Store Service */}
            <div style={{ opacity: 0.8, pointerEvents: 'none' }} className="bg-white shadow-2xl rounded-lg p-8 text-center hover:transform hover:scale-105 transition-transform duration-300">
              <FaStore className="text-green-600 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Store</h3>
              <p className="text-gray-700 mb-6">
                Set up your own e-commerce store to sell products globally. Manage inventory, payments, and shipping with ease using our comprehensive platform.
              </p>
              <small style={{color: 'red', fontSize: '14px'}}>(coming soon)</small>

              {/* <a className="text-indigo-600 hover:text-indigo-400 font-semibold">Learn More</a> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold text-indigo-800 mb-12">Why Choose Veryown?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Scalable Solutions</h3>
              <p className="text-gray-700">
                Whether you’re just starting out or scaling up, our solutions are built to grow with your business. Launch and manage your services with ease.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">User-Friendly Interface</h3>
              <p className="text-gray-700">
                Our platforms are designed to be intuitive and user-friendly, so you can focus on building your business without worrying about the technical details.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
              <p className="text-gray-700">
                We provide round-the-clock support to ensure your services are always up and running smoothly. Your success is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 VeryOwn. All rights reserved.</p>
          <div className="mt-4">
            <a className="text-indigo-400 hover:text-indigo-200 mx-2">Privacy Policy</a>
            <a className="text-indigo-400 hover:text-indigo-200 mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
