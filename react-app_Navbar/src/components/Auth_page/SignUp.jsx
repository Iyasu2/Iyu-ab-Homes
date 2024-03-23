import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css'; // Import the CSS file
import homeImage from '../../assets/auth-image.jpg';


const SignUp = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone_number: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/signup', formData);
            toast.success('Sign up successful');
            const token = response.data.token;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Account already exists');
            } else {
                toast.error('Error signing up');
            }
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-content">
                <div className="signin-form-container">
                    <h2 className="signin-title">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="signin-form">
                        <div className="form-group">
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Password" required />
                        </div>
                        <div className="form-group">
                            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="form-control" placeholder="Phone Number" required />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </form>
                    <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
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

export default SignUp;
