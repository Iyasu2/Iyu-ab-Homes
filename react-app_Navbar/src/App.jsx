import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Post from "./components/Post";
import SignUp from "./components/Auth_page/SignUp";
import Login from "./components/Auth_page/Login";
import About_us_page from "./About_us_page";
import SignUp_page from "./SignUp_page";
import Search_page from "./Search_page";
import Login_page from "./Login_page";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<About_us_page />} />
        <Route path="/search_homes" Component={Search_page} />
        <Route path="/signup" Component={SignUp_page} />
        <Route path="/login" Component={Login_page} />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* Protected route for /post - render Post component only if authenticated */}
        <Route
          path="/post"
          element={
            isAuthenticated ? <Post /> : <Navigate to="/login" replace />
          }
        />
        {/* Redirect authenticated users trying to access /login or /signup to /post */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/post" replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/post" replace /> : <SignUp />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
