import { useEffect } from "react";
import { usePropertiesContext } from "../../hooks/usePropertiesContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import Logout from "../Auth_page/Logout";

// components
import PropertyDetails from "./PropertyDetails";
import PropertyForm from "./PropertyForm";
import { Navbar } from "react-bootstrap";

const Post = ({ isAuthenticated }) => {
  const { properties, dispatch } = usePropertiesContext();
  const { user } = useAuthContext();

  useEffect(() => {}, [dispatch, user]);

  return (
    <div className="container mt-5">
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="post-form-box">
        {properties &&
          properties.map((property) => (
            <PropertyDetails key={property.id} property={property} />
          ))}
      </div>
      <PropertyForm />
    </div>
  );
};

export default Post;
