import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import authImage from '../../assets/signup-image.jpg';
import './Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !phoneNumber) {
      toast.error('Please fill in all fields');
      return;
    }
    await signup(email, password, phoneNumber);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="signup-title">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Signing up...' : 'Sign up'}
              </button>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              <div className="text-center mt-3">
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </form>
          </div>
          <div className="signup-image">
            <img src={authImage} alt="Signup" />
            <div className="signup-overlay">
              <h3>Welcome to Our Community</h3>
              <p>Join us today and explore a world of possibilities. Sign up now to get started on your journey.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
