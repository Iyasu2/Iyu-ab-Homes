import React from "react";
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

function App() {
  const { user } = useAuthContext(); // Using useAuthContext hook here

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Navigate to="/post" />} />{" "}
            {/* Redirect to /post by default */}
            <Route
              path="/post"
              element={user ? <Post /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/post" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/post" />}
            />
            <Route path="/properties" element={<PropertyPage />} />{" "}
            {/* Route for PropertyPage */}
            <Route path="/details" element={<Details_page />} />
            <Route path="/edit-property" element={<Edit_page />} />
            <Route path="/dashboard" element={<Dashboard_page />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
