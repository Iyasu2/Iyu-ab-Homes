import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Select from "react-select"; // Import react-select
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePropertiesContext } from "../../hooks/usePropertiesContext";
import placeholderImage from "../../assets/placeholder.png";
import "./Form.css";

const PropertyForm = () => {
  const { dispatch } = usePropertiesContext();
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    type: "",
    totalArea: "",
    builtInArea: "",
    state: "",
    city: "",
    town: "",
    floors: "",
    bedrooms: "",
    bathrooms: "",
    accommodation: "",
    price: "",
    images: [], // Initialize images as an empty array
  });

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData({ ...formData, images: selectedFiles });

    // Display image previews
    const previews = [];
    for (let i = 0; i < Math.min(selectedFiles.length, 3); i++) {
      previews.push(URL.createObjectURL(selectedFiles[i]));
    }
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Check if the price field is empty
    if (!formData.price) {
      setError("Price field cannot be empty");
      return;
    }

    try {
      // Format the floors value according to the type of property
      let formattedFloors = formData.floors;
      if (formData.type === "Apartment" || formData.type === "Condominium") {
        if (formattedFloors !== "") {
          formattedFloors =
            formattedFloors === "0"
              ? "Ground"
              : `${
                  formattedFloors +
                  (formattedFloors === "1"
                    ? "st"
                    : formattedFloors === "2"
                    ? "nd"
                    : formattedFloors === "3"
                    ? "rd"
                    : "th")
                }`;
        }
      } else if (formattedFloors !== "") {
        formattedFloors =
          formattedFloors === "0" ? "Ground" : `${formattedFloors}`;
      }

      // Append meter square symbol to totalArea and builtInArea values
      const formattedFormData = {
        ...formData,
        floors: formattedFloors,
        totalArea: formData.totalArea + " m²",
        builtInArea: formData.builtInArea + " m²",
      };

      const formDataWithImages = new FormData();
      for (const key in formattedFormData) {
        formDataWithImages.append(key, formattedFormData[key]);
      }

      if (formData.images.length > 0) {
        for (const image of formData.images) {
          formDataWithImages.append("images", image);
        }
      }

      const response = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formDataWithImages,
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.error);
        setEmptyFields(responseData.emptyFields || []);
      } else {
        setFormData({
          type: "",
          totalArea: "",
          builtInArea: "",
          state: "",
          city: "",
          town: "",
          floors: "",
          bedrooms: "",
          bathrooms: "",
          accommodation: "",
          price: "",
          image: null,
        });
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_PROPERTY", payload: responseData });
      }
    } catch (error) {
      setError("An error occurred while processing your request");
    }
  };

  // Options for property type dropdown
  const propertyTypeOptions = [
    { value: "Apartment", label: "Apartment" },
    { value: "Condominium", label: "Condominium" },
    { value: "Private Resident", label: "Private Resident" },
    { value: "Warehouse", label: "Warehouse" },
  ];

  const floorsOptions =
    formData.type === "Private Resident" || formData.type === "Warehouse"
      ? [...Array(11)].map((_, index) => ({
          value: index === 0 ? "Ground" : `Ground + ${index}`,
          label: index === 0 ? "Ground" : `Ground + ${index}`,
        }))
      : formData.type === "Apartment" || formData.type === "Condominium"
      ? [...Array(10)].map((_, index) => ({
          value: `${index + 1}`,
          label: `${index + 1}${
            index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"
          }`,
        }))
      : [];
  const handleAccommodationChange = (selectedOption) => {
    setFormData({
      ...formData,
      accommodation: selectedOption ? selectedOption.value : "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div
            className="card-form mb-4"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className="card-body" style={{ overflow: "hidden" }}>
              {/* Image previews */}
              <Carousel
                style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
              >
                {imagePreviews.length > 0 ? (
                  imagePreviews.map((preview, index) => (
                    <Carousel.Item key={index}>
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="d-block w-100"
                        style={{
                          maxHeight: "400px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <img
                      src={placeholderImage} // Use placeholder image URL here
                      alt="Placeholder"
                      className="d-block w-100"
                      style={{
                        maxHeight: "400px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
          </div>
          <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="images">Images:</label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleImageChange}
                    className="form-control"
                    multiple
                  />
                </div>
              </div>
          <form onSubmit={handleSubmit}>
            
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="type">Type:</label>
                  <Select
                    options={propertyTypeOptions}
                    value={propertyTypeOptions.find(
                      (option) => option.value === formData.type
                    )}
                    onChange={(selectedOption) =>
                      setFormData({ ...formData, type: selectedOption.value })
                    }
                    classNamePrefix="react-select"
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        maxWidth: "140px",
                        borderRadius: "5px",
                        padding: "8px 12px",
                        margin: "auto",
                        marginBottom: "8px", // Add space between selections vertically
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        borderRadius: "5px", // Adjust the value as per your preference
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        borderRadius: "50%", // Make it circular
                      }),
                    }}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="floors">Floor:</label>
                  <Select
                    id="floors"
                    name="floors"
                    value={floorsOptions.find(
                      (option) => option.value === formData.floors
                    )}
                    onChange={(selectedOption) =>
                      setFormData({ ...formData, floors: selectedOption.value })
                    }
                    options={floorsOptions}
                    classNamePrefix="react-select"
                    isDisabled={!formData.type} // Disable if type is not selected
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        overflow: "hidden",
                        maxWidth: "125px",
                        borderRadius: "5px",
                        padding: "8px 12px",

                        margin: "auto", // Add margin for the option highlight // Adjust the value as per your preference
                        marginBottom: "8px",
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        borderRadius: "5px", // Adjust the value as per your preference
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        borderRadius: "50%", // Make it circular
                      }),
                    }}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="totalArea">Total Area:</label>
                  <div className="input-group">
                    <input
                      type="number"
                      id="totalArea"
                      name="totalArea"
                      value={formData.totalArea}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    <span className="input-group-text"> m²</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="builtInArea">Built-in Area:</label>
                  <div className="input-group">
                    <input
                      type="number"
                      id="builtInArea"
                      name="builtInArea"
                      value={formData.builtInArea}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    <span className="input-group-text"> m²</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="town">Town:</label>
                  <input
                    type="text"
                    id="town"
                    name="town"
                    value={formData.town}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="bedrooms">Bedrooms:</label>
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="bathrooms">Bathrooms:</label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="accommodation">Accommodation:</label>
                  <Select
                    id="accommodation"
                    name="accommodation"
                    value={
                      formData.accommodation
                        ? {
                            value: formData.accommodation,
                            label: formData.accommodation,
                          }
                        : null
                    }
                    onChange={handleAccommodationChange}
                    options={[
                      { value: "Sell", label: "Sell" },
                      { value: "Rent", label: "Rent" },
                    ]}
                    placeholder="Select..."
                    classNamePrefix="react-select"
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        maxWidth: "140px",
                        borderRadius: "5px",
                        padding: "8px 12px",
                        margin: "auto",
                        marginBottom: "8px", // Add space between selections vertically
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        borderRadius: "5px", // Adjust the value as per your preference
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        borderRadius: "50%", // Make it circular
                      }),
                    }}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <div className="input-group">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    <span className="input-group-text"> Birr</span>
                  </div>
                </div>
              </div>
              
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Property
            </button>
            {error && <div className="error mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
