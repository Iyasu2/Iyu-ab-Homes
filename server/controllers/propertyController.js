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

// get a single property
const getProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ error: "No such property" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new property
const createProperty = async (req, res) => {
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
    const images = req.files?.images?.map((file) => file.path) || property.images;

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
      accommodation,
      price,
      images, // Include images in the update
    });

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProperties,
  getProperty,
  createProperty,
  deleteProperty,
  updateProperty,
};

