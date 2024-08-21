import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import SignInForm from './components/auth/sign_in.component';
import SignUpForm from './components/auth/sign_up.component';
import { useEffect } from 'react';

const SignInPage = () => {
  const { publicId_service } = useParams();  

  const publicId = publicId_service ? publicId_service.split('_')[0] : null;
  const service = publicId_service ? publicId_service.split('_')[1] : null;
  const [serviceDetails, setServiceDetails] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/service/${publicId}`) // Replace with your API URL
    .then((response) => {
   
      return response.json();
    })
    .then((serviceDetails) => { 
      setServiceDetails(serviceDetails) 
    })
    .catch((error) => {

    })}, [publicId, service]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
 

      setCookie('isAuthenticated', 'true', 1); // Set cookie for 1 day

   //   navigate(`http://${publicId}.${service}.veryown.com:3000/`);

      window.location.href = `http://${publicId}.${service}.veryown.com:3000`;
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const setCookie = (name, value, days) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;domain=.veryown.com`; // Note the leading dot in domain
  };
 
  return (
    <SignInForm serviceDetails={serviceDetails}  handleSubmit={handleSignInSubmit} handleChange={handleChange} formData={formData} />
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
            <Route path="/secure/:publicId_service/signin" element={<SignInPage />} />
            <Route path="/secure/signup" element={<SignUpPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
