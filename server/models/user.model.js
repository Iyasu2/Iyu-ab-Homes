const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const bcrypt = require("bcrypt");
const Property = require("./property.model");
const LikedProperty = require("./likedProperty.model");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telegram: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  whatsapp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.associate = function (models) {
  User.belongsToMany(models.Property, {
    through: LikedProperty,
    as: "LikedProperties",
    foreignKey: "userId",
  });
};

const validator = require("validator");

User.signup = async function (email, password, phoneNumber) {
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      throw new Error(
        "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number"
      );
    }

    if (isNaN(String(phoneNumber))) {
      throw new Error("Invalid phone number");
    }

    if (phoneNumber.toString().length > 10) {
      throw new Error("Phone number should be maximum 10 digits");
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      phoneNumber,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

User.login = async function (email, password) {
  try {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = User;
