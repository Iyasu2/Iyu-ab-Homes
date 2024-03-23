import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/Auth_page/SignUp";
import Login from "./components/Auth_page/Login";
import About_us_page from "./About_us_page";
import SignUp_page from "./SignUp_page";
import Search_page from "./Search_page";
import Login_page from "./Login_page";
import "bootstrap/dist/css/bootstrap.min.css";
import Post_page from "./Post_page";
import Details_page from "./Details_page";

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
        <Route
          path="/search_homes"
          element={<Search_page isAuthenticated={isAuthenticated} />}
        />
        <Route path="/signup" Component={SignUp_page} />
        <Route path="/login" Component={Login_page} />
        <Route path="/details" Component={Details_page} />

        {/* Protected route for /post - render Post component only if authenticated */}
        {isAuthenticated ? (
          <Route path="/post" element={<Post_page />} />
        ) : (
          <Route path="/post" element={<Navigate to="/login" replace />} />
        )}
        {/* Redirect authenticated users trying to access /login or /signup to /post */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/post" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/post" replace />
            ) : (
              <SignUp setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
