// property.modeljs
const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const User = require("./user.model");

const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
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
    viewsHistory: { type: DataTypes.ARRAY(DataTypes.JSONB), defaultValue: [] },
    liked: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
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
    likedBy: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    timestamps: true, // Enable timestamps
  }
);

Property.associate = function (models) {
  Property.belongsToMany(models.User, {
    through: "LikedProperties",
    as: "LikedByUsers",
    foreignKey: "propertyId",
  });
};

module.exports = Property;
