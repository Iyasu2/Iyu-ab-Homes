import React, { useState } from "react";
import ProfileInformation from "./ProfileInformation";
import PropertyForm from "../Post/PropertyForm"; // Assuming PropertyForm is in the same directory
import PropertyPage from "../Post/PropertyPage"; // Assuming PropertyPage is in the same directory
import "./Dashboard.css";

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("profile");

  return (
    
    <div className="dash-profile-dashboard">
      <div className="dash-sidebar-dashboard">
        <ul>
          <li onClick={() => setActiveMenuItem("profile")}>
            Profile Information
          </li>
          <li onClick={() => setActiveMenuItem("new-post")}>New Post</li>
          <li onClick={() => setActiveMenuItem("posts")}>Posts</li>
        </ul>
      </div>
      {activeMenuItem === "profile" && <ProfileInformation />}
      {activeMenuItem === "new-post" && <PropertyForm />}
      {activeMenuItem === "posts" && <PropertyPage />}
    </div>
  );
};

export default Dashboard;
