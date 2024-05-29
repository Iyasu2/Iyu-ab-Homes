import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Landing() {
    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Your Logo</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn btn-primary" to="/signup">Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Landing Content */}
            <div className="container mt-5">
                <h1 className="text-center mb-4">Welcome to Your Website</h1>
                <p className="lead text-center">Start your journey by signing up for an account.</p>
                <div className="text-center">
                    <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Landing;
