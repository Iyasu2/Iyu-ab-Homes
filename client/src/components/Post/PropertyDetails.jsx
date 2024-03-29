import { usePropertiesContext } from "../../hooks/usePropertiesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const PropertyDetails = ({ property }) => {
  const { dispatch } = usePropertiesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/properties/${property._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PROPERTY", payload: json });
    }
  };

  return (
    <div className="property-details">
      <h4>{property.type}</h4>
      <p>
        <strong>Total Area: </strong>
        {property.totalArea}
      </p>
      <p>
        <strong>Built-in Area: </strong>
        {property.builtInArea}
      </p>
      <p>
        <strong>State: </strong>
        {property.state}
      </p>
      <p>
        <strong>City: </strong>
        {property.city}
      </p>
      <p>
        <strong>Town: </strong>
        {property.town}
      </p>
      <p>
        <strong>Floors: </strong>
        {property.floors}
      </p>
      <p>
        <strong>Bedrooms: </strong>
        {property.bedrooms}
      </p>
      <p>
        <strong>Bathrooms: </strong>
        {property.bathrooms}
      </p>
      <p>
        <strong>Views: </strong>
        {property.views}
      </p>
      <p>
        <strong>Accommodation: </strong>
        {property.accommodation}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default PropertyDetails;
