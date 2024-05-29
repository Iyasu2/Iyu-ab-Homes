const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const LikedProperty = sequelize.define(
  "LikedProperty",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = LikedProperty;
