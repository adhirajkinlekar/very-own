import React from 'react'; 
import logo from './../../assets/veryown-admin.png'
const SignInForm = ({isAdmin, serviceDetails, handleSubmit, handleChange, formData }) => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="col-12 col-md-6 col-lg-4 p-4 shadow rounded">
    <div className="d-flex justify-content-center mb-4">
        <img
          src={isAdmin ? logo : serviceDetails?.serviceImageURL}
          alt="Header Image"
          className="img-fluid"
          style={{ borderRadius: '10px' }}
        />
      </div>
      <h2 className="text-center mb-4">Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
    </div>
  </div>
);

export default SignInForm;
