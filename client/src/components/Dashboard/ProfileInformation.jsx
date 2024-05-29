import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./ProfileInformation.css"; // Import the CSS file
import placeholderImage from "../../assets/placeholder-image.png"; // Import placeholder image

const ProfileInformation = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({
    fullName: "",
    telegram: "",
    whatsapp: "",
    facebook: "",
    phoneNumber: "",
    profileImage: null,
  });
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(placeholderImage); // Initialize with placeholder image

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData) {
            // Filter out properties with null values
            const filteredUserData = {};
            for (const key in userData) {
              if (userData[key] !== null) {
                filteredUserData[key] = userData[key];
              }
            }
            setUserData(filteredUserData);
            if (userData.profileImage) {
              setImagePreview(userData.profileImage);
            }
          }
        } else {
          const errorData = await response.json();
          setError(errorData.error);
        }
      } catch (error) {
        setError("An error occurred while fetching user data");
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setUserData({ ...userData, profileImage: selectedFile });
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(placeholderImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    try {
      const formData = new FormData();
      for (const key in userData) {
        if (key !== "profileImage") {
          formData.append(key, userData[key]);
        }
      }
      if (userData.profileImage) {
        formData.append("profileImage", userData.profileImage);
      }

      const response = await fetch(`http://localhost:5000/api/user`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log("Response Data:", responseData); // Log the response data

      if (!response.ok) {
        setError(responseData.error);
      } else {
        setError(null);
        // Update userData with the updated user information except profileImage
        const { profileImage, ...updatedUserData } = responseData;
        setUserData(updatedUserData);
        // Construct absolute URL for the profile image
        const baseUrl = "http://localhost:5000/"; // Replace this with your actual server base URL
        const profileImageUrl = `${baseUrl}${profileImage}`;
        setImagePreview(profileImageUrl);
      }
    } catch (error) {
      console.error("Error:", error); // Log any errors
      setError("An error occurred while processing your request");
    }
  };

  return (
    <div className="profile-info-form">
      <h2>Profile Information</h2>
      <div className="profile-info-row">
        <div className="profile-image-container">
          <div className="profile-image-placeholder">
            <img
              src={imagePreview}
              alt="Profile"
              className="profile-image-preview"
            />
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleImageChange}
            />
          </div>
          <button
            type="button"
            onClick={() => document.getElementById("profileImage").click()}
            className="btn btn-secondary mt-2 border shadow-sm"
          >
            Upload Image
          </button>
        </div>
        <div className="profile-inputs">
          <div className="form-row">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userData.fullName !== null ? userData.fullName : ""}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-row">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber !== null ? userData.phoneNumber : ""}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="telegram">Telegram:</label>
        <input
          type="text"
          id="telegram"
          name="telegram"
          value={userData.telegram !== null ? userData.telegram : ""}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-row">
        <label htmlFor="facebook">Facebook:</label>
        <input
          type="text"
          id="facebook"
          name="facebook"
          value={userData.facebook !== null ? userData.facebook : ""}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-row">
        <label htmlFor="whatsapp">Whatsapp:</label>
        <input
          type="text"
          id="whatsapp"
          name="whatsapp"
          value={userData.whatsapp !== null ? userData.whatsapp : ""}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-row">
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary shadow-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileInformation;
