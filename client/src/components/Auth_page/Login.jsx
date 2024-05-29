import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import authImage from "../../assets/login-image.jpg";
import "./Auth.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccess = await login(email, password);
    if (loginSuccess) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="signup-title">Sign In</h2>
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
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              <div className="text-center mt-3">
                <p>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </form>
          </div>
          <div className="signup-image">
            <img src={authImage} alt="Signin" />
            <div className="signup-overlay">
              <h3>Welcome to Our Community</h3>
              <p>
                Join us today and explore a world of possibilities. Sign up now
                to get started on your journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
