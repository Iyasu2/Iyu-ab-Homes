// property controller.js
const Property = require("../models/property.model");

// get all properties
const getProperties = async (req, res) => {
  const userId = req.user.id;

  try {
    const properties = await Property.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    // Map properties to include image URLs
    const propertiesWithImages = properties.map((property) => ({
      ...property.toJSON(),
      images: property.images.map((image) => `http://localhost:5000/${image}`), // Assuming images are stored in the server and served at this URL
    }));

    res.status(200).json(propertiesWithImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProperty = async (req, res) => {
  try {
    const properties = await Property.findAll();

    if (!properties || properties.length === 0) {
      return res.status(404).json({ error: "Properties not found" });
    }

    // Increment views count for each property
    for (const property of properties) {
      await property.update({ views: property.views });
    }

    const formattedProperties = properties.map((property) => {
      const {
        id,
        type,
        totalArea,
        builtInArea,
        state,
        city,
        town,
        floors,
        bedrooms,
        bathrooms,
        price,
        accommodation,
        images,
        views, // Include views count
      } = property;

      const imagePath =
        images.length > 0 ? `http://localhost:5000/${images[0]}` : null;

      return {
        id,
        type,
        totalArea,
        builtInArea,
        state,
        city,
        town,
        floors,
        bedrooms,
        bathrooms,
        price,
        accommodation,
        images: imagePath,
        views, // Include views count
      };
    });

    res.status(200).json(formattedProperties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new property
const createProperty = async (req, res) => {
  const {
    id,
    type,
    totalArea,
    builtInArea,
    state,
    city,
    town,
    floors,
    bedrooms,
    bathrooms,
    price,
    accommodation,
  } = req.body;

  // Validate required fields
  const emptyFields = [];
  if (!type) emptyFields.push("type");
  if (!totalArea) emptyFields.push("totalArea");
  if (!builtInArea) emptyFields.push("builtInArea");
  if (!state) emptyFields.push("state");
  if (!city) emptyFields.push("city");
  if (!town) emptyFields.push("town");
  if (!floors) emptyFields.push("floors");
  if (!bedrooms) emptyFields.push("bedrooms");
  if (!bathrooms) emptyFields.push("bathrooms");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add property to database
  try {
    const userId = req.user.id;
    const images = req.files?.images?.map((file) => file.path) || []; // Get all uploaded image paths

    const property = await Property.create({
      id,
      type,
      totalArea,
      builtInArea,
      state,
      city,
      town,
      floors,
      bedrooms,
      bathrooms,
      accommodation,
      price,
      userId,
      images,
    });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a property
const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ error: "No such property" });
    }
    await property.destroy();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a property
const updateProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ error: "No such property" });
    }

    const {
      type,
      totalArea,
      builtInArea,
      state,
      city,
      town,
      floors,
      bedrooms,
      bathrooms,
      accommodation,
      price,
    } = req.body;

    // Extract images from req.files
    const images =
      req.files?.images?.map((file) => file.path) || property.images;

    await property.update({
      id,
      type,
      totalArea,
      builtInArea,
      state,
      city,
      town,
      floors,
      bedrooms,
      bathrooms,
      accommodation,
      price,
      images, // Include images in the update
    });

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const incrementPropertyViews = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Increment views count
    property.views += 1;

    // Save the updated property to the database
    await property.save();

    res.status(200).json({ views: property.views });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update liked status for a property
const updatePropertyLikeStatus = async (req, res) => {
  const { id } = req.params;
  const { liked } = req.body;

  try {
    const property = await Property.findOne({ where: { id } });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    if (typeof liked !== "boolean") {
      return res
        .status(400)
        .json({ error: "Liked status must be a boolean value" });
    }

    // Update liked status
    property.liked = liked;

    // Save the updated property to the database
    await property.save();

    res.status(200).json({ message: "Liked status updated successfully" });
  } catch (error) {
    console.error("Error updating liked status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get liked status of a property
const getPropertyLikedStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findOne({ where: { id } });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Return the liked status of the property
    res.status(200).json({ liked: property.liked });
  } catch (error) {
    console.error("Error fetching liked status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve property data for public access
const getPublicProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    if (!properties || properties.length === 0) {
      return res.status(404).json({ error: "Properties not found" });
    }
    // Format property data for public display (e.g., excluding sensitive information)
    const formattedProperties = properties.map((property) => {
      const {
        id,
        userId,
        type,
        totalArea,
        builtInArea,
        state,
        city,
        town,
        floors,
        bedrooms,
        bathrooms,
        accommodation,
        price,
        images,
        views,
      } = property;
      const imagePath =
        images.length > 0 ? `http://localhost:5000/${images[0]}` : null;
      return {
        id,
        userId,
        type,
        totalArea,
        builtInArea,
        state,
        city,
        town,
        floors,
        bedrooms,
        bathrooms,
        accommodation,
        price,
        images: imagePath,
        views,
      };
    });
    res.status(200).json(formattedProperties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
  updateProperty,
  incrementPropertyViews,
  updatePropertyLikeStatus,
  getPropertyLikedStatus,
  getPublicProperties, // Add this function
};
