import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Post from './components/Post';
import SignUp from './components/SignUp';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<loggedIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    {/* Protected route for /post - render Post component only if authenticated */}
                    <Route
                        path="/post"
                        element={isAuthenticated ? <Post /> : <Navigate to="/login" replace />}
                    />
                    {/* Redirect authenticated users trying to access /login or /signup to /post */}
                    <Route
                        path="/login"
                        element={isAuthenticated ? <Navigate to="/post" replace /> : <Login />}
                    />
                    <Route
                        path="/signup"
                        element={isAuthenticated ? <Navigate to="/post" replace /> : <SignUp />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
