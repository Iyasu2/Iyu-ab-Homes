import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Login_page from "./Login_page";
import Signup_page from "./SignUp_page";
import Post from "./components/Post/Post";
import PropertyPage from "./components/Post/PropertyPage";
import Details_page from "./Details_page";
import Edit_page from "./components/Post/Edit_page";
import Dashboard_page from "./Dashboard_page";
import Search_page from "./Search_page";
import About_us_page from "./About_us_page";
import Info_page from "./Info_page"; // Import your InfoPage component

function App() {
  const { user } = useAuthContext();
  const isAuthenticated = !!user; // Check if user exists to determine authentication

  return (
    <Router>
      <div className="App">
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Search_page isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/post"
              element={
                isAuthenticated ? (
                  <Post isAuthenticated={isAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login_page /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/signup"
              element={
                !isAuthenticated ? (
                  <Signup_page />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/properties"
              element={<PropertyPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/details"
              element={<Details_page isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/edit-property"
              element={<Edit_page isAuthenticated={isAuthenticated} />}
            />
            {/* Render the dashboard only if the user is authenticated */}
            {isAuthenticated && (
              <Route
                path="/dashboard"
                element={<Dashboard_page isAuthenticated={isAuthenticated} />}
              />
            )}
            <Route
              path="/about"
              element={<About_us_page isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/info" // New route for info page
              element={<Info_page isAuthenticated={isAuthenticated} />}
            />
            {/* Redirect to home if the user tries to access dashboard without authentication */}
            {!isAuthenticated && (
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
