// property controller.js
const Property = require("../models/property.model");

const User = require("../models/user.model");

const LikedProperty = require("../models/likedProperty.model");

const jwt = require("jsonwebtoken");

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
      images: property.images.map(
        (image) => `https://gojo-homes.vercel.app/${image}`
      ), // Assuming images are stored in the server and served at this URL
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
        images.length > 0 ? `https://gojo-homes.vercel.app/${images[0]}` : null;

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
    console.log("images: ", images);

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
  if (!price) emptyFields.push("price");
  if (!accommodation) emptyFields.push("accommodation");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const images = req.files?.images?.map((file) => file.path) || [];

    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ error: "No such property" });
    }

    // Check if images field is present and is an array
    if (images && !Array.isArray(images)) {
      return res.status(400).json({ error: "Images must be an array" });
    }

    // Update only the fields present in req.body
    await property.update({
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
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log("id", id);

  try {
    const property = await Property.findByPk(id);
    console.log("total Area ", property.totalArea);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    const userId = decoded.id;
    console.log("userId: ", userId);

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the liked status is a boolean value
    if (typeof liked !== "boolean") {
      return res
        .status(400)
        .json({ error: "Liked status must be a boolean value" });
    }

    // Find the association between the user and the property
    const likedProperty = await LikedProperty.findOne({
      where: { userId, propertyId: id },
    });

    if (liked) {
      // If liked is true, create a new association
      if (!likedProperty) {
        console.log("Liked");
        await LikedProperty.create({ userId, propertyId: id });

        await property.update({ likedBy: [...property.likedBy, userId] });
      }
    } else {
      // If liked is false, remove the association if it exists
      if (likedProperty) {
        console.log("Disliked");
        await likedProperty.destroy();

        await property.update({
          likedBy: property.likedBy.filter(
            (likedUserId) => likedUserId !== userId
          ),
        });
      }
    }

    // Update the liked status in the User model
    await user.update({ liked: liked });

    console.log("property in backend ", property.likedBy);

    res.status(200).json({ message: "Liked status updated successfully" });
  } catch (error) {
    console.error("Error updating liked status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get liked status of a property
const getPropertyLikedStatus = async (req, res) => {
  const { id } = req.params;
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const property = await Property.findOne({ where: { id } });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;

    // Check if the user has liked the property
    const likedByUser = property.likedBy.includes(userId);

    console.log("likedbyuser ", likedByUser);

    // Return the liked status of the property
    res.status(200).json({ liked: likedByUser });
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
    // Map properties to include image URLs
    const propertiesWithImages = properties.map((property) => ({
      ...property.toJSON(),
      images: property.images.map(
        (image) => `https://gojo-homes.vercel.app/${image}`
      ), // Assuming images are stored in the server and served at this URL
    }));
    res.status(200).json(propertiesWithImages);
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
