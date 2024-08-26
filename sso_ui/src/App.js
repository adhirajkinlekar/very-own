import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import SignInForm from './components/auth/sign_in.component';
import SignUpForm from './components/auth/sign_up.component';
import GlobalTestAccountPopup from './components/popup.component';

const SignInPage = () => {
  const { publicId_service } = useParams(); 

  // Parse publicId and service only if publicId_service is not "admin"
  const publicId = publicId_service && publicId_service !== "admin" ? publicId_service.split('_')[0] : null;
  const service = publicId_service && publicId_service !== "admin" ? publicId_service.split('_')[1] : null;

  const [serviceDetails, setServiceDetails] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    if (publicId_service !== "admin" && publicId) {
      fetchServiceDetails();
    }
  }, [publicId, service]);

  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/service/${publicId}`);

      if (response.ok) {
        const serviceDetails = await response.json();
        setServiceDetails(serviceDetails);
      } else {
        console.error('Failed to fetch service details.');
      }
    } catch (error) {
      console.error('Error fetching service details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();

       // localStorage.setItem('JWT_TOKEN', result.token);

        document.cookie = `VERY_OWN_JWT_TOKEN=${result.token}; path=/; domain=.veryown.com; samesite=strict`;// ;secure; is rquired for http

        if (publicId_service == "admin") {
          window.location.href = `http://admin.veryown.com:4200/`;
        }
        
        else if (publicId && service) {
          window.location.href = `http://${publicId}.${service}.veryown.com:3000`;

        }
      } else {
        console.error('Login failed');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  return (
    <SignInForm
      isAdmin={publicId_service === "admin"}
      serviceDetails={serviceDetails}
      handleSubmit={handleSignInSubmit}
      handleChange={handleChange}
      formData={formData}
    />
  );
};

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { publicId_service } = useParams(); 

  // Parse publicId and service only if publicId_service is not "admin"
  const publicId = publicId_service && publicId_service !== "admin" ? publicId_service.split('_')[0] : null;
  const service = publicId_service && publicId_service !== "admin" ? publicId_service.split('_')[1] : null;

  const [serviceDetails, setServiceDetails] = useState(null); 

  useEffect(() => {
    if (publicId_service !== "admin" && publicId) {
      fetchServiceDetails();
    }
  }, [publicId, service]);

  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/service/${publicId}`);

      if (response.ok) {
        const serviceDetails = await response.json();
        setServiceDetails(serviceDetails);
      } else {
        console.error('Failed to fetch service details.');
      }
    } catch (error) {
      console.error('Error fetching service details:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log('Sign-Up Form Data:', formData);
  };

  return (
    <SignUpForm
      isAdmin={publicId_service === "admin"}
      serviceDetails={serviceDetails}
      handleSubmit={handleSignUpSubmit}
      handleChange={handleChange}
      formData={formData}
    />
  );
};

const App = () => {
  return (
    <div>
      <Router>
        <GlobalTestAccountPopup/>
        <Routes>
          <Route path="/secure/:publicId_service/signin" element={<SignInPage />} />
          <Route path="/secure/:publicId_service/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
