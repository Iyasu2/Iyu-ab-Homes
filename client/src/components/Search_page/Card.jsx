import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAuthContext } from "../../hooks/useAuthContext"; // Uncomment to use authentication context
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMapMarkerAlt,
  faHome,
  faBed,
  faMoneyBillAlt,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const CardComponent = ({
  id,
  userId,
  images,
  type,
  totalArea,
  builtInArea,
  state,
  city,
  town,
  floors,
  accommodation,
  price,
  views,
}) => {
  const { user } = useAuthContext(); // Uncomment to use authentication context
  const navigate = useNavigate();
  const [cardViews, setCardViews] = useState(views);
  const [liked, setLiked] = useState(false); // Initialize liked state to false

  useEffect(() => {
    // Fetch the liked status when the component mounts
    const fetchLikedStatus = async () => {
      try {
        if (!user || !user.token) {
          // Check if user is logged in
          console.error("User not authenticated");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/properties/${id}/like`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setLiked(data.liked); // Update liked state based on the response
        } else {
          console.error("Failed to fetch liked status");
        }
      } catch (error) {
        console.error("Error fetching liked status:", error);
      }
    };

    fetchLikedStatus(); // Call the fetchLikedStatus function when the component mounts
  }, [id, user]); // Add dependencies for useEffect

  useEffect(() => {
    setCardViews(views);
  }, [views]);

  const handleCardClick = async () => {
    if (!id) {
      console.error("Property ID is undefined");
      return;
    }

    try {
      const userResponse = await fetch(
        `http://localhost:5000/api/user/public/${userId}`,
        {
          method: "GET",
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();

        const response = await fetch(
          `http://localhost:5000/api/properties/${id}/views`,
          {
            method: "PUT",
          }
        );

        if (response.ok) {
          const updatedProperty = await response.json();
          setCardViews(updatedProperty.views);

          // Navigate to the "info" route with property details as state
          navigate("/info", {
            state: {
              property: {
                id,
                images,
                type,
                totalArea,
                builtInArea,
                state,
                city,
                town,
                floors,
                accommodation,
                price,
                views,
              },
              userData: userData,
            },
          });
        } else {
          console.error("Failed to update views count");
        }
      } else {
        console.error("Failed to fetch user information");
      }
    } catch (error) {
      console.error("Error updating views count:", error);
    }
  };

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(price).replace(/\.00$/, "") + " Birr";
  };

  const handleHeartClick = async (event) => {
    event.stopPropagation(); // Stop event propagation to prevent redirection

    // Toggle the liked status locally
    setLiked(!liked);

    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/${id}/like`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, liked: !liked }), // Include user ID in the request body
        }
      );

      if (!response.ok) {
        console.error("Failed to update liked status");
        // Revert the liked state if the update fails
        setLiked(!liked);
      }
    } catch (error) {
      console.error("Error updating liked status:", error);
      // Revert the liked state if there's an error
      setLiked(!liked);
    }
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <Card className="h-100">
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            marginBottom: "10px",
          }}
        >
          <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
            <div
              style={{
                backgroundColor: liked
                  ? "rgba(255, 210, 0)"
                  : "rgba(255, 255, 255, 0.8)",
                padding: "5px 10px",
                borderRadius: 5,
              }}
              onClick={handleHeartClick}
            >
              <FontAwesomeIcon
                icon={faHeart}
                style={{ margin: 5, color: liked ? "red" : "inherit" }}
                className="heart-icon"
              />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 0, 255, 0.8)",
                padding: "5px 10px",
                borderRadius: 5,
                color: "#fff",
                marginRight: 8,
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <FontAwesomeIcon icon={faBed} style={{ marginRight: 5 }} />
              <strong>For:</strong> {accommodation}
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "5px 10px",
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faEye} style={{ marginRight: 5 }} />
              <span>{cardViews}</span>
            </div>
          </div>
          <div
            style={{
              paddingBottom: "56%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Card.Img
              variant="top"
              src={images ? images : null}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <Card.Body>
          <div className="description-area content">
            <div className="dark-bg"></div>
            <div className="content">
              <FontAwesomeIcon icon={faBuilding} /> <strong>Type:</strong>{" "}
              {type}
              <br />
              <FontAwesomeIcon icon={faHome} /> <strong>Area:</strong>{" "}
              {totalArea} / {builtInArea}
              <br />
              <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
              <strong>Location:</strong> {town}, {city}, {state}
              <br />
              <strong>Floors:</strong> {floors}
              <br />
              <FontAwesomeIcon icon={faMoneyBillAlt} /> <strong>Price:</strong>{" "}
              {formatPrice(price)}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponent;
