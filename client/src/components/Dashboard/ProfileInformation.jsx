import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

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
  const [imagePreview, setImagePreview] = useState(null);

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
          setUserData(userData);
          if (userData.profileImage) {
            setImagePreview(userData.profileImage);
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
      setImagePreview(null);
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
    <div className="dash-form-container">
      <div className="dash-image-upload-container">
        <label htmlFor="dash-profile-image">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          id="dash-profile-image"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="dash-image-upload-preview"
          />
        )}
      </div>
      <div className="dash-profile-form">
        <h2>Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
          />
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
          <label>Telegram:</label>
          <input
            type="text"
            name="telegram"
            value={userData.telegram}
            onChange={handleInputChange}
          />
          <label>Facebook:</label>
          <input
            type="text"
            name="facebook"
            value={userData.facebook}
            onChange={handleInputChange}
          />
          <label>Whatsapp:</label>
          <input
            type="text"
            name="whatsapp"
            value={userData.whatsapp}
            onChange={handleInputChange}
          />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInformation;
