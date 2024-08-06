import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import SignInForm from './components/auth/sign_in.component';
import SignUpForm from './components/auth/sign_up.component';

// User should be able to see a list of memberships but not all courses. User will have to visit individual tenants.
// Implement SSO login

const SignInPage = () => {

  const { tenantId_service } = useParams(); // Destructure the parameter 
  
   // Assign the first item to tenantId and the second item to service, defaulting to null if not present
  const [tenantId] = useState(tenantId_service ? tenantId_service.split('_')[0] : null);
  const [service] = useState(tenantId_service ? tenantId_service.split('_')[1] : null);
 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignInSubmit = (e) => {

    e.preventDefault();

    setCookie('isAuthenticated', 'true', 1); // Set cookie for 1 day
 
    window.location.href = `http://${tenantId}.${service}.veryown.com:3000/`;
  };

  const setCookie = (name, value, days) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;domain=.veryown.com`; // Note the leading dot in domain
  };


  return (
    <SignInForm handleSubmit={handleSignInSubmit} handleChange={handleChange} formData={formData} />
  );
};

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log('Sign-Up Form Data:', formData);
  };

  return (
    <SignUpForm handleSubmit={handleSignUpSubmit} handleChange={handleChange} formData={formData} />
  );
};

const App = () => {
  return (
    <div>
      <div className="container mt-4">
        <Router>
          <Routes>
            <Route path="/secure/:tenantId_service/signin" element={<SignInPage />} />
            <Route path="/secure/signup" element={<SignUpPage />} />
            <Route path="/:tenantId" element={<div>Tenant Specific Content</div>} /> {/* Example route for tenants */}
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
