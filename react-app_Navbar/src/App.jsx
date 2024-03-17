// In App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About_us_page from "./About_us_page";
import Search_page from "./Search_page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={About_us_page} />
        <Route path="/search_homes" Component={Search_page} />
      </Routes>
    </Router>
  );
};

export default App;
