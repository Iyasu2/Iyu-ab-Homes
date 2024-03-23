import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
import homeImage from '../../assets/auth-image.jpg';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check if the user is already authenticated on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/post'); // Redirect to desired route if user is already logged in
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', formData);
            const token = response.data.token;
            localStorage.setItem('token', token); // Store token in localStorage
            navigate('/post');
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Invalid email or password');
            toast.error('Invalid email or password');
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-content">
                <div className="signin-form-container">
                    <h2 className="signin-title">Sign In</h2>
                    <form onSubmit={handleSubmit} className="signin-form">
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">
                                Login
                            </button>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <div className="text-center mt-3">
                            <p>
                                Don't have an account? <Link to="/signup">Sign Up</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="signin-image-container">
                    <img src={homeImage} alt="Home" className="signin-image" />
                    <div className="signin-image-overlay">
                        <h3 className="signin-image-title">Discover Modern Homes</h3>
                        <p className="signin-image-description">
                            Experience the beauty and elegance of modern home design with us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
