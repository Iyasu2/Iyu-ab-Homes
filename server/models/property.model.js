const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const User = require("./user.model");

const Property = sequelize.define(
  "Property",
  {
    type: { type: DataTypes.STRING(50), allowNull: false },
    totalArea: { type: DataTypes.STRING(10), allowNull: false },
    builtInArea: { type: DataTypes.STRING(10), allowNull: false },
    state: { type: DataTypes.STRING(50), allowNull: false },
    city: { type: DataTypes.STRING(50), allowNull: false },
    town: { type: DataTypes.STRING(50), allowNull: false },
    floors: { type: DataTypes.STRING(20), allowNull: false },
    bedrooms: { type: DataTypes.INTEGER, allowNull: false },
    bathrooms: { type: DataTypes.INTEGER, allowNull: false },
    views: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    likes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    accommodation: { type: DataTypes.STRING(5), allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true, // Enable timestamps
  }
);

module.exports = Property;
