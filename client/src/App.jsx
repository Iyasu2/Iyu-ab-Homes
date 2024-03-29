import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth_page/Login";
import Signup from "./components/Auth_page/SignUp";
import Post from "./components/Post/Post";
import PropertyPage from "./components/Post/PropertyPage"; // Import PropertyPage component
import Details_page from "./Details_page";
import Edit_page from "./components/Post/Edit_page";
import Dashboard_page from "./Dashboard_page";
import Search_page from "./Search_page";
import About_us_page from "./About_us_page";

function App() {
  const { user } = useAuthContext(); // Using useAuthContext hook here
  const { isAuthenticated, setIsAuthenticated } = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Search_page isAuthenticated={isAuthenticated} />}
            />
            {/* Redirect to /post by default */}
            <Route
              path="/post"
              element={
                user ? (
                  <Post isAuthenticated={isAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !user ? (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !user ? (
                  <Signup isAuthenticated={isAuthenticated} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/properties"
              element={<PropertyPage isAuthenticated={isAuthenticated} />}
            />{" "}
            {/* Route for PropertyPage */}
            <Route
              path="/details"
              element={<Details_page isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/edit-property"
              element={<Edit_page isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard_page isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/about"
              element={<About_us_page isAuthenticated={isAuthenticated} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
