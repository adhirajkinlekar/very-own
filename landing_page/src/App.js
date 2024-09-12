import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import AcademyShowcase from './AcademyShowcase';
import HomeSection from './Home';
import StoreShowcase from './StoreShowcase';

function App() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-900">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center shadow-lg">
          <Link to="/">
            <h1 className="text-5xl font-bold tracking-wide">Veryown</h1>
          </Link>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            Create your "very own" services like Academy, Streaming service, Store, and more. Everything you need to launch and manage your business online.
          </p>
        </header>

        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/popular-academies" element={<AcademyShowcase />} />
          <Route path="/popular-stores" element={<StoreShowcase />} />
          {/* Add more routes here for other pages */}
        </Routes>

        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-semibold text-center mb-12 text-indigo-800">
              How the platform works?
            </h2>
            <div className="bg-white shadow-lg rounded-lg p-8 text-gray-700">
              <p className="mb-6">
                <b>Veryown</b> empowers you to create and manage diverse online services with ease. Whether you want to start an <strong>online store</strong>, set up an <strong>educational academy</strong>, or build a <strong>streaming service</strong>, we provide the tools to turn your ideas into reality.
              </p>
              <p className="mb-6">
                Once your services are live, your customers can access them seamlessly through personalized URLs. For example, a service could be accessed via <code>store-name.veryown.in</code> or <code>academy-name.veryown.in</code>. 
              </p>
              <p className="mb-6">
                A dedicated <strong>admin application</strong> at <code>overview-admin.veryown.in</code> allows you to manage and oversee everything from a central dashboard. You’ll have full control over service creation, user management, and platform settings, ensuring smooth operation and a streamlined experience.
              </p>
              <p className="mb-6">
                Designed for flexibility and scalability, our platform supports a variety of service types and is built to grow with your needs. Whether you're launching a new venture or enhancing an existing one, we’ve got you covered with powerful features and reliable support.
              </p>
              <p className="mb-6">
                For your convenience, we offer <strong>Single Sign-On (SSO)</strong> functionality. This means you can use a single set of credentials to access all your services and the admin dashboard. SSO simplifies the login process and enhances security by reducing the number of passwords you need to manage.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-indigo-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6 text-indigo-800">
              Ready to Become a Creator?
            </h2>
            <p className="mb-6 text-gray-700">
              Join our platform today and start creating your very own online services! Whether you have an idea for an academy, a store, or any other service, we’ve got the tools you need to succeed.
            </p>
            <a
              href="https://overview-admin.veryown.in" // Replace with the actual URL
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // Security feature
              className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700"
            >
              Sign Up Now
            </a>
          </div>
        </div>


        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Veryown. All rights reserved.</p>
            <div className="mt-4">
              <a className="text-indigo-400 hover:text-indigo-200 mx-2">Privacy Policy</a>
              <a className="text-indigo-400 hover:text-indigo-200 mx-2">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
